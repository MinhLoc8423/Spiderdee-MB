import { StyleSheet, Text, View, Pressable, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../../api/product';
import { router } from 'expo-router';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['Modern', 'Casual clothes', 'Hoodie', 'Nike shoes black', 'V-neck t-shirt', 'Winter clothes']);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  const clearRecentSearches = () => setRecentSearches([]);

  const fetchSearchResults = async (query) => {
    try {
      const data = await searchProducts(query, "", "", "");
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const renderRecentSearchItem = (item) => (
    <View style={styles.recentSearchItem}>
      <Text onPress={() =>setSearchQuery(item)} style={styles.recentSearchText}>{item}</Text>
      <TouchableOpacity onPress={() => setRecentSearches(recentSearches.filter(i => i !== item))}>
        <AntDesign name={"closecircleo"} size={17} color={'#C0C0C0'} />
      </TouchableOpacity>
    </View>
  );

  const renderResultItem = ({ item }) => (
    <Pressable
      style={styles.resultCard}
      onPress={() => router.push({
        pathname: "/(product-detail)/[id]",
        params: { id: item._id },
      })}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultPrice}>${item.price}</Text>

      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Search</Text>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for clothes..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {searchResults.length === 0 && searchQuery ? (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No Results Found!</Text>
          <Text style={styles.suggestionText}>Try a similar word or something more general.</Text>
        </View>
      ) : (
        <>
          <View style={styles.recentSearches}>
            <Text style={styles.recentSearchHeader}>Recent Searches</Text>
            <Pressable onPress={clearRecentSearches}>
              <Text style={styles.clearAll}>Clear all</Text>
            </Pressable>
          </View>
          <FlatList
            data={recentSearches}
            renderItem={({ item }) => renderRecentSearchItem(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.recentSearchList}
          />

          <FlatList
            data={searchResults}
            renderItem={renderResultItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={styles.resultList}
          />
        </>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },


  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
  },
  recentSearches: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentSearchHeader: {
    fontSize: 17,
    fontWeight: '600',
  },
  clearAll: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  recentSearchList: {
    marginBottom: 16,
    marginTop: 30
  },
  recentSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderEndColor: 1,
  },

  liner: {
    borderColor: '#E6E6E6',
    marginVertical: 20,
  },
  recentSearchText: {
    fontSize: 14,

  },
  recentSearchRemove: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
  resultList: {
    marginTop: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  resultInfo: {
    marginLeft: 12,

  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultPrice: {
    fontSize: 11,
    color: '#808080',
    marginTop: 4,
    fontWeight: '500'
  },
  resultName: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
    fontWeight: '700'
  },
  noResults: {
    alignItems: 'center',
    marginTop: 40,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
  },
});
