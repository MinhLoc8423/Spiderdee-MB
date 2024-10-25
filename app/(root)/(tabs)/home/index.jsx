import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCategories } from "../../../../api/category";
import { getAllProducts, searchProducts } from "../../../../api/product";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchData = async () => {
    const productsData = await getAllProducts();
    console.log(productsData);
    const categoriesData = await getAllCategories();
    setCategories(categoriesData.data);
    setProducts(productsData.data);
  };

  const handleFilter = async (category) => {
    let name = '';
    let categoryf = category;
    let min_price = '';
    let max_price = '';
    const productsData = await searchProducts(name, categoryf, min_price, max_price);
    setProducts(productsData.data);
    console.log(productsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center w-full mt-5">
          <Text style={{ fontFamily: "GeneralSemibold" }} className="text-3xl">
            Discover
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex items-center"
          >
            <Image
              source={require("../../../../assets/icons/bell-icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        {/* Header */}

        {/* Search and Filter Section */}
        <View className="my-4 flex-row items-center space-x-2">
          {/* Search Bar */}
          <View className="flex-1 flex-row items-center border border-primary-100 rounded-lg px-4 py-2">
            <Image
              source={require("../../../../assets/icons/search-icon.png")}
              className="w-6 h-6"
              style={{ tintColor: "gray" }}
            />
            <TextInput
              placeholder="Search for clothes..."
              className="ml-2 flex-1 text-primary-400 text-base"
              style={{
                fontFamily: "GeneralRegular",
                paddingVertical: 0,
                lineHeight: 20,
              }}
            />
          </View>

          {/* Filter Button */}
          <TouchableOpacity className="bg-primary-900 rounded-lg p-[10] flex items-center justify-center">
            <Image
              source={require("../../../../assets/icons/filter-icon.png")}
              className="w-6 h-6"
              style={{ tintColor: "#FFFFFF" }}
            />
          </TouchableOpacity>
        </View>
        {/* Search and Filter Section */}

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {[{ _id: "", name: "All" }, ...categories].map(
            (currentValue, index) => (
              <TouchableOpacity
                key={currentValue._id}
                onPress={() => {
                  handleFilter(currentValue._id);
                  setSelectedCategory(currentValue.name);
                }}
                className={`px-4 py-2 mr-2 rounded-lg border border-primary-100 bg ${
                  selectedCategory === currentValue.name
                    ? "bg-black"
                    : "bg-primary-0"
                }`}
              >
                <Text
                  style={{ fontFamily: "GeneralMedium" }}
                  className={` ${
                    selectedCategory === currentValue.name
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {currentValue.name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
        {/* Categories */}

        {/* Product Grid */}
        <ScrollView
        className="bg-black"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-row flex-wrap">
            {products.map((product, index) => (
              <TouchableOpacity key={index} className="w-1/2 p-2">
                <View>
                  <Image
                    source={{ uri: product.image }}
                    className="w-full h-44 rounded-lg"
                  />
                  <Text
                    style={{ fontFamily: "GeneralSemibold" }}
                    className="mt-2  text-base"
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{ fontFamily: "GeneralMedium" }}
                    className="mt-1 text-gray-600 text-xs"
                  >
                    ${product.price.toLocaleString()}
                  </Text>
                  <TouchableOpacity className="absolute top-2 right-2 bg-primary-0 rounded-lg p-2 ">
                    <Image
                      source={require("../../../../assets/icons/heart-icon.png")}
                      className="w-4 h-4"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Product Grid */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
