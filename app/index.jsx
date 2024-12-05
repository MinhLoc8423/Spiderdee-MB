import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const SplashScreenComponent = () => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="dark-content" backgroundColor="#1A1A1A" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./../assets/images/splash-image.png')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
                <Image source={require('./../assets/images/logo-spiderdee-light.png')} style={{ width: 120, height: 120, position: 'absolute' }} />
                <ActivityIndicator size={60} color="#FFFFFF" className='absolute top-[85%]' />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreenComponent;
