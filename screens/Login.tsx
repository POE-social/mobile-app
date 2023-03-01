import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../utils/authentication";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export default function Login() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  const nav = useNavigation<BottomTabNavigationProp<ParamListBase, "Login">>();

  return (
    <View style={styles.container}>
      <Text>Login page</Text>
      <Button title="Connect wallet (login)" onPress={() => toggleLogin()} />
      <Button title="Sign up" onPress={() => nav.navigate("Signup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
