import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { router } from 'expo-router';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setLogoutTimer = async () => {
      const token = await AsyncStorage.getItem('accessTokenUser');
      console.log("Retrieved Token:", token);

      if (token && typeof token === 'string') {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
          if (timeUntilExpiry > 0) {
            setUser(decodedToken);
            console.log("Setting logout timer", timeUntilExpiry);
            setTimeout(async () => {
              console.log("Timeout reached. Logging out...");
              await AsyncStorage.removeItem('accessTokenUser');
              setUser(null);
              router.replace("/(auth)/sign-in");
            }, timeUntilExpiry);
          } else {
            await AsyncStorage.removeItem('accessTokenUser');
            setUser(null);
            router.replace("/(auth)/sign-in");
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.log("No valid token found. Not setting logout timer.");
      }
      setIsLoading(false);
    };
    setLogoutTimer();
  }, []);

  const login = async (token) => {
    if (token && typeof token === 'string') {
      try {
        await AsyncStorage.setItem('accessTokenUser', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
        router.replace('/(tabs)/home');
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      console.error('Invalid token:', token);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessTokenUser');
    setUser(null);
    router.replace('/(auth)/onboarding');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
