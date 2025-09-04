# React Native To-Do List App

A feature-rich, cross-platform To-Do List application built with React Native, TypeScript, and modern development practices.

## Features

### Core Functionality

- ✅ **Task Management**: Add, edit, complete, and delete tasks
- ✅ **Task Details**: Title, description, and due dates
- ✅ **Visual Status**: Clear distinction between completed and incomplete tasks
- ✅ **Data Persistence**: Tasks persist between app launches using AsyncStorage
- ✅ **Navigation**: Smooth navigation between Task List and Add Task screens

### Advanced Features

- 🌙 **Dark/Light Theme**: Toggle between themes with system preference detection
- 🔍 **Search & Filter**: Find tasks quickly with search and filter by status
- 📅 **Due Date Sorting**: Sort tasks by due date (ascending/descending)
- 📱 **Responsive Design**: Optimized for both phones and tablets
- 🧪 **Unit Tests**: Comprehensive test coverage with Jest and React Native Testing Library

## Screenshots

| Light Mode                        | Dark Mode                       | Add Task                      |
| --------------------------------- | ------------------------------- | ----------------------------- |
| ![Light](./screenshots/light.png) | ![Dark](./screenshots/dark.png) | ![Add](./screenshots/add.png) |

## Installation

### Prerequisites

- Node.js (v18 or higher)
- React Native CLI or Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd react-native-todo-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **iOS Setup** (macOS only)
   \`\`\`bash
   cd ios && pod install && cd ..
   \`\`\`

4. **Start Metro bundler**
   \`\`\`bash
   npm start

   # or

   yarn start
   \`\`\`

5. **Run the app**
   \`\`\`bash

   # For Android

   npm run android

   # or

   yarn android

   # For iOS (macOS only)

   npm run ios

   # or

   yarn ios
   \`\`\`

## Usage

### Adding Tasks

1. Tap the "+" button on the Task List screen
2. Enter task title (required) and description (optional)
3. Set a due date if needed
4. Tap "Add Task" to save

### Managing Tasks

- **Complete**: Tap the checkbox to mark as complete/incomplete
- **Delete**: Swipe left on a task and tap delete
- **Search**: Use the search bar to find specific tasks
- **Filter**: Toggle between All, Active, and Completed tasks
- **Sort**: Sort by due date using the sort buttons

### Theme Toggle

- Tap the theme icon in the header to switch between light and dark modes
- The app remembers your preference and applies it on restart

## Project Structure

\`\`\`
src/
├── components/ # Reusable UI components
│ └── TaskItem.tsx # Individual task component
├── context/ # React Context providers
│ ├── TaskContext.tsx # Task state management
│ └── ThemeContext.tsx# Theme state management
├── screens/ # Main app screens
│ ├── TaskListScreen.tsx
│ └── AddTaskScreen.tsx
├── styles/ # Styling and themes
│ └── colors.ts # Color definitions
├── types/ # TypeScript type definitions
│ └── Task.ts # Task interface
├── layouts/ # Layout components
│ └── RootLayout.tsx # Root navigation layout
└── **tests**/ # Unit tests
├── components/
├── context/
└── setup.ts
\`\`\`

## Technologies Used

- **React Native** (0.73+) - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** (v6) - Navigation library
- **AsyncStorage** - Local data persistence
- **React Context** - State management
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing utilities

## Testing

Run the test suite:

\`\`\`bash

# Run all tests

npm test

# or

yarn test

# Run tests in watch mode

npm run test:watch

# or

yarn test:watch

# Generate coverage report

npm run test:coverage

# or

yarn test:coverage
\`\`\`

### Test Coverage

- **Components**: TaskItem rendering and interactions
- **Context**: Task and Theme providers
- **Screens**: Navigation and user flows
- **Utils**: Helper functions and data persistence

## Development

### Code Style

- ESLint and Prettier configured for consistent code formatting
- TypeScript strict mode enabled
- React hooks best practices followed

### State Management

- React Context for global state (tasks, theme)
- Local component state for UI interactions
- AsyncStorage for data persistence

### Performance Optimizations

- React.memo for component optimization
- Efficient list rendering with FlatList
- Debounced search functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

**Metro bundler issues:**
\`\`\`bash
npm start -- --reset-cache
\`\`\`

**Android build issues:**
\`\`\`bash
cd android && ./gradlew clean && cd ..
\`\`\`

**iOS build issues:**
\`\`\`bash
cd ios && rm -rf Pods && pod install && cd ..
\`\`\`

### Support

For issues and questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include device/OS information and error logs

---

Built with ❤️ using React Native and TypeScript
