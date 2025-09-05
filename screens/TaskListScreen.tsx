import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { RootStackParamList } from "@/App";
import TaskItem from "../components/TaskItem";
import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

type TaskListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskList"
>;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    loadingText: {
      color: colors.text,
      fontSize: 16,
    },
    searchInput: {
      margin: 16,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      fontSize: 16,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      color: colors.text,
    },
    filterButton: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 4,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterButtonText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    filterButtonTextActive: {
      color: colors.primaryText,
      fontWeight: "bold",
    },
    emptyStateText: {
      fontSize: 16,
      textAlign: "center",
      color: colors.textSecondary,
    },
    addButton: {
      position: "absolute",
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      backgroundColor: colors.primary,
    },
    addButtonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primaryText,
    },
    headerButton: {
      marginRight: 16,
    },
    headerButtonText: {
      color: colors.text,
      fontSize: 18,
    },
    sortButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 4,
      borderRadius: 20,
      borderWidth: 1,
      alignItems: "center",
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    sortButtonActive: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    sortButtonText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    sortButtonTextActive: {
      color: colors.primaryText,
      fontWeight: "bold",
    },
  });

const TaskListScreen = () => {
  const navigation = useNavigation<TaskListScreenNavigationProp>();
  const { tasks, loading, deleteTask, toggleTask } = useTask();
  const { theme, colors, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [sortBy, setSortBy] = useState<"none" | "dueDate" | "dueDateDesc">(
    "none"
  );

  const dynamicStyles = createStyles(colors);

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "incomplete" && !task.completed);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === "dueDateDesc") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      return 0;
    });

  const handleDeleteTask = (id: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTask(id) },
    ]);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={dynamicStyles.emptyStateText}>
        {searchQuery || filter !== "all" || sortBy !== "none"
          ? "No tasks match your criteria"
          : "No tasks yet. Add your first task!"}
      </Text>
    </View>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {(["all", "incomplete", "completed"] as const).map((filterType) => (
        <TouchableOpacity
          key={filterType}
          style={[
            dynamicStyles.filterButton,
            filter === filterType && dynamicStyles.filterButtonActive,
          ]}
          onPress={() => setFilter(filterType)}
        >
          <Text
            style={[
              dynamicStyles.filterButtonText,
              filter === filterType && dynamicStyles.filterButtonTextActive,
            ]}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSortButton = () => {
    const getNextSortMode = () => {
      switch (sortBy) {
        case "none":
          return "dueDate";
        case "dueDate":
          return "dueDateDesc";
        case "dueDateDesc":
        default:
          return "none";
      }
    };

    const getSortLabel = () => {
      switch (sortBy) {
        case "dueDate":
          return "Asc ↑";
        case "dueDateDesc":
          return "Desc ↓";
        case "none":
        default:
          return "Default";
      }
    };

    return (
      <View style={styles.sortContainer}>
        <Text style={dynamicStyles.sortButtonText}>Sort By:</Text>
        <TouchableOpacity
          style={dynamicStyles.sortButton}
          onPress={() => setSortBy(getNextSortMode())}
        >
          <Text style={dynamicStyles.sortButtonText}>{getSortLabel()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={toggleTheme}
          style={dynamicStyles.headerButton}
        >
          <Text style={dynamicStyles.headerButtonText}>
            {theme === "light" ? "🌙" : "☀️"}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, toggleTheme, theme]);

  if (loading) {
    return (
      <View style={dynamicStyles.loadingContainer}>
        <Text style={dynamicStyles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      <TextInput
        style={dynamicStyles.searchInput}
        placeholder="Search tasks..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {renderFilterButtons()}
      {renderSortButton()}

      <FlatList
        data={filteredAndSortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => handleDeleteTask(item.id)}
            onEdit={() => navigation.navigate("AddTask", { taskId: item.id })}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          filteredAndSortedTasks.length === 0 ? styles.emptyList : undefined
        }
      />

      <TouchableOpacity
        style={dynamicStyles.addButton}
        onPress={() => navigation.navigate({ name: "AddTask", params: {} })}
      >
        <Text style={dynamicStyles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default TaskListScreen;
