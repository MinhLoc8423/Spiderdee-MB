import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View style={styles.itemContainer}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.itemSize}>Kích thước: {item.size}</Text>
        </View>
        <Text style={styles.itemPrice}>
          {Number(item.price).toLocaleString()} VNĐ
        </Text>
      </View>

      {/* Actions (Quantity and Delete) */}
      <View style={styles.actionsContainer}>
        {/* Delete Button */}
        <TouchableOpacity onPress={() => onRemove(item._id)}>
          <Ionicons name="trash-outline" size={24} color="#ED1010" />
        </TouchableOpacity>

        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            className="border border-primary-200 rounded-md"
            onPress={() => onDecrease(item._id)}
          >
            <Ionicons name="remove-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            className="border border-primary-200 rounded-md"
            onPress={() => onIncrease(item._id)}
          >
            <Ionicons name="add-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    maxHeight: 120,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: "hidden",
    minHeight: 100,
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  itemSize: {
    fontSize: 16,
    color: "#888",
  },
  itemPrice: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  actionsContainer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 8,
  },
  quantityText: {
    color: "#1A1A1A",
    fontSize: 12,
    marginHorizontal: 8,
    marginBottom: 5,
  },
});

export default CartItem;
