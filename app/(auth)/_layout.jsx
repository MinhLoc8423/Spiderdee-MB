import { Stack } from "expo-router";
import { Platform, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

const AuthLayout = () => {
  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#FFFFFF"); 
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{ title: "Onboarding Page", headerShown: false }}
        />
        <Stack.Screen
          name="sign-in"
          options={{ title: "Sign In Page", headerShown: false }}
        />
        <Stack.Screen
          name="sign-up"
          options={{ title: "Sign Up Page", headerShown: false }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{ title: "Forgot Password Page", headerShown: false }}
        />
        <Stack.Screen
          name="verification"
          options={{ title: "Verification Page", headerShown: false }}
        />
        <Stack.Screen
          name="reset-password"
          options={{ title: "Reset Password Page", headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
