import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import AddTaskScreen from "@/screens/AddTask";
import TaskListScreen from "@/screens/TaskListScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: { taskId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationContent = () => {
  const { theme, colors } = useTheme();

  return (
    <TaskProvider>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.primary}
      />
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.primaryText,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "My Tasks" }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Add Task" }}
        />
      </Stack.Navigator>
    </TaskProvider>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <NavigationContent />
    </ThemeProvider>
  );
}
