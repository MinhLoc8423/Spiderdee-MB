import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack>
    <Stack.Screen name="home" options={{ title: "Home", headerShown: false }} />
    <Stack.Screen name="productdetail" options={{ title: "productdetail", headerShown: false }} />
   </Stack>
  )
}

export default _layout