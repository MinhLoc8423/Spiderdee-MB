import {
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { searchProducts } from "../../../api/productAPIs";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartSearch } from "../../../components/CardSearch";
import { MotiView } from "moti"; // Import Moti

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    "Sofa",
    "Gường",
    "Thảm",
    "Tủ",
    "Bàn ghế",
    "Gương",
  ]);
  const [loading, setLoading] = useState(false); // Add loading state
  const inputRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim()) {
        setLoading(true); // Start loading
        const data = await searchProducts(searchQuery, "", "", "");
        setSearchResults(data.data);
        setLoading(false); // Stop loading after data is fetched
      } else {
        setSearchResults([]);
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchQuery]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const renderResultItem = ({ item }) => <CartSearch item={item} />;

  const renderEmptyResults = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../../../assets/icons/search-duotone-icon.png")}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>Không tìm thấy kết quả nào!</Text>
      <Text style={styles.emptySubText}>
        Hãy thử một từ tương tự hoặc một từ tổng quát hơn.
      </Text>
    </View>
  );

  // Render skeleton for search results
  const renderSearchSkeleton = () => (
    <FlatList
      data={Array(6).fill({})} // Dummy array for skeleton items
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => (
        <MotiView
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            loop: true,
            repeatReverse: true,
          }}
          style={styles.skeletontContainer}
        >
          {/* Skeleton cho hình ảnh sản phẩm */}
          <View style={styles.skeletonImage} />

          {/* Skeleton cho chi tiết sản phẩm */}
          <View style={styles.productDetails}>
            <View style={styles.skeletonTextShort} />
            <View style={styles.skeletonText} />
          </View>

          {/* Skeleton cho icon điều hướng */}
          <View style={styles.arrowContainer}>
            <View style={styles.skeletonArrow} />
          </View>

          {/* Line ở dưới cùng */}
          <View style={styles.bottomLine} />
        </MotiView>
      )}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderRecentSearches = () => (
    <View style={styles.recentContainer}>
      <Text style={styles.recentTitle}>Sản phẩm tìm kiếm nhiều nhất</Text>
      {recentSearches.map((item, index) => (
        <View key={index} style={styles.recentItem}>
          <Text onPress={() => handleSearch(item)} style={styles.recentText}>
            {item}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <Header title="Tìm kiếm" />

      <View
        className="max-h-14 flex-row items-center border border-primary-100 rounded-lg px-4"
        style={{ height: 56 }}
      >
        <Image
          source={require("../../../assets/icons/search-icon.png")}
          className="w-6 h-6"
          style={{ tintColor: "#999999" }}
        />
        <TextInput
          placeholder="Tìm kiếm nội thất..."
          className="ml-2 text-primary-900 text-base w-full"
          ref={inputRef}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            fontWeight:"300",
            color: "B3B3B3",
            lineHeight: 20,
          }}
        />
      </View>

      {searchQuery.trim() ? (
        loading ? (
          // Show skeleton if loading
          renderSearchSkeleton()
        ) : (
          // Show search results if data is loaded
          <FlatList
            data={searchResults}
            renderItem={renderResultItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={renderEmptyResults}
            showsVerticalScrollIndicator={false}
            style={styles.resultList}
          />
        )
      ) : (
        renderRecentSearches()
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  resultList: {},
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 116,
  },
  emptyImage: {
    width: 80,
    height: 80,
    tintColor: "#999999",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "GeneralSemibold",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  emptySubText: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    fontFamily: "GeneralRegular",
    paddingHorizontal: 32,
  },
  recentContainer: {
    marginTop: 17,
    marginBottom: 17,
  },
  recentTitle: {
    fontSize: 20,
    fontWeight:"700",
    marginBottom: 12,
    color: "#1A1A1A",
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  recentText: {
    fontSize: 16,
    fontFamily: "GeneralRegular",
    color: "#1A1A1A",
  },
  skeletontContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  skeletonImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  skeletonTextShort: {
    width: "60%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonText: {
    width: "40%",
    height: 16,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginTop: 8,
  },
  arrowContainer: {},
  skeletonArrow: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
    transform: [{ rotate: "135deg" }],
  },
  bottomLine: {
    position: "absolute",
    paddingStart: 16,
    paddingEnd: 16,
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
});
