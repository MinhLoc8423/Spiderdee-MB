import { Pressable, StyleSheet, Text, TextInput, View,Component, TouchableOpacity  } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const verification = () => {
    
  return (
    <View style={styles.container}>
      <Text style={{fontSize:32, fontWeight:600, color:'#1A1A1A', fontStyle:'normal', paddingTop:40}}>Enter 4 Digit Code</Text>
      <Text style={{fontSize:16, fontWeight:400, color:'#808080'}}>Enter 4 digit code that your receive on your email <Text style={{fontSize:16, fontWeight:'400',color:'black'}} >(cody.fisher45@example.com).</Text></Text>

      
    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
    <Pressable style={styles.Pressable1}>
        <TextInput style={{paddingStart:20,fontSize:30,color:'#1A1A1A',fontWeight:'900'}}></TextInput>
      </Pressable>
      <Pressable style={styles.Pressable1}>
        <TextInput style={{paddingStart:20,fontSize:30,color:'#1A1A1A',fontWeight:'900'}}></TextInput>
      </Pressable>
      <Pressable style={styles.Pressable1}>
        <TextInput style={{paddingStart:20,fontSize:30,color:'#1A1A1A',fontWeight:'900'}}></TextInput>
      </Pressable>
      <Pressable style={styles.Pressable1}>
        <TextInput style={{paddingStart:20,fontSize:30,color:'#1A1A1A',fontWeight:'900'}}></TextInput>
      </Pressable>
    </View>
    <Text style={{paddingTop:20,textAlign:'center',fontSize:16, fontWeight:400}}>Email not received? <Text style={{paddingTop:20,textAlign:'center',fontSize:16, fontWeight:500,color:'black'}}>Resend code</Text></Text>
      
      <TouchableOpacity style={[styles.Pressable,{backgroundColor:'#1A1A1A',marginTop:200}]}>
        <Link href={('/(auth)/resetPassword')} style={{fontSize:16, textAlign:'center',color:'#FFFFFF', }}>Continue</Link>
      </TouchableOpacity>
    </View>
  )
}

export default verification

const styles = StyleSheet.create({
    container:{
        marginEnd:20,
        marginStart:20
        },
    Pressable1:{
      borderRadius:10,
      width:62,
      height:60,
      borderWidth:1,
      borderColor:'#E6E6E6',
      marginTop:20,
      
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