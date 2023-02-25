import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { useAuthStore } from "../utils/authentication";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  const nav = useNavigation();
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.profileHeader}>
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
          </View>
          <View style={styles.followPanel}>
            <Pressable
              onPress={() => {
                nav.navigate("Follow", { screen: "Following" });
              }}
            >
              <View style={styles.followInfo}>
                <Text style={styles.followNum}>42</Text>
                <Text>Following</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                nav.navigate("Follow", { screen: "Followers" });
              }}
            >
              <View style={styles.followInfo}>
                <Text style={styles.followNum}>22</Text>
                <Text>Followers</Text>
              </View>
            </Pressable>
          </View>
          <Text style={styles.postTitle}>Posts</Text>
        </View>
      }
      style={styles.postGrid}
      data={[...Array(13).keys()]}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 8,
          }}
        >
          <Image
            style={styles.imageThumbnail}
            source={require("../assets/icon.png")}
          />
        </View>
      )}
      //Setting the number of column
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <Button title="Logout" onPress={() => toggleLogin()} />
      }
      ListFooterComponentStyle={{ marginBottom: 16, alignItems: "center" }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 8,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  profilePicture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userInfo: {
    flexShrink: 1,
  },
  username: {
    fontWeight: "bold",
  },
  userDescription: {
    fontSize: 12,
    opacity: 0.5,
  },
  followPanel: {
    width: "auto",
    flexDirection: "row",
  },
  followInfo: {
    flexDirection: "row",
    marginRight: 32,
  },
  followNum: {
    fontWeight: "bold",
    marginRight: 4,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 32,
  },
  postGrid: { backgroundColor: "white", padding: 8 },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
  },
});
