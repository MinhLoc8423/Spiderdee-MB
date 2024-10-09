import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Cart = () => {
  return (
    <View style={styles.container} >
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container :{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  }
})