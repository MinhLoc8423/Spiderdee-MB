import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoryCard = () => {
  return (
    <View>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={styles.Cardall}>
          <Text>All</Text>
        </View>
        <View style={styles.Card}>
          <Text>Chair</Text>
        </View>
        <View style={styles.Card}>
          <Text>Table</Text>
        </View>
        <View style={styles.Card}>
          <Text>Sofa</Text>
        </View>
        <View style={styles.Card}>
          <Text>Wardrobe</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    height:45,
    marginVertical:20,
    marginHorizontal: 24,
    flexDirection: "row",
    
  },
  Cardall:{
    width:60,
    height:42,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#E6E6E6'
  },
  Card:{
    width:92,
    height:42,
    marginLeft: 5,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#E6E6E6'
  }
});
