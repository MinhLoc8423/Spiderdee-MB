import { StyleSheet, View, Text, TextInput, Image, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, {useState} from 'react'
import CardSearch from '../components/cardSearch';

const Search = () => {

  const [userInput, setUserInput] = useState('');
  const [filteredData, setFilteredData] = useState(productList);
  const handleSearch = (query) => {
    setUserInput(query);
    if (query === '') {
      setFilteredData(productList);
    } else {
      const filtered = productList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
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
        id: '7',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '8',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '9',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '10',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
      {
        id: '11',
        name: 'Classic Polo',
        price: '$1,290',
        image: 'https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg',
      },
    ];
    const renderItem = ({ item }) => <CardSearch item={item} />;
  return (
    <View>
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={{marginLeft:24}}>
          <Image source={require('../constants/Image/Arrow.png')}
          style={styles.image2}/>
        </TouchableOpacity>
      <Text
        style={{
          width: 130,
          height: 32,
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 32,
          marginLeft:105,
          marginRight:68
        }}
      >
        Search
      </Text>
      <TouchableOpacity style={{marginRight:24}} >
      <Image
        source={require('../constants/Image/Bell.png')}
        style={styles.image}
      />
      </TouchableOpacity >
      </SafeAreaView>
      <View style={styles.containerSearcher}>
      <Image source={require("../constants/Image/Search.png")} style={styles.image4}/>
      <TextInput placeholder="Search for furniture..." style={styles.input} value={userInput} onChangeText={handleSearch}/>
      <TouchableOpacity>
      <Image source={require("../constants/Image/Mic.png")} style={styles.image3}/>
      </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    width:341,
    height:30,
    flexDirection: 'row',
    marginTop: 30
  },

  image: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  image4: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  image3: {
    width: 24,
    height: 24,
    marginLeft: 120,
  },
  containerProducts: {
  },
  image2: {
    width: 32,
    height: 32
  },
  input: {
    height: 40,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginLeft:10,
  },
  containerSearcher: {
    width: 368,
    height: 55,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth:1,
    paddingHorizontal:14,
    paddingVertical:20,
    marginTop:20,
    marginLeft:24,
  },
 
 
})