import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthStore } from "../utils/authentication";
import React, { useEffect, useRef, useState } from "react";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { NativeComponentType } from "react-native/Libraries/Utilities/codegenNativeComponent";

// This component will require two main functions
// getPosts() // gets posts for a given user's feed
// getFollowingPosts() // gets posts from people a given user is following

export default function Feed() {
  const toggleLogin = useAuthStore((state) => state.toggle);

  const [posts, setPosts] = useState(dummyPosts);

  const [mode, setMode] = useState<"following" | "feed">("feed");

  const [currentUser, setCurrentUser] = useState({
    name: "Rayhan",
    profilePicture:
      "https://media.licdn.com/dms/image/D4E03AQGifA_PF339bA/profile-displayphoto-shrink_800_800/0/1666193151320?e=1682553600&v=beta&t=_EvHDKev5gwdGa3NCQCYG_FSCjbNJYK6jVkEDfUZ3XI",
  });

  const [flatListHeight, setFlatListHeight] = useState<number>(0);

  const renderItem = ({ item }: { item: Post }) => {
    const user = dummyUsers.find((user) => user.id === item.user)
      ? dummyUsers.find((user) => user.id === item.user)
      : defaultUser;
    return <PostComponent post={item} user={user} height={flatListHeight} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topMenu}>
        <Text>Profile</Text>
        <Text>Following</Text>
        <Text>Feed</Text>
        <Text>Filters</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={{ flexGrow: 1 }}
        onLayout={(event) => {
          setFlatListHeight(event.nativeEvent.layout.height);
        }}
      />
      {/* <Button title="Logout" onPress={() => toggleLogin()} /> */}
    </View>
  );
}

const PostComponent = ({
  post,
  user,
  height,
}: {
  post: Post;
  user: User | undefined;
  height: number;
}) => {
  const hoursElapsed =
    (new Date().valueOf() - new Date(post.date).valueOf()) / (1000 * 60 * 60);
  const timeElapsedString =
    hoursElapsed > 24
      ? `${Math.round(hoursElapsed / 24)} days ago`
      : `${Math.round(hoursElapsed)} hours ago`;
  return (
    <View style={[styles.post, { height: height }]}>
      {post.mediaType === "image" && (
        <Image source={{ uri: post.src }} style={styles.postMedia} />
      )}
      {post.mediaType === "video" && (
        <Video
          source={{ uri: post.src }}
          style={styles.postMedia}
          isLooping
          resizeMode={ResizeMode.COVER}
        />
      )}
      <View style={styles.postOverlay}>
        <View style={styles.postContent}>
          <View style={styles.postContentHeader}>
            <Image
              source={{ uri: user?.profilePicture }}
              style={styles.userProfilePicture}
            />
            <View style={styles.postCreationDetails}>
              <Text style={styles.postCreatorName}>{user?.name}</Text>
              <Text style={styles.postTimeElapsed}>{timeElapsedString}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postDescriptionSection}>
            <Text style={styles.postDescription}>{post.description}</Text>
            <View style={styles.hashtags}>
              {post.hashtags.map((hashtag) => (
                <Text
                  key={post.hashtags.indexOf(hashtag)}
                  style={styles.hashtag}
                >
                  #{hashtag}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.postInteractions}>
          <TouchableOpacity
            style={[styles.postInteraction, styles.likeInteraction]}
          >
            <Image
              style={styles.likeIcon}
              source={require("../assets/like.png")}
            />
            <Text style={styles.interactionCaption}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postInteraction}>
            <Image
              style={styles.reportIcon}
              source={require("../assets/report.png")}
            />
            <Text style={styles.interactionCaption}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  topMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  flatList: {
    height: "100%",
    width: "100%",
  },
  post: {
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "fff",
  },
  postMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  postOverlay: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  postContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    // width: "100%"
    flex: 8,
  },
  postContentHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    width: "100%",
  },
  userProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  postCreationDetails: {
    flexDirection: "column",
    // flex: 2,
    maxWidth: 120,
    paddingHorizontal: 10,
  },
  postCreatorName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  postTimeElapsed: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  followButton: {
    backgroundColor: "#23DD91",
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  postDescriptionSection: {
    width: "100%",
  },
  postDescription: {
    color: "#fff",
  },
  hashtags: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hashtag: {
    color: "#fff",
    paddingRight: 20,
  },
  postInteractions: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  postInteraction: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  likeInteraction: {
    paddingBottom: 40,
  },
  interactionCaption: {
    color: "#fff",
    textAlign: "center",
  },
  likeIcon: {
    height: 20 * 1.5,
    width: 22.472 * 1.5,
    paddingBottom: 10,
  },
  reportIcon: {
    height: 20,
    width: 24.347,
  },
});

