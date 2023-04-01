import { View, Text } from "react-native";
import MyBtn from "../components/MyBtn";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";
import MyTextInput from "../components/MyTextInput";
import { Alert } from "react-native";

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState("");

  const addPost = async () => {
    if (text.length == 0) {
      Alert.alert("Please enter text");
      return;
    }

    const docRef = await addDoc(collection(db, "posts"), {
      text: text.trim(),
      image: "",
      postedBy: auth.currentUser.uid,
    });
    console.log("Document written with ID: ", docRef.id);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Create post screen</Text>

      <View style={{ marginBottom: 20 }} />
      <MyTextInput
        value={text}
        placeholder={"Enter post text"}
        onChange={(e) => {
          setText(e);
        }}
      />

      <MyBtn
        text={"Add post"}
        onPress={() => {
          addPost();
        }}
      />
    </View>
  );
}
