import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../utils/authentication";

export default function Feed() {
  const toggleLogin = useAuthStore((state) => state.toggle);

  return (
    <View style={styles.container}>
      <Text>Feed page</Text>
      <Button title="Logout" onPress={() => toggleLogin()} />
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
