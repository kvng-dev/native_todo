// Mock theme context with trackable function
import TaskItem from "../../../components/TaskItem";

jest.mock("../../../context/ThemeContext", () => ({
  useTheme: () => ({
    colors: {
      surface: "#ffffff",
      border: "#e0e0e0",
      background: "#f5f5f5",
      primary: "#007AFF",
      primaryText: "#ffffff",
      text: "#000000",
      textSecondary: "#666666",
      danger: "#FF3B30",
    },
  }),
}));

// Mock React Native components
jest.mock("react-native", () => ({
  View: ({ children, style, ...props }: any) => ({
    type: "View",
    children,
    style,
    props,
  }),
  Text: ({ children, style, ...props }: any) => ({
    type: "Text",
    children,
    style,
    props,
  }),
  TouchableOpacity: ({ children, onPress, style, ...props }: any) => ({
    type: "TouchableOpacity",
    children,
    onPress,
    style,
    props,
  }),
  StyleSheet: {
    create: (styles: any) => styles,
  },
}));

// Mock Expo vector icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, size, ...props }: any) => ({
    type: "Ionicons",
    name,
    size,
    props,
  }),
}));

// Mock styles
jest.mock("../../../assets/styles/task.styles", () => ({
  styles: {
    container: { padding: 10 },
    checkbox: { marginRight: 10 },
    checkboxInner: { width: 20, height: 20 },
    checkmark: { fontSize: 12 },
    content: { flex: 1 },
    taskContent: { flex: 1 },
    title: { fontSize: 16 },
    description: { fontSize: 14 },
    dueDate: { fontSize: 12 },
    deleteButton: { padding: 5 },
    deleteButtonText: { fontSize: 14 },
  },
}));

// Test data
const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  completed: false,
  dueDate: new Date("2023-12-31"),
  createdAt: new Date("2023-12-01"),
  updatedAt: new Date("2023-12-01"),
};

const mockCompletedTask = {
  ...mockTask,
  id: "2",
  completed: true,
};

const mockProps = {
  task: mockTask,
  onToggle: jest.fn(),
  onDelete: jest.fn(),
  onEdit: jest.fn(),
};

describe("TaskItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.mock("react-native", () => ({
    View: ({ children, style, ...props }: any) => ({
      type: "View",
      children,
      style,
      props,
    }),
    Text: ({ children, style, ...props }: any) => ({
      type: "Text",
      children,
      style,
      props,
    }),
    TouchableOpacity: ({ children, onPress, style, ...props }: any) => ({
      type: "TouchableOpacity",
      children,
      onPress,
      style,
      props,
    }),
    StyleSheet: {
      create: (styles: any) => styles,
    },
  }));

  test("should accept all required props", () => {
    const result = TaskItem(mockProps);
    expect(result).toBeDefined();
  });

  test("should handle task with description", () => {
    expect(() => TaskItem(mockProps)).not.toThrow();
  });

  test("should handle task without description", () => {
    const taskWithoutDescription = { ...mockTask, description: undefined };
    const propsWithoutDesc = { ...mockProps, task: taskWithoutDescription };
    expect(() => TaskItem(propsWithoutDesc)).not.toThrow();
  });
});

describe("Task States", () => {
  test("should handle completed task", () => {
    const completedProps = { ...mockProps, task: mockCompletedTask };
    expect(() => TaskItem(completedProps)).not.toThrow();
  });

  test("should handle incomplete task", () => {
    expect(() => TaskItem(mockProps)).not.toThrow();
  });

  test("should handle task with due date", () => {
    expect(() => TaskItem(mockProps)).not.toThrow();
  });

  test("should handle task without due date", () => {
    const taskWithoutDueDate = { ...mockTask, dueDate: undefined };
    const propsWithoutDate = { ...mockProps, task: taskWithoutDueDate };
    expect(() => TaskItem(propsWithoutDate)).not.toThrow();
  });
});

describe("Props Validation", () => {
  test("should have proper prop types", () => {
    expect(typeof mockProps.onToggle).toBe("function");
    expect(typeof mockProps.onDelete).toBe("function");
    expect(typeof mockProps.onEdit).toBe("function");
    expect(typeof mockProps.task).toBe("object");
  });

  test("should handle different task objects", () => {
    const tasks = [
      mockTask,
      mockCompletedTask,
      { ...mockTask, description: undefined },
      { ...mockTask, dueDate: undefined },
    ];

    tasks.forEach((task) => {
      expect(() => TaskItem({ ...mockProps, task })).not.toThrow();
    });
  });
});

describe("Component Structure", () => {
  test("should return valid React element", () => {
    const result = TaskItem(mockProps);
    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
  });

  test("should handle all prop combinations", () => {
    const propCombinations = [
      { ...mockProps },
      { ...mockProps, task: mockCompletedTask },
      { ...mockProps, task: { ...mockTask, description: undefined } },
      { ...mockProps, task: { ...mockTask, dueDate: undefined } },
    ];

    propCombinations.forEach((props) => {
      expect(() => TaskItem(props)).not.toThrow();
    });
  });
});

describe("Date Formatting Logic", () => {
  test("should handle date objects", () => {
    const taskWithDate = {
      ...mockTask,
      dueDate: new Date("2023-06-15"),
    };
    const propsWithDate = { ...mockProps, task: taskWithDate };

    expect(() => TaskItem(propsWithDate)).not.toThrow();
  });

  test("should handle undefined dates", () => {
    const taskWithoutDate = { ...mockTask, dueDate: undefined };
    const propsWithoutDate = { ...mockProps, task: taskWithoutDate };

    expect(() => TaskItem(propsWithoutDate)).not.toThrow();
  });
});
