import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AccountLayout = () => {
  return (
   <Stack>
    <Stack.Screen name="index" options={{ title: "Account", headerShown: false }} />
   </Stack>
  )
}

export default AccountLayout