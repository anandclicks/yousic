import { Redirect, Stack } from "expo-router";
import '../global.css';
import MusicContextProvider from "../context/MusicContext";

import { StatusBar } from "react-native";
export default function RootLayout() {
  return <>
    <MusicContextProvider>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </MusicContextProvider>
  </>
}
