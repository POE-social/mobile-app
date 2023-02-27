import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useAuthStore } from "../utils/authentication";
import { AntDesign } from "@expo/vector-icons";
import PositiveButton from "../components/buttons/PositiveButton";
import Divider from "../components/Divider";

import useAuthorization from "../utils/useAuthorization";

export default function Leaderboard() {
  const toggleLogin = useAuthStore((state) => state.toggle);
  const { selectedAccount } = useAuthorization();
  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.profilePicture}
              source={require("../assets/icon.png")}
            />
            <View style={styles.stats}>
              <Text style={styles.myRank}>#7</Text>
              <Text style={styles.points}>350 Points</Text>
              <View style={styles.stars}>
                <Text style={styles.numStars}>10</Text>
                <AntDesign name="staro" size={16} color="black" />
              </View>
            </View>
          </View>
          <PositiveButton
            title="Get more points"
            onPress={() => {
              console.log("Selected auccount:", selectedAccount?.publicKey);
            }}
          />
          <Divider />
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        </View>
      }
      style={styles.leaderboardList}
      data={[...Array(10).keys()]}
      renderItem={({ item }) => (
        <View style={styles.leadboardEntry}>
          <Text style={styles.entryRank}>#{item + 1}</Text>
          <Image
            style={styles.entryPicture}
            source={require("../assets/icon.png")}
          />
          <View style={styles.entryInfo}>
            <Text style={styles.entryName}>Username</Text>
            <View style={styles.entryStats}>
              <Text style={styles.entryPoints}>
                {Math.round(1200 / (item + 1))} Points
              </Text>
              <View style={styles.entryStars}>
                <Text>10</Text>
                <AntDesign name="staro" size={16} color="black" />
              </View>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 32,
  },
  profilePicture: {
    height: 80,
    width: 80,
    marginHorizontal: 16,
  },
  stats: {
    alignItems: "center",
    flex: 1,
  },
  myRank: {
    fontSize: 32,
    fontWeight: "bold",
  },
  points: {
    fontSize: 16,
  },
  stars: { flexDirection: "row", alignItems: "center" },
  numStars: { marginRight: 4, fontSize: 16 },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: "400",
  },
  leaderboardList: {
    backgroundColor: "white",
    paddingHorizontal: 32,
  },
  leadboardEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  entryRank: { fontSize: 24, fontWeight: "bold", flex: 1 },
  entryPicture: { height: 60, width: 60, borderRadius: 30, marginRight: 16 },
  entryInfo: { flex: 3 },
  entryName: { fontWeight: "bold" },
  entryStats: { flexDirection: "row" },
  entryPoints: { marginRight: 16 },
  entryStars: { flexDirection: "row" },
});
