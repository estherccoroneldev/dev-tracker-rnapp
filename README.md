# DevTracker React Native App with Redux and Flux Architecture

This is a React Native application that follows the Flux architecture using Redux. The app allows users to search for repositories, view details of a selected repository, and explore user profiles and their repositories.

## Features

- **Search for users and repositories**.
- **User details** with repositories listed.
- **Flux architecture** using Redux for state management.
- **Reusable UI components** for common actions and views.

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [State Management (Redux)](#state-management-redux)
- [Usage](#usage)
- [Demo Video](#demo-video)
- [Contributing](#contributing)
- [License](#license)
- [Learn More](#learn-more)

# Installation

### Prerequisites

Before running the app, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/estherccoroneldev/dev-tracker-rnapp.git
   cd dev-tracker-rnapp
   ```

2. **Install dependencies:**
   Using npm:

   ```bash
   npm install
   ```

   Or using yarn

   ```bash
   yarn install
   ```

3. **Running the app:**

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

#### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

#### Step 2: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

**For Android**

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

**For iOS**

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run the app — you can also run it directly from within Android Studio and Xcode respectively.

# Folder Structure

Here's an overview of the folder structure of the project:

```
src
├── components
│   ├── PrimaryButton.tsx
│   ├── RepoItem.tsx
│   ├── ReposList.tsx
│   └── SearchItem.tsx
├── hooks
│   ├── index.ts
│   └── useRepositories.tsx
├── navigation
│   └── RootNavigator.tsx
├── screens
│   ├── UserDetails
│   │   ├── UserDetailsScreen.tsx
│   │   └── index.ts
│   ├── UserFinderScreen.tsx
│   │   ├── UserFinderScreen.tsx
│   │   └── index.ts
│   └── UserRepositoriesScreen
│   ├── UserRepositoriesScreen.tsx
│   └── index.ts
├── services
│   ├── repositoriesService.ts
│   └── userService.ts
├── shared
│   └── constants.ts
└── store
├── index.ts
└── userReducer.ts
```

### Key Folders and Files

- `components/:` Contains reusable UI components like buttons, list items, etc.
- `hooks/:` Custom hooks like useRepositories for fetching and managing state related to repositories.
- `navigation/:` Contains the root navigator and handles navigation between screens.
- `screens/:` Contains screen components for user search, user details, and user repositories.
- `services/:` API services for interacting with external data (e.g., fetching user details, repositories).
- `store/:` Contains Redux-related files, including actions and reducers for managing global state.
- `shared/:` Contains shared constants or utilities.

# State Management (Redux)

This project uses Redux to manage the global state, following the Flux architecture. The application flow is structured as follows:

- **Actions:** Triggered by user interactions, API calls, etc.
- **Reducers:** Update the state based on dispatched actions.
- **Store:** Holds the global state of the application, which is accessible to all components.

### Redux Files Overview

- `store/index.ts`: Configures and exports the Redux store.
- `store/userReducer.ts`: Handles actions related to user data, such as storing user information and repositories.
- `hooks/useRepositories.tsx:` A custom hook that interacts with state to fetch and manage repositories.

### Visual Flow of Redux Toolkit (Flux Architecture)

Here’s a visual breakdown of how data flows through Redux Toolkit, keeping the Flux architecture principles intact:

```sql
 +--------------------+                   (1) Dispatches action
 |  User Interaction  | -----------------------> (Action)
 | (e.g., Search User)|                             |
 +--------------------+                             v
          |                               +---------------------+
          v                               |    Redux Thunk      | (2) Async action triggered (e.g., fetch data)
   +---------------------+                +---------------------+
   | Action (fetchUser)  | ---------------> | Fetch User Data |
   | (e.g., Search User) |                            v
   +---------------------+                +---------------------+
          |                               |   Dispatch Actions   |
          v                               |  setStatus, setUser, |
 +---------------------+                  | setError             |
 | Redux Reducer       | <-----------------------+---------------+
 | (Update state)      |                            |
 +---------------------+                            v
          |                           +-------------------------+
          v                           |    Redux Store          |  (3) Store updated
 +-------------------------+          +-------------------------+ <-----------------+
 | React Components        |          | (Updated with user data)|
 | (Subscribed to store)   |  <-------+-------------------------+
 +-------------------------+
```

# Usage

To use the application:

1. **Search for a user:** On the home screen, enter a GitHub username in the search bar and tap the Find button.
2. **View user details:** Tap on a user to view their profile and list of repositories.
3. **View repositories:** Navigate to a user's repositories and see more details by tapping on a repository.

# Demo video

You can watch a demo of the app in action here:

### on iOS: Simulator iPhone 15 Pro

<video width="300" controls>
  <source src="https://github.com/user-attachments/assets/bd97cfb5-931e-4f6d-a469-d72dda48199d" type="video/mp4">
  Your browser does not support the video tag.
</video>

### on Android: Android real device

<video width="300" controls>
  <source src="https://github.com/user-attachments/assets/80de890b-591b-4cda-aa82-587bdd9cbb5a" type="video/mp4">
  Your browser does not support the video tag.
</video>

# Contributing

I welcome contributions! To contribute:

1. Fork the repository.
2. Clone your fork.
3. Create a feature branch (git checkout -b feature-name).
4. Make your changes and commit them (git commit -m 'feat: Add new feature').
5. Push to your fork (git push origin feature-name).
6. Create a pull request.

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
