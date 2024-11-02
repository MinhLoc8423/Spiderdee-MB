import {
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { searchProducts } from "../../../api/product";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartSearch } from "../../../components/CardSearch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(["Jeans", "Casual clothes", "Hoodie", "Nike shoes black", "V-neck tshirt", "Winter clothes"]);
  const inputRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim()) {
        const data = await searchProducts(searchQuery, "", "", "");
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
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
      <Text style={styles.emptyText}>No Results Found!</Text>
      <Text style={styles.emptySubText}>
        Try a similar word or something more general.
      </Text>
    </View>
  );

  const renderRecentSearches = () => (
    <View style={styles.recentContainer}>
      <Text style={styles.recentTitle}>Top Saller</Text>
      {recentSearches.map((item, index) => (
        <View key={index} style={styles.recentItem}>
          <Text onPress={() => handleSearch(item)} style={styles.recentText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <Header title="Search" />

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
          placeholder="Search for clothes..."
          className="ml-2 text-primary-900 text-base w-full"
          ref={inputRef}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            fontFamily: "GeneralMedium",
            color: "#1A1A1A",
            lineHeight: 20,
          }}
        />
      </View>

      {searchQuery.trim() ? (
        <FlatList
          data={searchResults}
          renderItem={renderResultItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={renderEmptyResults}
          showsVerticalScrollIndicator={false}
          style={styles.resultList}
        />
      ) : (
        renderRecentSearches()
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  resultList: {
  },
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
    fontFamily: "GeneralSemibold",
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
  clearButton: {
    fontSize: 16,
    color: "#999999",
  },
});
  