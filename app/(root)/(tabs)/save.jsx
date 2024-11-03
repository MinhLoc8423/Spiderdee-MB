import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import ProductItem from "../../../components/ProductItem";
import { SaveItemContext } from "../../../store/contexts/SaveItemContext";
import { FlatList, StyleSheet } from "react-native";

const SavedItemsScreen = () => {
  const { wishList } = useContext(SaveItemContext);
  const items = wishList
    .map(item => item.product_id);

  console.log("items: ", items);

  const renderSaveItems = ({ item }) => {
    return <ProductItem item={item} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <Header title="Saved Items" />
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderSaveItems}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({});
