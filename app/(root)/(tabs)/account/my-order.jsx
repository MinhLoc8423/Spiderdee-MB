import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React,{useState, useEffect} from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllOrders } from "../../../../api/order";
import {jwtDecode} from "jwt-decode";


const MyOrder = () => {

const fetchData = async () =>{
  
  const orderData = await getAllOrders();
  console.log('orderData: ', orderData);
  }
 

  return (
    <SafeAreaView>
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
          My Order
        </Text>
        <TouchableOpacity>
          <Image
            source={require("../../../../assets/icons/bell-icon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButtonCompleted}>
          <Text style={styles.toggleText}>Completed</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Image
          source={require("../../../../assets/images/table-image.jpg")} // Replace with your image URL
          style={styles.image}
        />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.title}>Order ID:</Text>
         <Text style={styles.size}>Size L</Text>
         <Text style={styles.size}>Address</Text>
        <Text style={styles.price}>Prices: $</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.statusContainer}>
          <TouchableOpacity style={styles.status}><Text></Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Track Order</Text>
        </TouchableOpacity> 
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 32,
    width: 341,
    height: 52,
    backgroundColor: "#E6E6E6",
  },
  toggleButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 162,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  toggleButtonCompleted: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    borderRadius: 10,
    width: 162,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  leftContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  middleContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  size: {
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusContainer: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  status: {
    color: '#888',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
