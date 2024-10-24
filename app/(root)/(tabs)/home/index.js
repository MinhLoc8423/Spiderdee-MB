
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Header from "../../../../components/Home/header";
import React from "react";
import Body from "../../../../components/Home/body";


const HomeLayout = () => {
  return (
    <View style={styles.container}>
        <Header/>
        <Body/>
    </View>
  );
};

export default HomeLayout

const styles = StyleSheet.create({
    
})
  
