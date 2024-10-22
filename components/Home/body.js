import React,{useState} from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Card from "../card";
import Filter from "./filter";

const Body = () => {
  const productList = [
    {
      id: "1",
      name: "Regular Fit Slogan",
      price: "$1,190",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg", // URL của hình ảnh sản phẩm
    },
    {
      id: "2",
      name: "Slim Fit Shirt",
      price: "$1,590",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "3",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "4",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "5",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "6",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "7",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    {
      id: "8",
      name: "Classic Polo",
      price: "$1,290",
      image:
        "https://www.westelm.ae/assets/styles/GroupProductImages/cozy-swivel-chair-h3797/image-thumb__414993__product_listing/202423_0001_cozy-swivel-chair-z.jpg",
    },
    
    // Thêm các sản phẩm khác
  ];

  const renderItem = ({ item }) => <Card item={item} />;

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  
  const buttons = ['All', "Chair", "Sofa", "Table","Wardrobe"];

  
  const handlePress = (index) => {
    setSelectedButtonIndex(index);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.main}>
            <Image source={require("../../constants/Image/Search.png")} />
            <TextInput placeholder="Search for furniture..."></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => { NavigationContainer.navigate('Filter')
              }}
            >
              <Image
                source={require("../../constants/Image/Vector.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ScrollView horizontal={true} style={styles.containerCategories}>
          {buttons.map((buttonLabel, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.Card,
            selectedButtonIndex === index ? styles.buttonPressed : styles.buttonNormal
          ]}
          onPress={() => handlePress(index)}
        >
          <Text
            style={[
              styles.text,
              selectedButtonIndex === index ? styles.textPressed : styles.textNormal
            ]}
          >
            {buttonLabel}
          </Text>
        </TouchableOpacity>
        ))}
          </ScrollView>
        </View>
      </View>
      <View style={{height:520}}>
      <FlatList
        scrollEnabled={true}
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {marginLeft:24},
  main: {
    marginTop: 50,
    marginLeft: 24,
    gap: 4,
    backgroundColor: "#E6E6E6",
    width: 290,
    height: 60,
    borderRadius: 10,
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
  },
  Button: {
    marginTop: 50,
    marginLeft: 12,
    height: 60,
    width: 60,
    borderRadius: 10,
    paddingTop: 14.5,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 10,
    backgroundColor: "#1A1A1A",
  },
  containerCategories: {
    height:45,
    marginVertical:20,
    marginHorizontal: 24,
    flexDirection: "row",
    
  },
  Card:{
    width:92,
    height:42,
    marginLeft: 5,
    borderRadius:10,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#E6E6E6',
    gap: 10,
  },
  buttonNormal: {
    backgroundColor: "#E6E6E6",
  },
  buttonPressed: {
    backgroundColor: "#1A1A1A",
  },
  textNormal: {
    color: "#1A1A1A",
  },
  textPressed: {
    color: "#FFFFFF",
  },
});

export default Body;
