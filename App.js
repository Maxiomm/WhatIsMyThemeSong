import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import HomePage from "./src/pages/HomePage";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomePage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
