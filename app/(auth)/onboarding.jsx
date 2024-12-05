import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const OnboardingScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/* Image Section */}
      <View className='flex-1'>
        <Image
          source={require('../../assets/images/onboarding-image.png')}  
          className='w-full h-full object-cover'
        />
      </View>

      {/* Text Section */}
      <View className='absolute top-20 left-5 right-5'>
        <Text className='text-6xl font-bold text-black'>
        Hãy định nghĩa bản thân bạn{'\n'}theo cách độc đáo của bạn.
        </Text>
      </View>

      {/* Button Section */}
      <View className='absolute bottom-10 left-5 right-5'>
        <TouchableOpacity
          className='bg-black p-4 rounded-lg flex-row items-center justify-center'
          onPress={()=> router.push('/sign-in')}
        >
          <Text className='text-white text-base font-medium mr-2'>Bắt đầu</Text>
          <Text className='text-white text-lg'>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
