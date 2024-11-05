import { Stack, router } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';
import { AuthProvider } from '../store/providers/AuthProvider';
import { CartProvider } from '../store/providers/CartProvider';
import { AddressProvider } from '../store/providers/AddressProvider';
import { SaveItemProvider } from "../store/providers/SaveItemProvider";
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';

const RootLayout = () => {
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    GeneralBold: require('../assets/fonts/GeneralSans-Bold.otf'),
    GeneralBoldItalic: require('../assets/fonts/GeneralSans-BoldItalic.otf'),
    GeneralExtralight: require('../assets/fonts/GeneralSans-Extralight.otf'),
    GeneralItalic: require('../assets/fonts/GeneralSans-Italic.otf'),
    GeneralLight: require('../assets/fonts/GeneralSans-Light.otf'),
    GeneralLightItalic: require('../assets/fonts/GeneralSans-LightItalic.otf'),
    GeneralMedium: require('../assets/fonts/GeneralSans-Medium.otf'),
    GeneralRegular: require('../assets/fonts/GeneralSans-Regular.otf'),
    GeneralSemibold: require('../assets/fonts/GeneralSans-Semibold.otf'),
    GeneralSemiboldItalic: require('../assets/fonts/GeneralSans-SemiboldItalic.otf'),
  });

  useEffect(() => {
    if (!isLoading && fontsLoaded) {
      if (user) {
        router.replace('/(root)/(tabs)/home');
      } else {
        router.replace('/(auth)/onboarding');
      }
      SplashScreen.hideAsync(); // Chỉ gọi khi đã hoàn tất tải
    }
  }, [user, isLoading, fontsLoaded]);

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync('#1A1A1A');
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/product-details/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/reviews/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/checkout-address/check-out" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/checkout-address/address" options={{ headerShown: false }} />
      <Stack.Screen name="(root)/checkout-address/new-address" options={{ headerShown: false }} />
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
