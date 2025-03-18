import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Frame({ imageUri }) {
  return (
    <View style={styles.frame}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Aucune photo ajoutée</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 325,
    height: 325,
    borderWidth: 4,
    borderColor: "#6200EE",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    fontSize: 16,
    color: "#888",
  },
});
