import { Pressable, StyleSheet, Text, TextInput, View,Component, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const forgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:32, fontWeight:600, color:'#1A1A1A', fontStyle:'normal', paddingTop:40}}>Forgot password</Text>
      <Text style={{fontSize:16, fontWeight:400, color:'#808080'}}>Enter your email for the verification process. We will send 4 digits code to your email.</Text>
      <Text style={{fontSize:16, fontWeight:500,color:'#1A1A1A',paddingTop:20}}>Email</Text>
      <Pressable style={styles.Pressable}>
        <TextInput style={{paddingStart:20}}></TextInput>
      </Pressable>
      <TouchableOpacity  style={[styles.Pressable,{backgroundColor:'#1A1A1A',marginTop:200}]}>
        <Link href={"/(auth)/verification"} style={{fontSize:16, textAlign:'center',color:'#FFFFFF'}}>Send Code</Link>
      </TouchableOpacity>
    </View>
  )
}

export default forgotPassword

const styles = StyleSheet.create({
    container:{
        marginEnd:20,
        marginStart:20
        
    },
    Pressable:{
      borderRadius:10,
      width:341,
      height:52,
      borderWidth:1,
      borderColor:'#E6E6E6',
      justifyContent:'center'
    },
   
})