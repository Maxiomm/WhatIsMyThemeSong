import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const CustomSpinner = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Rotation continue du spinner
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.spinner, { transform: [{ rotate: spin }] }]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    width: 25,
    height: 25,
    borderWidth: 3.5,
    borderColor: "#ffffff",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderRadius: 15,
  },
});

export default CustomSpinner;
