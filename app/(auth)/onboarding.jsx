import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const OnboardingScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Image Section */}
      <View className='flex-1'>
        <Image
          source={require('../../assets/images/onboarding-image.png')}  // Add your image path here
          className='w-full h-full object-cover'
        />
      </View>

      {/* Text Section */}
      <View className='absolute top-20 left-5 right-5'>
        <Text className='text-5xl font-bold text-black'>
          Define yourself{'\n'}in your unique way.
        </Text>
      </View>

      {/* Button Section */}
      <View className='absolute bottom-10 left-5 right-5'>
        <TouchableOpacity
          className='bg-black p-4 rounded-lg flex-row items-center justify-center'
          onPress={()=> router.push('/sign-in')}
        >
          <Text className='text-white text-lg font-bold mr-2'>Get Started</Text>
          <Text className='text-white text-lg'>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
