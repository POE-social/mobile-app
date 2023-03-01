import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Feed from "./screens/Feed";
import Leaderboard from "./screens/Leaderboard";
import NewPost from "./screens/NewPost";
import Profile from "./screens/Profile";
import Notifications from "./screens/Notifications";
import { useAuthStore } from "./utils/authentication";

export default function Navigation() {
  // Authentication state for conditional rendering later on
  const loggedIn = useAuthStore((state) => state.loggedIn);

  // Create the main navigation component
  const Tab = createBottomTabNavigator();
  const MainNavigator = (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Notifications" component={Notifications} />
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
  if (loggedIn) {
    return MainNavigator;
  } else {
    return AuthNavigator;
  }
}
