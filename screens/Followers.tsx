import { StyleSheet, Text, View, Button } from "react-native";
import { useAuthStore } from "../utils/authentication";

export default function Followers() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  return (
    <View style={styles.container}>
      <Text>Followers</Text>
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
