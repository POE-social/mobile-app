import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export interface ButtonProps {
  onPress: () => void;
}

export default function DeclineButton(props: ButtonProps) {
  const { onPress } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Entypo name="cross" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    borderRadius: 32,
    elevation: 3,
    backgroundColor: "#DD2323",
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});
