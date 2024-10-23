import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import Feather from 'react-native-vector-icons/Feather';

import CartItem from '../../(auth)/carfCard';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Regular Fit Slogan', size: 'L', price: 1190, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Regular Fit Polo', size: 'M', price: 1100, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Regular Fit Black', size: 'L', price: 1290, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Regular Fit Black', size: 'L', price: 1290, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Regular Fit Black', size: 'L', price: 1290, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Regular Fit Black', size: 'L', price: 1290, quantity: 1, image: 'https://via.placeholder.com/100' },

  ]);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Image source={require('../../../assets/images/EmptyCart.png')}/>
           
        </View>
      ) 
      :(
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <CartItem item={item} onIncrease={increaseQuantity} onDecrease={decreaseQuantity} onRemove={removeItem} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />

         <View style={styles.priceContainer}>
              <Text style={styles.textPrice}>Sub-total: </Text>
              <Text style={styles.price}>${totalAmount}</Text>
            </View> 
            <View style={styles.priceContainer}>
              <Text style={styles.textPrice}>VAT </Text>
              <Text style={styles.price}>(0%)</Text>
            </View> 
            <View style={styles.priceContainer}>
              <Text style={styles.textPrice}>Shipping fee</Text>
              <Text style={styles.price}>$ 80</Text>
            </View> 
            <View style={styles.liner}></View>
            <View style={styles.priceContainer}>
              <Text style={styles.textPriceTotal}>Total: </Text>
              <Text style={styles.price}>${totalAmount + 80}</Text>
            </View> 
            <TouchableOpacity style={styles.Pressable}>
        <Link href={"/(root)/(tabs)/home"} style={{ fontSize: 16, textAlign: 'center', color:'#FFFFFF', left:20 }}>Go To Checkout</Link>
        <Feather name={"arrow-right"} color={"white"} right={120} size={24}/>
      </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  emptyCart:{
    alignItems:'center',
    padding:'50%',
    width:'100%',
    height:'100%',
    backgroundColor:'#FFFFFF'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 20,
    marginTop: 10,
    marginEnd:20,
    
  },
  textPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#808080',
  },
  liner: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginVertical: 20,
  },
  textPriceTotal: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1A1A1A',
  },
  price:{
    fontSize:16,
    fontWeight:'500',
    color:'#1A1A1A'
  },
  Pressable: {
    borderRadius: 10,
    width: '100%',
    height: 52,
    borderWidth: 2,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginVertical: 30,
    margin:25
  },
});

export default CartScreen;
