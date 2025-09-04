"use client";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type React from "react";
import { StatusBar } from "react-native";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import AddTaskScreen from "./screens/AddTask";
import TaskListScreen from "./screens/TaskListScreen";

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: { taskId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContent = () => {
  const { theme, colors } = useTheme();

  return (
    <TaskProvider>
      <NavigationContainer>
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
      </NavigationContainer>
    </TaskProvider>
  );
};

const App = (): React.JSX.Element => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
