import React from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { AntDesign, Feather } from "@expo/vector-icons";

export default function ImagePickerButton({ setImage, image }) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l’accès à votre galerie."
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={pickImage}>
      {image ? (
        <Feather name="edit" size={24} color="#fff" /> // Icône crayon si image présente
      ) : (
        <AntDesign name="plus" size={24} color="#fff" /> // Icône + si pas d'image
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Pour Android
  },
});
