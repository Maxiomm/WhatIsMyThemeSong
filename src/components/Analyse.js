import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

export default function Analyse({ image }) {
  const handleThemeSong = () => {
    if (!image) {
      Alert.alert(
        "Attention",
        "Veuillez d'abord ajouter une photo avant de découvrir votre chanson thème."
      );
    } else {
      Alert.alert("🎵 Your theme song is...", "Coming soon! 😉");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleThemeSong}>
      <Text style={styles.text}>Analyse</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
