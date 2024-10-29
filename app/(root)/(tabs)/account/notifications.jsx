import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { router } from 'expo-router'




const notifications = () => {
  return (
    <View>
     {/* Header */}
     <View
     style={{
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
       paddingTop: 38,
       paddingBottom: 23,
     }}
   >
     <TouchableOpacity onPress={() => router.back()}>
       <Image
         source={require("../../../../assets/icons/arrow-icon.png")}
         style={{ width: 24, height: 24 }}
       />
     </TouchableOpacity>
     <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
       Notifications
     </Text>
     <TouchableOpacity>
       <Image
         source={require("../../../../assets/icons/bell-icon.png")}
         style={{ width: 24, height: 24 }}
       />
     </TouchableOpacity>
   </View>
   {/* Body */}
   
   </View>
  )
}

export default notifications

const styles = StyleSheet.create({
   
})