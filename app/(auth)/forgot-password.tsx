import { Pressable, StyleSheet, Text, Image, View, ScrollView, SafeAreaView, Alert } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { validateEmail } from '../../helpers/validate';
import InputComponent from '../../components/CustomInput';
import { sendOTP } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('minhlocworkemail@gmail.com');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    let hasError = false;
    setLoading(true);
    setEmailError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      const userData = await sendOTP(email);
      if (!userData) {
        setEmailError('Incorrect email.');
      } else {
        router.replace('/(auth)/verification');
      }
    } catch (error) {
      Alert.alert('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      className="bg-primary-0"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SafeAreaView style={styles.container}>
        {/* Nút quay lại */}
        <Text className='text-3xl mt-10' style={{ fontFamily: 'GeneralSemibold' }} onPress={() => router.back()} >
          <Image source={require('../../assets/icons/arrow-icon.png')} className="w-6 h-6" />
        </Text>

        {/* Tiêu đề */}
        <Text className='text-4xl mt-3' style={{ fontFamily: 'GeneralSemibold' }}  >Forgot password</Text>
        <Text style={[styles.subHeaderText, { fontFamily: 'GeneralRegular' }]}>
          Enter your email for the verification process. We will send a 4-digit code to your email.
        </Text>

        {/* Input Email */}
        <InputComponent label="Email" value={email} placeholder={'Please enter your email'} setValue={setEmail} error={emailError} />

        {/* Nút Gửi Code */}
        <Pressable
          style={[styles.Pressable, { marginTop: 30 }]}
          onPress={handleSendOTP}
          className={`w-full ${isLoading ? 'bg-primary-200' : 'bg-primary-900'}`}
          disabled={isLoading}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Send Code</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginEnd: 20,
    marginStart: 20,
  },
  headerText: {
    fontSize: 32,
    color: '#1A1A1A',
    paddingTop: 20,
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 20, // Khoảng cách dưới cùng
  },
  Pressable: {
    borderRadius: 10,
    width: 341,
    height: 52,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
  },
});
