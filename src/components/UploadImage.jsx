import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, storage, firebase, db } from "../utils/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function MyImagePicker() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("testing", result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      // uploadImage()
    }
  };

  console.log("auth.currentUser.uidauth.currentUser.uid", auth.currentUser.uid);
  const uploadImage = async () => {
    const response = await fetch(image);
    const blob = await response.blob();

    const storageRef = ref(storage, `Pictures/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        setUploading(false);
        console.log(error);
        return;
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setUploading(false);
        console.log("Download URL: ", downloadURL);
        setImage(downloadURL);

        try {
          await db.collection("users").doc(auth.currentUser.uid).update({
            profileImage: downloadURL,
          });
          console.log("Success");
        } catch (error) {
          console.log("Error getting document:", error);
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      {!uploading ? (
        <Button title="Upload Image" onPress={uploadImage} />
      ) : (
        <ActivityIndicator size={"small"} color="black" />
      )}
    </View>
  );
}
