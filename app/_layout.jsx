import { Stack, router } from "expo-router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/contexts/AuthContext";
import { AuthProvider } from "../store/providers/AuthProvider";
import { CartProvider } from "../store/providers/CartProvider";
import { AddressProvider } from "../store/providers/AddressProvider";
import { SaveItemProvider } from "../store/providers/SaveItemProvider";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { setStatusBarStyle } from "expo-status-bar";

const RootLayout = () => {
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);
  useEffect(() => {
    console.log("User:", user);
    console.log("isLoading:", isLoading);
    if (!isLoading) {
      if (user) {
        router.replace("/(root)/(tabs)/home");
      } else {
        router.replace("/(auth)/onboarding");
      }
      SplashScreen.hideAsync(); // Chỉ gọi khi đã hoàn tất tải
    }
  }, [user, isLoading]);

  if (Platform.OS === "android") {
    NavigationBar.setBackgroundColorAsync("#1A1A1A");
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(root)/product-details/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/reviews/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/checkout-address/check-out"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/checkout-address/address"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/checkout-address/new-address"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/checkout-address/edit-address"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/checkout-address/payment"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(root)/track-order/[id]"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default () => (
  <AuthProvider>
    <SaveItemProvider>
      <CartProvider>
        <AddressProvider>
          <RootLayout />
        </AddressProvider>
      </CartProvider>
    </SaveItemProvider>
  </AuthProvider>
);
