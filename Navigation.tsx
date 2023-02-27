import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Feed from "./screens/Feed";
import Leaderboard from "./screens/Leaderboard";
import NewPost from "./screens/NewPost";
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import Followers from "./screens/Followers";
import Following from "./screens/Following";
import { useAuthStore } from "./utils/authentication";
import FollowRequests from "./screens/FollowRequests";
import useAuthorization from "./utils/useAuthorization";

export default function Navigation() {
  // Authentication state for conditional rendering later on
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const { selectedAccount } = useAuthorization();

  const FollowTab = createMaterialTopTabNavigator();
  const FollowNavigator = () => (
    <FollowTab.Navigator>
      <FollowTab.Screen name="Following" component={Following} />
      <FollowTab.Screen name="Followers" component={Followers} />
    </FollowTab.Navigator>
  );

  const ProfileStack = createStackNavigator();
  const ProfileNavigator = () => (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="MyProfile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Follow"
        component={FollowNavigator}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );

  const NotificationsStack = createStackNavigator();
  const NotificationsNavigator = () => (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="NotificationsScreen"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <NotificationsStack.Screen
        name="FollowRequests"
        component={FollowRequests}
        options={{
          headerShown: false,
        }}
      />
    </NotificationsStack.Navigator>
  );

  // Create the main navigation component
  const Tab = createBottomTabNavigator();
  const MainNavigator = (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Notifications" component={NotificationsNavigator} />
    </Tab.Navigator>
  );

  // Create the initial login flow
  const AuthTab = createBottomTabNavigator();
  const AuthNavigator = (
    <AuthTab.Navigator>
      <AuthTab.Screen name="Login" component={Login} />
      <AuthTab.Screen name="Signup" component={Signup} />
    </AuthTab.Navigator>
  );
  if (selectedAccount) {
    return MainNavigator;
  } else {
    return AuthNavigator;
  }
}
