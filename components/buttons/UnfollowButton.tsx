import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export interface ButtonProps {
  onPress: () => void;
}

export default function UnfollowButton(props: ButtonProps) {
  const { onPress } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Unfollow</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 32,
    borderColor: "#E62E73",
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});
