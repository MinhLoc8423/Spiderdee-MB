import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export const CartSearch = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(root)/product-details/[id]",
          params: { id: item._id },
        })
      }
      style={styles.container}
    >
      {/* Hình ảnh sản phẩm */}
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* Chi tiết sản phẩm */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>

      {/* Icon điều hướng */}
      <View style={styles.arrowContainer}>
        <Image
          source={require("../assets/icons/arrow-icon.png")}
          style={styles.arrow}
        />
      </View>

      {/* Colored Line at Bottom */}
      <View style={styles.bottomLine} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1, 
    borderBottomColor: "#E6E6E6", 
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontFamily: "GeneralSemibold",
    fontSize: 16,
    color: "#1A1A1A",
  },
  productPrice: {
    fontFamily: "GeneralMedium",
    fontSize: 14,
    color: "#808080",
  },
  arrowContainer: {},
  arrow: {
    width: 24,
    height: 24,
    transform: 'rotate(135deg)',
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