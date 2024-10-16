import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={{ uri: item.image }}
        />
        {/* Favorite Icon */}
        <TouchableOpacity style={styles.heartIconContainer}>
          <Image source={require('../constants/Image/Heart.png')} style={styles.heartIcon}/>
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    margin: 10,
    marginHorizontal:15
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  heartIcon: {
    fontSize: 16,
    color: '#000',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default Card;
