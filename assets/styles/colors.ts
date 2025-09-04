export const Colors = {
  // Light theme colors
  light: {
    background: "#f8f9fa",
    surface: "#ffffff",
    primary: "#007bff",
    primaryText: "#ffffff",
    text: "#212529",
    textSecondary: "#6c757d",
    border: "#e9ecef",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    // Additional semantic colors
    accent: "#17a2b8",
    muted: "#f8f9fa",
    disabled: "#e9ecef",
  },
  // Dark theme colors
  dark: {
    background: "#121212",
    surface: "#1e1e1e",
    primary: "#4dabf7",
    primaryText: "#000000",
    text: "#ffffff",
    textSecondary: "#adb5bd",
    border: "#343a40",
    success: "#51cf66",
    danger: "#ff6b6b",
    warning: "#ffd43b",
    // Additional semantic colors
    accent: "#74c0fc",
    muted: "#2c2c2c",
    disabled: "#495057",
  },
} as const;

export type ColorScheme = typeof Colors.light;
export type ColorKey = keyof ColorScheme;
