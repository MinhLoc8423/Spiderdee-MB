import { Pressable, StyleSheet, Text, View, TextInput, Image, SafeAreaView, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import axios from 'axios';
import InputComponent from '../../components/CustomInput';
import { validateEmail, validatePassword, validatePhoneNumber } from '../../helpers/validate';
import { register } from '../../api/auth';

const Signup = () => {

    const [firstName, setFirstName] = useState('Siderdee');
    const [firstNameError, setFirstNameError] = useState('');

    const [lastname, setLastName] = useState('Manager');
    const [lastNameError, setLastNameError] = useState('');

    const [email, setEmail] = useState('admin3@spiderdee.com');
    const [emailError, setEmailError] = useState('');

    const [phone, setPhone] = useState('09273932323');
    const [phoneError, setPhoneError] = useState('');


    const [password, setPassword] = useState('Passwordvtvn123');
    const [passwordError, setPasswordError] = useState('');

    const [passwordConfirm, setPasswordConfirm] = useState('Passwordvtvn123');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleRegister = async () => {
        let hasError = false;
        setLoading(true);
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setPhoneError("");
        setPasswordConfirmError("");

        if(!firstName) {
            setFirstNameError("Please enter your first name.");
            hasError = true;
        }
        if(!lastname) {
            setLastNameError("Please enter your last name.");
            hasError = true;
        }
        if(!validatePhoneNumber(phone)) {
            setPhoneError("Please enter your phone number.");
            hasError = true;
        }

        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }

        if (!validatePassword(password)) {
            setPasswordError("Please enter a valid password.");
            hasError = true;
        }

        if (!validatePassword(passwordConfirm)) {
            setPasswordConfirmError("Please enter a valid password confirm.");
            hasError = true;
        }

        if (password !== passwordConfirm) {
            setPasswordError("Passwrods do not match.");
            setPasswordConfirmError("Passwrods do not match.");
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        try {
            const userData = await register(firstName, lastname, email, password, phone);
            console.log(userData);
            if (!userData) {
                setEmailError("Email already exists");
            } else {
                // await AsyncStorage.setItem('accessTokenUser', userData.token);
                router.replace('/(tabs)/home');
            }
        } catch (error) {
            Alert.alert('An unexpected error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                style={styles.container}
            >
                <Text style={styles.text}>Create an account</Text>
                <Text style={styles.text1} className='mb-6'>Let’s create your account.</Text>

                <InputComponent label='Email' value={email} placeholder={'Please enter your email'} setValue={setEmail} error={emailError} />

                <InputComponent label='First Name' value={firstName} placeholder={'Please enter your first name'} setValue={setFirstName} error={firstNameError} />

                <InputComponent label='Last Name' value={lastname} placeholder={'Please enter your last name'} setValue={setLastName} error={lastNameError} />

                <InputComponent label='Phone Number' value={phone} placeholder={'Please enter your phone number'} setValue={setPhone} error={phoneError} keyboardType="numeric" />

                <View className='my-1.5 '>
                    <Text style={{ fontFamily: 'GeneralMedium' }} className='w-80 text-base'>Password</Text>
                    <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused ? 'border-primary-900' : (passwordError ? 'border-danger' : 'border-primary-100')}`}>
                        <TextInput
                            style={{ fontFamily: 'GeneralMedium', flex: 1 }} // Make TextInput take remaining space
                            className='text-sm'
                            placeholder='Enter your password'
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={(value) => setPassword(value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='ml-2'>
                            <Image
                                source={showPassword ? require('../../assets/icons/eye-on-icon.png') : require('../../assets/icons/eye-off-icon.png')}
                                className='h-6 w-6'
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordError && (<Text style={{ color: 'red', fontFamily: 'GeneralMedium' }}>{passwordError}</Text>)}
                </View>

                <View className='my-1.5'>
                    <Text style={{ fontFamily: 'GeneralMedium' }} className='w-80 text-base'>Password Confirm</Text>
                    <View className={`flex-row items-center border rounded-xl h-[50] px-5 ${isFocused1 ? 'border-primary-900' : (passwordConfirmError ? 'border-danger' : 'border-primary-100')}`}>
                        <TextInput
                            style={{ fontFamily: 'GeneralMedium', flex: 1 }} // Make TextInput take remaining space
                            className='text-sm'
                            placeholder='Enter your password'
                            value={passwordConfirm}
                            secureTextEntry={!showPassword1}
                            onChangeText={(value) => setPasswordConfirm(value)}
                            onFocus={() => setIsFocused1(true)}
                            onBlur={() => setIsFocused1(false)}
                        />
                        <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)} className='ml-2'>
                            <Image
                                source={showPassword1 ? require('../../assets/icons/eye-on-icon.png') : require('../../assets/icons/eye-off-icon.png')}
                                className='h-6 w-6'
                            />
                        </TouchableOpacity>
                    </View>
                    {passwordConfirmError && (<Text style={{ color: 'red', fontFamily: 'GeneralMedium' }}>{passwordConfirmError}</Text>)}
                </View>

                <Text style={styles.text2}>By signing up you agree to our <Text style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Terms, Privacy Policy, and Cookie Use</Text></Text>

                <TouchableOpacity disabled={isLoading} style={[styles.Pressable, { backgroundColor: '#1A1A1A', marginTop: 30 }]} onPress={handleRegister}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Create an Account</Text>
                </TouchableOpacity>

                <View className='flex-row items-center mb-5 mt-5'>
                    <View className='flex-1 h-px bg-gray-300' />
                    <Text className='px-2 text-gray-500'>Or</Text>
                    <View className='flex-1 h-px bg-gray-300' />
                </View>

                <TouchableOpacity style={[styles.Pressable]}>
                    <Text style={{ fontSize: 16, textAlign: 'center' }}>Sign Up with Google</Text>
                    <Image
                        source={require("../../assets/icons/logo-google-icon.png")}
                        style={{ marginEnd: 10 }} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1877F2', marginTop: 10 }]}>
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Sign Up with Facebook</Text>
                    <Image
                        source={require("../../assets/icons/logo-facebook-icon.png")}
                        style={{ marginEnd: 10 }} />
                </TouchableOpacity>

                <Text style={[styles.text2, { textAlign: 'center', marginTop: 20, marginBottom: 50 }]} className='mb-5'>Already have an account? <Link href={('/(auth)/sign-in')} style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Log In</Link></Text>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        marginEnd: 25,
        marginStart: 25,
    },
    text: {
        fontSize: 32,
        fontWeight: '600',
        marginTop: 45
    },
    text1: {
        fontSize: 16,
        fontWeight: '200'
    },
    TextInputName: {
        borderWidth: 1,
        borderRadius: 10,
        width: 341,
        height: 52,
        marginVertical: 5,
        paddingStart: 20,
        borderColor: '#E6E6E6',
        fontSize: 14
    },
    text2: {
        fontSize: 13,
        fontWeight: '200',
    },
    Pressable: {
        borderRadius: 10,
        width: 341,
        height: 52,
        borderWidth: 2,
        borderColor: '#E6E6E6',
        justifyContent: 'center',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    textOr: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        marginTop: 15
    }
});
