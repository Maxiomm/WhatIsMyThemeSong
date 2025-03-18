import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { LoadingProvider } from "./src/contexts/LoadingContext";

import HomePage from "./src/pages/HomePage";

export default function App() {
  return (
    <LoadingProvider>
      <SafeAreaView style={styles.container}>
        <HomePage />
      </SafeAreaView>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
