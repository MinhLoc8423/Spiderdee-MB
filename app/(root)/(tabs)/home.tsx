import { View, Text, StatusBar } from 'react-native';
import React from 'react'

const HomePage = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-blue-700">Open up App.js to start working on your app!</Text>
      <StatusBar barStyle="dark-content" />
    </View>
  )
}

export default HomePage