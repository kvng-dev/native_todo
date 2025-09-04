import { RootStackParamList } from "@/App";
import { styles } from "@/assets/styles/addTask.styles";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTask } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext";

type AddTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddTask"
>;

type AddTaskScreenRouteProp = RouteProp<RootStackParamList, "AddTask">;

const AddTaskScreen = () => {
  const navigation = useNavigation<AddTaskScreenNavigationProp>();
  const route = useRoute<AddTaskScreenRouteProp>();
  const { addTask, updateTask, getTask } = useTask();
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    setDueDate(date.toISOString().split("T")[0]);
    hideDatePicker();
  };

  const isEditing = !!route.params?.taskId;
  const taskId = route.params?.taskId;

  useEffect(() => {
    if (isEditing && taskId) {
      const task = getTask(taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(
          task.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
        );
      }
    }
  }, [isEditing, taskId, getTask]);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Task" : "Add Task",
    });
  }, [navigation, isEditing]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    };

    if (isEditing && taskId) {
      const existingTask = getTask(taskId);
      if (existingTask) {
        updateTask({
          ...existingTask,
          ...taskData,
        });
      }
    } else {
      addTask(taskData);
    }

    navigation.goBack();
  };

  const handleCancel = () => {
    if (title.trim() || description.trim()) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Title *</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor={colors.textSecondary}
          maxLength={100}
          autoFocus={!isEditing}
        />

        <Text style={[styles.label, { color: colors.text }]}>Description</Text>
        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter task description (optional)"
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          maxLength={500}
          textAlignVertical="top"
        />

        <Text style={[styles.label, { color: colors.text }]}>Due Date</Text>
        <Pressable
          onPress={showDatePicker}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={{ color: colors.text }}>
            {dueDate || "YYYY-MM-DD (optional)"}
          </Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.textSecondary,
              },
            ]}
            onPress={handleCancel}
          >
            <Text
              style={[styles.cancelButtonText, { color: colors.textSecondary }]}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={handleSave}
          >
            <Text
              style={[styles.saveButtonText, { color: colors.primaryText }]}
            >
              {isEditing ? "Update" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddTaskScreen;
