import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Help = () => {
  return (
    <SafeAreaView style={styles.container}>
            {/* Header */}
            <View
                style={{
                    marginEnd:20,
                    marginStart:20,
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
                    Helper Center
                </Text>
                <TouchableOpacity>
                    <Image
                        source={require("../../../../assets/icons/bell-icon.png")}
                        style={{ width: 24, height: 24 }}
/>
                </TouchableOpacity>
            </View>
            {/* Body */}

    </SafeAreaView>
  )
}

export default Help

const styles = StyleSheet.create({})