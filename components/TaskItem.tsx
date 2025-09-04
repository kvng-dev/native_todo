import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/task.styles";
import { useTheme } from "../context/ThemeContext";
import type { Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const { colors } = useTheme();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    task.dueDate && task.dueDate < new Date() && !task.completed;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        task.completed && { backgroundColor: colors.background, opacity: 0.7 },
      ]}
    >
      <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
        <View
          style={[
            styles.checkboxInner,
            { borderColor: colors.primary },
            task.completed && { backgroundColor: colors.primary },
          ]}
        >
          {task.completed && (
            <Text style={[styles.checkmark, { color: colors.primaryText }]}>
              ✓
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <TouchableOpacity onPress={onEdit} style={styles.taskContent}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
              task.completed && {
                textDecorationLine: "line-through",
                color: colors.textSecondary,
              },
            ]}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text
              style={[
                styles.description,
                { color: colors.textSecondary },
                task.completed && { textDecorationLine: "line-through" },
              ]}
            >
              {task.description}
            </Text>
          )}
          {task.dueDate && (
            <Text
              style={[
                styles.dueDate,
                { color: colors.primary },
                isOverdue && { color: colors.danger, fontWeight: "bold" },
                task.completed && {
                  textDecorationLine: "line-through",
                  color: colors.textSecondary,
                },
              ]}
            >
              Due: {formatDate(task.dueDate)}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={[styles.deleteButtonText, { color: colors.danger }]}>
            <Ionicons name="trash" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;
