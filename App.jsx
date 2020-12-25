// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { AsyncStorage } from "@react-native-community/async-storage";
import SetAuthToken from "./src/redux/actions/setAuthToken";
import Store from "./src/redux/store";
import { loadData } from "./src/redux/actions/Auth";
import Login from "./src/screen/Login";
import Register from "./src/screen/Register";
//FONT
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from '@expo/vector-icons';
//NAVIGATOR
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack"
import Home from "./src/screen/Home";


const Stack = createStackNavigator();

export default function App() {


  const innitialState = {
    isReady: false,
  }
  const [state, setState] = useState(innitialState)

  const localStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem("token")
      console.log("CEK LOCAL STORAGE", storage);
      if (storage) {
        SetAuthToken(storage)
      }
    } catch (error) {
      console.log("ERROR DR STORAGE", error);
    }
  }
  const firstLoad = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setState(() => ({
      isReady: true
    }))
  }
  useEffect(() => {
    console.log("CALL EFFECT");
    Store.dispatch(loadData())
    firstLoad()
    // localStorage()
  }, [])


  if (!state.isReady) {
    return (
      <AppLoading />
    )
  }
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
