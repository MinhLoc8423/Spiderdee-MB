import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View , Component} from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'

const resetPassword = () => {
    const [PassWord, setPassWord] = useState("");
   // const [isSecureEntry, setIsSecureEntry]=useState(true);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 32, fontWeight: 600, color: '#1A1A1A', fontStyle: 'normal', paddingTop: 40 }}>Reset Password</Text>
            <Text style={{ fontSize: 16, fontWeight: 400, color: '#808080' }}>Set the new password for your account so you can login and access all the features.</Text>
            <Text style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A', paddingTop: 20 }}>Password</Text>
            <Pressable style={styles.Pressable}>
                <TextInput 
                style={{ paddingStart: 20 }}
                secureTextEntry={true} onChangeText={(item) => setPassWord(item)}/>
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: 500, color: '#1A1A1A', paddingTop: 20 }}>Password</Text>
            <Pressable style={styles.Pressable}>
                <TextInput 
                style={{ paddingStart: 20 }}
                secureTextEntry={true} onChangeText={(item) => setPassWord(item)}/>
            </Pressable>
            <TouchableOpacity style={[styles.Pressable, { backgroundColor: '#1A1A1A', marginTop: 150 }]}>
                <Link href={('/(auth)/sign-in')} style={{ fontSize: 16, textAlign:'center', color: '#FFFFFF' }}>Continue</Link>
            </TouchableOpacity>
        </View>
    )
}

export default resetPassword

const styles = StyleSheet.create({
    container: {
        marginEnd: 20,
        marginStart: 20

    },
    Pressable: {
        borderRadius: 10,
        width: 341,
        height: 52,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        justifyContent:'center',
        
    },

})