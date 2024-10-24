import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StatusBar, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreenComponent = () => {
    const router = useRouter();

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    const [loaded] = useFonts({
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
        const hideSplashScreen = async () => {
            if (loaded) {
                const token = await AsyncStorage.getItem('accessTokenUser');
                await SplashScreen.hideAsync();
                const timer = setTimeout(() => {
                    if (token) {
                        router.replace('/(tabs)/home');
                    } else {
                        router.replace('/(auth)/onboarding');
                    }
                }, 3000);
                return () => clearTimeout(timer);
            }
        };
        hideSplashScreen();
    }, [loaded, router]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center' }} >
            <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./../assets/images/splash-image.png')} style={{ width: '100%', height: '100%', position: 'absolute' }} />
                <Image source={require('./../assets/images/logo-spiderdee-light.png')} style={{ width: 120, height: 120, position: 'absolute' }} />
                <ActivityIndicator size={60} color="#FFFFFF" className='absolute top-[85%]' />
            </View>
        </SafeAreaView>
    );
};

export default SplashScreenComponent;
