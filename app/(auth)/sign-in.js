import { Pressable, StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity, SafeAreaView, Checkbox } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

const SingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState('');
    



    const onSubmit = () => {
        let formData = {
            _email: email,
            _password: password,
        }
        let regexEmail = new RegExp(/^(?:([^<]*?)\s*<)?((?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))>?$/)
        if (!regexEmail.test(formData._email)) {
            setCheckEmail(false);
        } else {
            setCheckEmail(true);
        }
        formData._password === '' ? setErrorPassword('Vui lòng nhập Password') : setErrorPassword('');
        router.replace("/(root)/(tabs)/home", { relativeToDirectory: true })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Login to your account</Text>
            <Text style={styles.text1}>It’s great to see you again.</Text>

            <Text style={[styles.text1, { fontWeight: '500', marginTop: 20 }]}>Email</Text>
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
                    onChangeText={(value) => setPassword(value)}/>
                <Text style={{ color: 'red' }}>{errorPassword}</Text>
            </View>
            <Text style={styles.text2}>Forgot your password? <Link href={('/(auth)/forgotPassword')} style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Reset your password</Link> </Text>
            <TouchableOpacity  style={[styles.Pressable, { backgroundColor: '#1A1A1A', marginTop: 30 }]} onPress={() => onSubmit()} >
                <Link href={"/(root)/(tabs)/home"} style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Login </Link>
            </TouchableOpacity>
            <Text style={styles.textOr}>Or</Text>
            <TouchableOpacity style={[styles.Pressable, { marginTop: 15 }]}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>Sign Up with Google</Text>
                <Image
                    source={require("../../assets/images/gg.png")}
                    style={{ marginEnd: 10 }} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1877F2', marginTop: 10 }]}>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#FFFFFF' }}>Sign Up with Facebook</Text>
                <Image
                    source={require("../../assets/images/fb.png")}
                    style={{ marginEnd: 10 }} />
            </TouchableOpacity>
            <Link href={"/(auth)/sign-up"} style={[styles.text2, { textAlign: 'center', marginTop: 100 }]}>Don’t have an account? <Text style={{ color: '#1A1A1A', fontWeight: 600, textDecorationLine: 'underline' }}>Join</Text> </Link>
        </SafeAreaView>
    )
}

export default SingIn

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
    },



})