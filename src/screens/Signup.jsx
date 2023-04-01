import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import MyBtn from "../components/MyBtn";
import MyTextInput from "../components/MyTextInput";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user data,", user);

        const docRef = await addDoc(collection(db, "users"), {
          email: email.toLowerCase().trim(),
          uid: user.uid,
          name: name.trim(),
        });
        console.log("docRef written", docRef.id);

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
      <Text>Signup Screen</Text>

      <MyTextInput
        value={name}
        placeholder={"Full name"}
        onChange={(e) => {
          setName(e);
        }}
      />

      <MyTextInput
        value={email}
        placeholder={"Email"}
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
        text={"Signup"}
        onPress={() => {
          handleSignup();
        }}
      />

      <View style={{ marginBottom: 20 }} />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
