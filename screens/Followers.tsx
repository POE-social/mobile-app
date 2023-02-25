import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import PositiveButton from "../components/buttons/PositiveButton";
import { useAuthStore } from "../utils/authentication";

export default function Followers() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={[...Array(13).keys()]}
        renderItem={({ item }) => (
          <View style={styles.follower}>
            <Image
              style={styles.profilePicture}
              source={require("../assets/icon.png")}
            />
            <View style={styles.userInfo}>
              <Text style={styles.username}>Username</Text>
              <Text style={styles.userDescription}>
                More info, like description or leaderboard stats
              </Text>
            </View>
            <PositiveButton title="Follow" onPress={() => {}} />
          </View>
        )}
        ListFooterComponent={
          <Button title="Logout" onPress={() => toggleLogin()} />
        }
        ListFooterComponentStyle={{
          marginBottom: 16,
          alignItems: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  list: {},
  follower: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flexShrink: 1,
    marginRight: 4,
  },
  username: {
    fontWeight: "bold",
  },
  userDescription: {
    fontSize: 12,
    opacity: 0.5,
  },
});
