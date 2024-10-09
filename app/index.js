import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Link} from 'expo-router'
import React from 'react'



const HomeLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  )
}

export default HomeLayout

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})