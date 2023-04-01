// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import SignupScreen from "./src/screens/Signup";
import CreatePostScreen from "./src/screens/CreatePost";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
