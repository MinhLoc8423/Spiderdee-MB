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
import FilterModal from "../../../../components/FilterModal";
import { MotiView } from "moti"; // Import Moti

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { user } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    priceRange: [],
  });

  // Open and close modal functions
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Fetch data from APIs
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      setCategories(categoriesData.data);
      setProducts(productsData.data);
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false); // Stop loading on error
    }
  }, []);

  // Handle product filtering based on category and other filters
  const handleFilter = useCallback(
    async (categoryId, minPrice, maxPrice, sortBy) => {
      try {
        setLoading(true); // Start loading before filtering
        console.log(
          "Filtering products...",
          categoryId,
          minPrice,
          maxPrice,
          sortBy
        );

        // Nếu chưa áp dụng bộ lọc, chỉ lọc theo danh mục
        if (!isFilterApplied) {
          const productsData = await searchProducts("", categoryId, "", "", ""); // Chỉ lọc theo category
          setProducts(productsData.data);
        } else {
          // Nếu đã áp dụng bộ lọc, lọc theo tất cả các tiêu chí
          const productsData = await searchProducts(
            "",
            categoryId,
            minPrice,
            maxPrice,
            sortBy
          );
          setProducts(productsData.data);
        }
        setLoading(false); // Stop loading after filtering
      } catch (error) {
        console.error("Error filtering products: ", error);
        setLoading(false); // Stop loading on error
      }
    },
    [isFilterApplied]
  );

  useEffect(() => {
    fetchData();
  }, []);

  // Render category item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        handleFilter(
          item._id,
          filters.priceRange[0],
          filters.priceRange[1],
          filters.sortBy
        );
        setSelectedCategory(item.name);
        setSelectedCategoryId(item._id);
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

  // Render skeleton for product loading state
  const renderProductSkeleton = () => (
    <FlatList
      data={Array(6).fill({})} // Dummy array for skeleton items
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={() => (
        <MotiView
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            loop: true,
            repeatReverse: true,
          }}
          className="w-1/2 p-3 bg-white rounded-[8] mb-4"
        >
          <View className="w-full h-44 bg-gray-300 rounded-lg" />
          <View className="mt-2 h-5 bg-gray-300 rounded-md w-full" />
          <View className="mt-1 h-4 bg-gray-300 rounded-md w-1/2" />
          <View className="absolute top-5 right-5 bg-gray-300 rounded-lg p-2 w-6 h-6" />
        </MotiView>
      )}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );

  // Render product item
  const renderProductItem = ({ item }) => {
    return <ProductItem item={item} />;
  };

  // Apply filters when modal is closed
  const applyFilters = (filterData) => {
    let sort;
    if (filterData.sortBy === "Giá: Cao - Thấp") {
      sort = "desc";
    } else if (filterData.sortBy === "Giá: Thấp - Cao") {
      sort = "asc";
    }
    setFilters(filterData);
    setIsFilterApplied(true);
    handleFilter(
      selectedCategoryId,
      filterData.priceRange[0],
      filterData.priceRange[1],
      sort
    );
    closeModal();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <View className="flex-row justify-between items-center w-full mt-3">
        <Text className="text-3xl font-semibold">Khám phá</Text>
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
            editable={false}
            placeholder="Tìm kiếm nội thất..."
            className="ml-2 flex-1 text-primary-900 text-base"
            style={{
              fontFamily: "GeneralRegular",
              paddingVertical: 0,
              lineHeight: 20,
            }}
          />
        </Pressable>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-primary-900 rounded-lg p-[10] flex items-center justify-center"
        >
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

      {loading ? (
        // Show skeleton if loading
        renderProductSkeleton()
      ) : (
        // Show product list if data is loaded
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderProductItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {/* Filter Modal Component */}
      <FilterModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onApply={applyFilters}
      />
    </SafeAreaView>
  );
};

export default HomePage;
