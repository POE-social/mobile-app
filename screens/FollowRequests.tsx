import { StyleSheet, Text, View, Button, FlatList, Image } from "react-native";
import DeclineButton from "../components/buttons/DeclineButton";
import PositiveButton from "../components/buttons/PositiveButton";
import { useAuthStore } from "../utils/authentication";

export default function FollowRequest() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Follow Request</Text>}
        style={styles.list}
        data={[...Array(13).keys()]}
        renderItem={({ item }) => (
          <View style={styles.followRequest}>
            <Image
              style={styles.profilePicture}
              source={require("../assets/icon.png")}
            />
            <Text style={styles.username}>Username</Text>

            <PositiveButton title="Accept" onPress={() => {}} />
            <DeclineButton onPress={() => {}} />
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 16,
  },
  list: {},
  followRequest: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  username: { marginRight: 32 },
});
