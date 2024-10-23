import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
    return <Redirect href="/(root)/(tabs)/account" />;
}

export default Page