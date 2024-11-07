import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCategories } from "../../../../api/categoryAPIs";
import { getAllProducts, searchProducts } from "../../../../api/productAPIs";
import { router } from "expo-router";
import { AuthContext } from "../../../../store/contexts/AuthContext";
import ProductItem from "../../../../components/ProductItem";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const { user } = useContext(AuthContext);

  // Fetch data from APIs
  const fetchData = useCallback(async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      setCategories(categoriesData.data);
      setProducts(productsData.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu: ", error);
    }
  }, []);

  // Handle product filtering based on category
  const handleFilter = useCallback(async (categoryId) => {
    try {
      const productsData = await searchProducts("", categoryId, "", "");
      setProducts(productsData.data);
    } catch (error) {
      console.error("Lỗi khi lọc sản phẩm: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleFilter(item._id);
        setSelectedCategory(item.name);
      }}
      className={`px-4 py-2 mr-2 h-9 rounded-lg border border-primary-100 items-center ${
        selectedCategory === item.name ? "bg-black" : "bg-primary-0"
      }`}
    >
      <Text
        className={`${
          selectedCategory === item.name ? "text-white" : "text-gray-600"
        } font-medium`}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Render product item
  const renderProductItem = ({ item }) => {
    return <ProductItem item={item} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <View className="flex-row justify-between items-center w-full mt-3">
        <Text className="text-3xl font-semibold">Discover</Text>
        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/home/notification")}
          className="flex items-center"
        >
          <Image
            source={require("../../../../assets/icons/bell-icon.png")}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>

      <View
        style={{ height: 56 }}
        className="my-4 flex-row items-center space-x-2"
      >
        <Pressable
          onPress={() => router.push("/(root)/(tabs)/search")}
          className="flex-1 flex-row items-center border border-primary-100 rounded-lg px-4 py-[10]"
        >
          <Image
            source={require("../../../../assets/icons/search-icon.png")}
            className="w-6 h-6"
            style={{ tintColor: "#999999" }}
          />
          <TextInput
            onPress={() => router.push("/(root)/(tabs)/search")}
            placeholder="Tìm kiếm nội thất..."
            className="ml-2 flex-1 text-primary-900 text-base"
            style={{
              fontFamily: "GeneralRegular",
              paddingVertical: 0,
              lineHeight: 20,
            }}
          />
        </Pressable>
        <TouchableOpacity className="bg-primary-900 rounded-lg p-[10] flex items-center justify-center">
          <Image
            source={require("../../../../assets/icons/filter-icon.png")}
            className="w-6 h-6"
            style={{ tintColor: "#FFFFFF" }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        
        data={[{ _id: "", name: "Tất cả" }, ...categories]}
        keyExtractor={(category) => category._id}
        className="h-9"
        style={{ height: 50 }}
        renderItem={renderCategoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProductItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomePage;
