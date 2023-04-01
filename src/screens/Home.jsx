import { View, Text, FlatList } from "react-native";
import MyBtn from "../components/MyBtn";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Signup" }] });
  };

  useEffect(() => {
    console.log("test");
    // getUserData();
    getPosts();
  }, []);

  const getUserData = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserData(doc.data());
    });
  };

  const getPosts = async () => {
    var arr = [];
    const q = query(collection(db, "posts"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    console.log("data in my array--->", arr);
    setPosts(arr);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>{userData?.name}</Text>

      <View style={{ marginBottom: 20 }} />

      <MyBtn
        text={"Create post"}
        onPress={() => {
          navigation.navigate("CreatePost");
        }}
      />

      <View style={{ marginBottom: 20 }} />

      <MyBtn
        text={"Log out"}
        onPress={() => {
          signOut();
        }}
      />

      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <View
            style={{
              backgroundColor: "lightblue",
              padding: 10,
            }}
            key={index}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {item?.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
