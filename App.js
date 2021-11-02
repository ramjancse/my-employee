import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { firebase } from "./src/Config";
import Create from "./src/screens/Create";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";

const Stack = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  function authStateChange(user) {
    setUser(user);
    setLoading(false);
  }

  console.log(user);

  useEffect(() => {
    const subscribe = firebase.auth().onAuthStateChanged(authStateChange);
    return subscribe;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              {/* <Stack.Screen name='Create' component={Create} options={{headerShown : true}}/> */}
              <Stack.Screen name="Home" options={{ headerShown: true }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create" options={{ headerShown: true }}>
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
      <StatusBar backgroundColor="#0000ff" />
    </View>
  );
}
