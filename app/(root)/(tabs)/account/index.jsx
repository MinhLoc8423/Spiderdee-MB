import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View, Text,Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
 
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.push('/(auth)/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style = {styles.container}>
      <TouchableOpacity style = {styles.card} onPress={()=> router.push('/(root)/(tabs)/account/my-order')}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Box.png')}/>
        <Text style = {styles.text}>My Order</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card} onPress={()=> router.push('/(root)/(tabs)/account/my-detail')}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Details.png')}/>
        <Text style = {styles.text}>My Detail</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Address.png')}/>
        <Text style = {styles.text}>Address Book</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Card.png')}/>
        <Text style = {styles.text}>Payment Methods</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card} onPress={()=> router.push('/(root)/(tabs)/account/notifications')}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Bell.png')}/>
        <Text style = {styles.text}>Notification</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card} onPress={()=> router.push('/(root)/(tabs)/account/faqs')}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Question.png')}/>
        <Text style = {styles.text}>FAQs</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card} >
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Headphones.png')}/>
        <Text style = {styles.text}>Help Center</Text>
        </View>
        <Image style = {styles.iconback} source={require('../../../../assets/icons/Arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.card} onPress={logout}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width:'100',height:'50', alignItems: 'center'}}>
        <Image style = {styles.icons} source={require('../../../../assets/icons/Logout.png')}/>
        <Text style = {styles.textl}>Logout</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 50,
  },
  card:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:24,
    alignItems: 'center',
    height: 72,
    border:1,
    shadowColor: 'gray',
    shadowOpacity: 1,
  },
  icons:{
    width: 32,
    height: 32,
  },
  iconback: {
    marginRight: 24,
    width: 32,
    height: 32,
  },
  text:{
    marginLeft:20,
    width: 80,
    height: 22,
    fontsize: 32,
    fontweight: 800,
    lineheight: 32,
    },
    textl:{
      color:'red',
      marginLeft:20,
      width: 80,
      height: 22,
      fontsize: 32,
      fontweight: 800,
      lineheight: 32,
      },
    
})

export default Account;
