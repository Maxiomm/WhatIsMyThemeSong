import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";

import Frame from "../components/Frame";
import ImagePickerButton from "../components/ImagePickerButton";
import Analyse from "../components/Analyse";

import SettingsModal from "../modals/SettingsModal";

export default function HomePage() {
  const [image, setImage] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>What is my Theme Song ?</Text>

        <Frame imageUri={image} />

        <Analyse image={image} />
      </ScrollView>

      {/* Bouton sticky en bas à droite */}
      <ImagePickerButton setImage={setImage} image={image} />

      <SettingsModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 40,
  },
});
