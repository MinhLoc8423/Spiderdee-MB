import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import Card from '../card';

const Body = () => {
  const productList = [
    {
      id: '1',
      name: 'Regular Fit Slogan',
      price: '$1,190',
      image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg', // URL của hình ảnh sản phẩm
    },
    {
      id: '2',
      name: 'Slim Fit Shirt',
      price: '$1,590',
      image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
    },
    {
      id: '3',
      name: 'Classic Polo',
      price: '$1,290',
      image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
    },
    {
        id: '4',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '5',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '6',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '6',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '6',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
    // Thêm các sản phẩm khác
  ];

  const renderItem = ({ item }) => <Card item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:16,
    marginHorizontal:24,
    height:500,
    backgroundColor: '#F8F8F8',
  },
});

export default Body;
