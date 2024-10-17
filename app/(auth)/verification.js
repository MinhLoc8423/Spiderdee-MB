import { Pressable, StyleSheet, Text, TextInput, View,Component, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'


const verification = () => {
  
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
  
    const handleChange = (input) => {
      // Loại bỏ các ký tự không phải số
      const numericValue = input.replace(/[^0-9]/g, '');
    
      // Chỉ cho phép giá trị từ 1 đến 100
      if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
        setValue(numericValue);
        console.log(value)
      }
    };
    const handleChange1 = (input) => {
      // Loại bỏ các ký tự không phải số
      const numericValue = input.replace(/[^0-9]/g, '');
      
      // Chỉ cho phép giá trị từ 1 đến 100
      if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
        setValue1(numericValue);
        console.log(value1)
      }
    };
    const handleChange2 = (input) => {
      // Loại bỏ các ký tự không phải số
      const numericValue = input.replace(/[^0-9]/g, '');
      
      // Chỉ cho phép giá trị từ 1 đến 100
      if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
        setValue2(numericValue);
        console.log(value2)
      }
    };
    const handleChange3 = (input) => {
      // Loại bỏ các ký tự không phải số
      const numericValue = input.replace(/[^0-9]/g, '');
      
      // Chỉ cho phép giá trị từ 1 đến 100
      if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 9)) {
        setValue3(numericValue);
        return numericValue;
      }
    };
  return (
    <View style={styles.container}>
      <Text style={{fontSize:32, fontWeight:600, color:'#1A1A1A', fontStyle:'normal', paddingTop:40}}>Enter 4 Digit Code</Text>
      <Text style={{fontSize:16, fontWeight:400, color:'#808080'}}>Enter 4 digit code that your receive on your email <Text style={{fontSize:16, fontWeight:'400',color:'black'}} >(cody.fisher45@example.com).</Text></Text>

      
    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
    
    <View style={styles.Pressable1}>
      <TextInput
        style={{fontSize:40,textAlign:'center',fontWeight:'500'}}
        keyboardType="numeric"
        value={value}
        onChangeText={handleChange} />
    </View>
    <View style={styles.Pressable1}>
      <TextInput
        style={{fontSize:40,textAlign:'center',fontWeight:'500'}}
        keyboardType="numeric"
        value={value1}
        onChangeText={handleChange1} />
    </View>
    
    <View style={styles.Pressable1}>
      <TextInput
        style={{fontSize:40,textAlign:'center',fontWeight:'500'}}
        keyboardType="numeric"
        value={value2}
        onChangeText={handleChange2} />
    </View>
    <View style={styles.Pressable1}>
      <TextInput
        style={{fontSize:40,textAlign:'center',fontWeight:'500'}}
        keyboardType="numeric"
        value={value3}
        onChangeText={handleChange3} />
    </View>
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