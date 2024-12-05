import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SaveItemContext } from "../store/contexts/SaveItemContext";

const ProductItem = ({ item }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { wishList, addToWishlist, removeFromWishlist } =
    useContext(SaveItemContext);

  // Kiểm tra xem sản phẩm đã có trong wishlist chưa
  const isInWishlist = wishList.some(
    (wishItem) => wishItem?.product_id?._id === item._id
  );

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(root)/product-details/[id]",
          params: { id: item._id },
        })
      }
      className="w-1/2"
    >
      <View className="p-3 bg-white rounded-[8]">
        <Image
          source={{ uri: item.image }}
          className="w-full h-44 rounded-lg"
        />
        <Text 
        className="mt-2 text-base font-semibold"
        numberOfLines={1}
        ellipsizeMode="tail" 
        >{item.name}</Text>
        <Text className="mt-1 text-gray-600 text-xs">
          {item.price.toLocaleString()} VNĐ
        </Text>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            if (isInWishlist) {
              setIsLoading(true);
              const wishlistItemId = wishList.find(
                (wishItem) => wishItem?.product_id?._id === item._id
              )?._id;
              if (wishlistItemId) {
                console.log("Removing from wishlist:", wishlistItemId);
                removeFromWishlist(wishlistItemId);
                setIsLoading(false);
              } else {
                console.log("Wishlist item not found for removal.");
              }
            } else {
              // Gọi addToWishlist với item._id
              console.log("Adding to wishlist:", item._id);
              addToWishlist(item._id);
              setIsLoading(false);
            }
          }}
          className="absolute top-5 right-5 bg-primary-0 rounded-lg p-2"
        >
          <Image
            source={
              isInWishlist
                ? require("../assets/icons/heart-filled-icon.png")
                : require("../assets/icons/heart-icon.png")
            }
            className="w-4 h-4"
            style={{ tintColor: isInWishlist ? "#ED1010" : "#1A1A1A" }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
