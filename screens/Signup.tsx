import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthStore } from "../utils/authentication";
import { NavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export default function Signup() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  const nav = useNavigation<BottomTabNavigationProp<ParamListBase, "Login">>();
  return (
    <View style={styles.container}>
      <Text>Sign up page</Text>
      <Button title="Connect wallet (login)" onPress={() => toggleLogin()} />
      <Button title="Login" onPress={() => nav.navigate("Login")} />
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
