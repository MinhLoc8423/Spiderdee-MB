import { Pressable, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import axios from 'axios';
const SingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState('');

    const onSubmit = async () => {
        let formData = {
            email: email,
            password: password,
        };
    
        try {
            // Thay đổi URL thành đúng endpoint API
            const response = await axios.post('https://example.com/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',  // Đảm bảo server nhận đúng định dạng JSON
                }
            });
    
            if (response.data.success) {
                // Đăng nhập thành công
                router.replace("/(root)/(tabs)/home", { relativeToDirectory: true });
            } else {
                // Hiển thị lỗi
                Alert.alert('Login Failed', response.data.message);
            }
        } catch (error) {
            if (error.response) {
                // Lỗi từ server (như 404, 500, 405)
                console.error('Error Response:', error.response);
                Alert.alert('Error', `Request failed with status code ${error.response.status}`);
            } else {
                // Lỗi kết nối mạng hoặc lỗi khác
                console.error('Error:', error.message);
                Alert.alert('Error', 'Something went wrong. Please try again later.');
            }
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Login to your account</Text>
            <Text style={styles.text1}>It’s great to see you again.</Text>

            <Text className="font-semibold text-base mt-5 text-black" >Email</Text>
            <View>
                <TextInput
                    style={styles.TextInputName}
                    placeholder='Enter your email address'
                    onChangeText={(value) => setEmail(value)}
                />
                <Text style={{ color: 'red' }}>{!checkEmail ? 'Sai định dạng Email' : ''}</Text>
            </View>

            <Text style={[styles.text1, { fontWeight: '500', marginTop: 10 }]}>Password</Text>
            <View>
                <TextInput
                    style={styles.TextInputName}
                    placeholder='Enter your password'
                    secureTextEntry
                    onChangeText={(value) => setPassword(value)}
                />
                <Text style={{ color: 'red' }}>{errorPassword}</Text>
            </View>

            <Text style={styles.text2}>Forgot your password? <Link href={('/(auth)/forgotPassword')} style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Reset your password</Link> </Text>

            <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1A1A1A', marginTop: 30 }]} onPress={onSubmit}>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.textOr}>Or</Text>
            <TouchableOpacity style={[styles.Pressable, { marginTop: 15 }]}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Sign Up with Google</Text>
                <Image
                    source={require("../../assets/images/gg.png")}
                    style={{ marginEnd: 10  }} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1877F2', marginTop: 10 }]}>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Sign Up with Facebook</Text>
                <Image
                    source={require("../../assets/images/fb.png")}
                    style={{ marginEnd: 10 }} />
            </TouchableOpacity>

            <Link href={"/(auth)/sign-up"} style={[styles.text2, { textAlign: 'center', marginTop: 100 }]}>
                Don’t have an account? <Text style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Join</Text>
            </Link>
        </SafeAreaView>
    );
};

export default SingIn;

const styles = StyleSheet.create({
    container: {
        marginEnd: 20,
        marginStart: 20
    },
    text: {
        fontSize: 32,
        fontWeight: '600',
        marginTop: 40,
        fontStyle: 'General Sans'
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
        marginTop: 5
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
