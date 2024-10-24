import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';

const CardSearch = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={{ uri: item.image }}
        />
        </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={styles.container}>
      <Image source={require('../assets/images/Arrow2.png')} styles={styles.image}/>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 368,
    height:60,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    margin: 10,
    marginLeft:24,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  imageContainer: {
    position:'relative',
    marginLeft:20,
    marginRight: 20,
  },
  productImage: {
   width:56,
   height:53,
   borderRadius:8,
  },
  productInfo: {
    padding: 10,
    marginRight: 'auto',
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
  image: {
    width:24,
    height:24,
  },
  container: {
    marginRight:20,},
});

export default CardSearch;
