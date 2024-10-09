import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Save = () => {
  return (
    <View style={styles.container} >
      <Text>Save</Text>
    </View>
  )
}

export default Save

const styles = StyleSheet.create({
  container :{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  }
})