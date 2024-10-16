
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import Header from "../components/Home/header";
import React from "react";
import SearchBar from "../components/Home/searchbar";
import CategoryCard from "../components/Home/categorycard";
import Body from "../components/Home/body";


const HomeLayout = () => {
  return (
    <View style={styles.container}>
        <Header />
        <SearchBar />
        <CategoryCard/>
        <Body/>
    </View>
  );
};

export default HomeLayout

const styles = StyleSheet.create({
    
})
  
