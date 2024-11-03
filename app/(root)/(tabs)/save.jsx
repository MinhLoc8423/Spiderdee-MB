import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, FlatList } from "react-native";
import Header from "../../../components/Header";
import ProductItem from "../../../components/ProductItem";
import { SaveItemContext } from "../../../store/contexts/SaveItemContext";

const SavedItemsScreen = () => {
  const { wishList } = useContext(SaveItemContext);
  const items = wishList.map((item) => item.product_id);

  const renderEmptyResults = () => (
    <View className="flex-1 justify-center items-center">
      <Image
        source={require("../../../assets/icons/heart-duotone-icon.png")}
        className="w-24 h-24 mb-4"
        tintColor={"#B3B3B3"}
      />
      <Text className="text-lg font-bold text-gray-800">No Saved Items!</Text>
      <Text className="text-base text-gray-600 text-center mx-8">
        You don’t have any saved items. Go to home and add some.
      </Text>
    </View>
  );

  const renderSaveItems = ({ item }) => {
    return <ProductItem item={item} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <Header title="Saved Items" />
      {items.length === 0 ? (
        renderEmptyResults()
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderSaveItems}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedItemsScreen;
