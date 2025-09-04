import AsyncStorage from "@react-native-async-storage/async-storage";
import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

export type Theme = "light" | "dark";

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  primaryText: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  danger: string;
  warning: string;
}

interface ThemeState {
  theme: Theme;
  colors: ThemeColors;
  loading: boolean;
}

type ThemeAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_THEME" };

interface ThemeContextType extends ThemeState {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const lightColors: ThemeColors = {
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
};

const darkColors: ThemeColors = {
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
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@todo_theme";

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
        colors: action.payload === "light" ? lightColors : darkColors,
        loading: false,
      };
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      return {
        ...state,
        theme: newTheme,
        colors: newTheme === "light" ? lightColors : darkColors,
      };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: "light",
    colors: lightColors,
    loading: true,
  });

  // Load theme from AsyncStorage on app start
  useEffect(() => {
    loadTheme();
  }, []);

  // Save theme to AsyncStorage whenever theme changes
  useEffect(() => {
    if (!state.loading) {
      saveTheme(state.theme);
    }
  }, [state.theme, state.loading]);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        dispatch({ type: "SET_THEME", payload: storedTheme as Theme });
      } else {
        dispatch({ type: "SET_THEME", payload: "light" });
      }
    } catch (error) {
      console.error("Error loading theme:", error);
      dispatch({ type: "SET_THEME", payload: "light" });
    }
  };

  const saveTheme = async (theme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  const setTheme = (theme: Theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
  };

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
