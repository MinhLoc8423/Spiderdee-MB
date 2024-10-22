
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../../components/tabBar'


const TabLayout = () => {
  return (
    <Tabs
        tabBar = {props=> <TabBar {...props}/>}
    >
        
        <Tabs.Screen
            name='index'
            options={{
                title: "Home",
                headerShown: false,
        }}
        />
        <Tabs.Screen
            name='search'
            options={{
                title: "Search",
                headerShown: false
        }}
        />
        <Tabs.Screen
            name='save'
            options={{
                title: "Save",
                headerShown: false
        }}
        />
        <Tabs.Screen
            name='cart'
            options={{
                title: "Cart",
                headerShown: false
        }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title: "Profile",
                headerShown: false
        }}
        />
   </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