interface Post {
  id: string;
  user: string;
  description: string;
  hashtags: string[];
  likes: number;
  date: string;
  src: string;
  mediaType: "video" | "image";
  action: "nature cleanup" | "green diet" | "planting" | "animals";
}

interface Comment {
  user: string;
  post: string;
  comment: string;
}

interface User {
  id: string;
  name: string;
  profilePicture: string;
}

// Dummy posts - to delete
const dummyPosts: Post[] = [
  {
    id: "eoiven2ivbseroivbjksdfv9n0iw4g53wre34g",
    user: "vepiofvndspivuewrpvdsfr3g0cwf9ehrwvbn",
    description:
      "Cleaning up the ocean next to Grand Baie with @rayhan. We managed to collect 50 items of rubbish near the coral reef",
    hashtags: ["oceancleanup", "scubadive", "saveouroceans"],
    likes: 10,
    date: "Sat, 18 Feb 2023 23:24:00 GMT",
    // src: "https://cdn.pixabay.com/vimeo/141851680/diving-908.mp4",
    // mediaType: "video",
    src: "https://images.pexels.com/photos/3046582/pexels-photo-3046582.jpeg",
    mediaType: "image",
    action: "nature cleanup",
  },
  {
    id: "f9pvwbeq9pvbuwi83v9brojwifeuge2322fwe",
    user: "aivpudbqeobiuvqeiuhrfiquertcqn9048fwe",
    description: "Working on planting my new garden!",
    hashtags: ["gardening", "plants", "growtheplants"],
    likes: 324300,
    date: "Fri, 17 Feb 2023 10:00:00 GMT",
    // src: "blob:https://player.vimeo.com/08c9c193-30b8-40fc-86ef-61234d68ac91",
    // mediaType: "video",
    src: "https://images.pexels.com/photos/4505178/pexels-photo-4505178.jpeg?",
    mediaType: "image",
    action: "planting",
  },
  {
    id: "fre9gf7h29wgvpuibw4gwuevnveerg",
    user: "dfh9h2802bgifb249rvfb40vb4ru2urfb29gu",
    description: "Another day, another vegan meal!",
    hashtags: ["vegan", "food", "foodie", "tasty"],
    likes: 4,
    date: "Thu, 16 Feb 2023 22:24:00 GMT",
    src: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg",
    mediaType: "image",
    action: "green diet",
  },
];

// Dummy users
const dummyUsers: User[] = [
  {
    id: "vepiofvndspivuewrpvdsfr3g0cwf9ehrwvbn",
    name: "Jemma Ray",
    profilePicture:
      "https://images.pexels.com/photos/1821095/pexels-photo-1821095.jpeg",
  },
  {
    id: "aivpudbqeobiuvqeiuhrfiquertcqn9048fwe",
    name: "Jane Doe",
    profilePicture:
      "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
  },
  {
    id: "dfh9h2802bgifb249rvfb40vb4ru2urfb29gu",
    name: "Maximiliano Aurelius Assimillus",
    profilePicture:
      "https://images.pexels.com/photos/3754285/pexels-photo-3754285.jpeg",
  },
];

const defaultUser: User = {
  id: "fhre8gfh4wrby49rfvby89wybrvw489rvbe",
  name: "Error getting user",
  profilePicture:
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png",
};
