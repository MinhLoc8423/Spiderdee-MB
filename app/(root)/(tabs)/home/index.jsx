import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllCategories } from "../../../../api/category";
import { getAllProducts, searchProducts } from "../../../../api/product";
import { router } from "expo-router";
import Slider from "@react-native-community/slider"; // Thanh kéo chọn giá

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [priceRange, setPriceRange] = useState([0, 19]);
  const [selectedSize, setSelectedSize] = useState("L"); // State cho kích thước được chọn

  const fetchData = async () => {
    const productsData = await getAllProducts();
    console.log(productsData);
    const categoriesData = await getAllCategories();
    setCategories(categoriesData.data);
    setProducts(productsData.data);
  };

  const handleFilter = async (category) => {
    let name = "";
    let categoryf = category;
    let min_price = "";
    let max_price = "";
    const productsData = await searchProducts(
      name,
      categoryf,
      min_price,
      max_price
    );
    setProducts(productsData.data);
    console.log(productsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = () => {
    setFilterVisible(false); // Đóng modal sau khi áp dụng bộ lọc
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center w-full mt-5">
          <Text style={{ fontFamily: "GeneralSemibold" }} className="text-3xl">
            Khám phá
          </Text>
          <TouchableOpacity onPress={() => router.back()} className="flex items-center">
            <Image source={require("../../../../assets/icons/bell-icon.png")} className="w-6 h-6" />
          </TouchableOpacity>
        </View>

        {/* Phần Tìm kiếm và Lọc */}
        <View className="my-4 flex-row items-center space-x-2">
          <View className="flex-1 flex-row items-center border border-primary-100 rounded-lg px-4 py-2">
            <Image source={require("../../../../assets/icons/search-icon.png")} className="w-6 h-6" style={{ tintColor: "gray" }} />
            <TextInput placeholder="Tìm kiếm quần áo..." className="ml-2 flex-1 text-primary-400 text-base" style={{ fontFamily: "GeneralRegular", paddingVertical: 0, lineHeight: 20 }} />
          </View>

          <TouchableOpacity onPress={() => setFilterVisible(true)} className="bg-primary-900 rounded-lg p-[10] flex items-center justify-center">
            <Image source={require("../../../../assets/icons/filter-icon.png")} className="w-6 h-6" style={{ tintColor: "#FFFFFF" }} />
          </TouchableOpacity>
        </View>

        {/* Danh mục */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {[{ _id: "", name: "Tất cả" }, ...categories].map((currentValue) => (
            <TouchableOpacity key={currentValue._id} onPress={() => handleFilter(currentValue._id)} className={`px-4 py-2 mr-2 rounded-lg border border-primary-100 bg ${selectedCategory === currentValue.name ? "bg-black" : "bg-primary-0"}`}>
              <Text style={{ fontFamily: "GeneralMedium" }} className={`${selectedCategory === currentValue.name ? "text-white" : "text-gray-600"}`}>
                {currentValue.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Lưới sản phẩm */}
        <View className="flex-row flex-wrap">
          {products.map((product, index) => (
            <TouchableOpacity key={index} onPress={() => router.push({ pathname: "/(product-detail)/[id]", params: { id: product._id } })} className="w-1/2">
              <View className="p-2 bg-white rounded-lg shadow-lg">
                <Image source={{ uri: product.image }} className="w-full h-44 rounded-lg" />
                <Text style={{ fontFamily: "GeneralSemibold" }} className="mt-2 text-base">{product.name}</Text>
                <Text style={{ fontFamily: "GeneralMedium" }} className="mt-1 text-gray-600 text-xs">${product.price.toLocaleString()}</Text>
                <TouchableOpacity className="absolute top-4 right-4 bg-primary-0 rounded-lg p-2 ">
                  <Image source={require("../../../../assets/icons/heart-icon.png")} className="w-4 h-4" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal Lọc */}
        <Modal visible={isFilterVisible} animationType="slide" transparent>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end", alignItems: "center" }}>
            <View style={{ width: "95%", backgroundColor: "white", borderRadius: 10, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Bộ lọc</Text>

              {/* Sắp xếp theo */}
              <Text style={{ marginTop: 20 }}>Sắp xếp theo</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
                {["Relevance", "Price: Low - High", "Price: High - Low"].map((option) => (
                  <TouchableOpacity key={option} style={{
                    padding: 10, borderRadius: 10, backgroundColor: selectedSort === option ? "black" : "#E6E6E6", margin: 5, flex: 1, alignItems: "center"
                  }} onPress={() => setSelectedSort(option)}>
                    <Text style={{ color: selectedSort === option ? "white" : "black" }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Giá */}
<Text style={{ marginTop: 20 }}>Giá</Text>
<Slider
  style={{ width: "100%", height: 40 }}
  minimumValue={1}
  maximumValue={20}
  step={1} // Đặt bước nhảy để chỉ nhận giá trị nguyên
  value={priceRange[1]}
  onValueChange={(value) => setPriceRange([1, Math.round(value)])} // Làm tròn và cập nhật giá trị
/>
<Text style={{ textAlign: "center", marginBottom: 10 }}>
  ${priceRange[0]} - ${priceRange[1]}
</Text>
              {/* Size */}
              <Text style={{ marginTop: 20 }}>Size</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}>
                {["S", "M", "L", "XL"].map((size) => (
                  <TouchableOpacity key={size} style={{
                    padding: 10, borderRadius: 10, backgroundColor: selectedSize === size ? "black" : "#E6E6E6", margin: 5, flex: 1, alignItems: "center"
                  }} onPress={() => setSelectedSize(size)}>
                    <Text style={{ color: selectedSize === size ? "white" : "black" }}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Nút Áp dụng */}
              <TouchableOpacity
                onPress={applyFilters}
                style={{
                  backgroundColor: "black",
                  paddingVertical: 15,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Áp dụng bộ lọc</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
