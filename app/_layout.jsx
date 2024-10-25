import { Stack } from "expo-router";
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from "react-native";

const RootLayout = () => {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#1A1A1A"); 
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default RootLayout