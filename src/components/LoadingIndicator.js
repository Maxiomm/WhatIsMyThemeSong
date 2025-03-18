import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";

import CustomSpinner from "./CustomSpinner.js";

const LoadingIndicator = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacité initiale à 0

  useEffect(() => {
    // Animation de fade in sur 150ms
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <CustomSpinner />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.80)", // Fond semi-transparent
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

export default LoadingIndicator;
