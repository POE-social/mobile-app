import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function PositiveButton(props: ButtonProps) {
  const { onPress } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{props.title}</Text>
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
    elevation: 3,
    borderWidth: 1,
    borderColor: "#23DD91",
    backgroundColor: "#23DD91",
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    fontWeight: "bold",
    color: "white",
  },
});
