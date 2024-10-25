import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
   <Stack>
    <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
    <Stack.Screen name="product-detail" options={{ title: "Product Detail", headerShown: false }} />
   </Stack>
  )
}

export default HomeLayout