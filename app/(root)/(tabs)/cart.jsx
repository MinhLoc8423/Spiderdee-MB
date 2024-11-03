import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../../../store/contexts/CartContext";
import Header from "@/components/Header";
import CartItem from "@/components/CartItem";

const MyCartScreen = () => {
  const { cartList, updateQuantity, removeFromCart } = useContext(CartContext);
  console.log("Cart List:", cartList);
  const shippingFee = 200000;
  const vatPercentage = 10;

  const handleIncreaseQuantity = (id) => {
    const item = cartList.find((item) => item._id === id);
    updateQuantity(id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (id) => {
    const item = cartList.find((item) => item._id === id);
    if (item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const calculateSubtotal = () => {
    return cartList.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/,/g, ""));
      const quantity = parseInt(item.quantity, 10);
      return sum + price * quantity;
    }, 0);
  };

  const calculateVAT = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * vatPercentage) / 100; // Tính VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = (subtotal * vatPercentage) / 100;
    return subtotal + vat + shippingFee;
  };

  const renderItem = ({ item }) => (
    <CartItem
      item={item}
      onDecrease={handleDecreaseQuantity}
      onIncrease={handleIncreaseQuantity}
      onRemove={handleRemoveItem}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Cart"} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={cartList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tổng tiền hàng</Text>
          <Text style={styles.summaryText}>
            {calculateSubtotal().toLocaleString() + " VNĐ"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>VAT {vatPercentage}%</Text>
          <Text style={styles.summaryText}>
            {calculateVAT().toLocaleString() + " VNĐ"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Phí vận chuyển</Text>
          <Text style={styles.summaryText}>
            {shippingFee.toLocaleString()} VNĐ
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Tổng thanh toán</Text>
          <Text style={styles.totalText}>
            {calculateTotal().toLocaleString() + " VNĐ"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          /* Navigate to the checkout screen */
        }}
      >
        <Text style={styles.checkoutText}>Đi đến thanh toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 24,
    paddingEnd: 24,
    backgroundColor: "#fff",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    padding: 7,
    marginTop: 7,
    marginBottom: 14,
    borderColor: "#E6E6E6",
    alignItems: "center",
  },
  imageContainer: {
    width: 83,
    height: 79,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemSize: {
    fontSize: 14,
    color: "#666",
  },
  itemPrice: {
    marginTop: 18,
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#000",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  summaryContainer: {
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  summaryText: {
    fontSize: 16,
    color: "#666",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "space-between",
    marginVertical: 16,
    marginBottom: 50,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default MyCartScreen;
