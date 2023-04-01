import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import MyBtn from "../components/MyBtn";
import MyTextInput from "../components/MyTextInput";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user data,", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>

      <MyTextInput
        value={email}
        placeholder={"Password"}
        onChange={(e) => {
          setEmail(e);
        }}
      />

      <MyTextInput
        value={password}
        placeholder={"Password"}
        onChange={(e) => {
          setPassword(e);
        }}
      />

      <View style={{ marginBottom: 20 }} />

      <MyBtn
        text={"Login"}
        onPress={() => {
          handleLogin();
        }}
      />

      <View style={{ marginBottom: 20 }} />

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}
