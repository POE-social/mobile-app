import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const handleToggleLogin = () => {
    setLoggedIn(!loggedIn);
  };
  return (
    <NavigationContainer>
      <Navigation loggedIn={loggedIn} />
    </NavigationContainer>
  );
}
