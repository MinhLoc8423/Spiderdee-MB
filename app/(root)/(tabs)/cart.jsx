import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // cho biểu tượng thùng rác
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyCartScreen = () => {
  const [cartItems, setCartItems] = useState([]); // Khởi tạo danh sách giỏ hàng
  const shippingFee = 0; // Phí vận chuyển
  const vatPercentage = 0; // Tỷ lệ VAT

  const loadCartItems = async () => {
    try {
      const cartKey = "@Cart"; // Khóa để lưu giỏ hàng
      const existingCart = await AsyncStorage.getItem(cartKey);
      console.log("Giỏ hàng hiện tại: ", existingCart);
      if (existingCart) {
        setCartItems(JSON.parse(existingCart)); // Lưu giỏ hàng vào trạng thái
      }
    } catch (error) {
      console.error("Không thể tải danh sách giỏ hàng: ", error);
    }
  };

  useEffect(() => {
    loadCartItems(); // Gọi hàm để tải giỏ hàng khi component được gắn
  });

  const updateCartInStorage = async (newCart) => {
    try {
      const cartKey = "@Cart"; // Khóa để lưu giỏ hàng
      await AsyncStorage.setItem(cartKey, JSON.stringify(newCart)); // Cập nhật giỏ hàng trong AsyncStorage
    } catch (error) {
      console.error("Không thể cập nhật giỏ hàng trong bộ nhớ: ", error);
    }
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCartInStorage(newItems); // Cập nhật AsyncStorage
      console.log("Cart updated: ", newItems);
      return newItems;
    });
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateCartInStorage(newItems); // Cập nhật AsyncStorage
      return newItems;
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      updateCartInStorage(newItems); // Cập nhật AsyncStorage
      return newItems;
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); // Tính tổng phụ
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = (subtotal * vatPercentage) / 100; // Tính VAT
    return subtotal + vat + shippingFee; // Tính tổng
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Kích thước {item.size}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            /* Chức năng quay lại */
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ Hàng Của Tôi</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Đảm bảo ID này là duy nhất cho mỗi mục
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tổng phụ</Text>
          <Text style={styles.summaryText}>${calculateSubtotal()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>VAT (%)</Text>
          <Text style={styles.summaryText}>$0.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Phí vận chuyển</Text>
          <Text style={styles.summaryText}>$0.00</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Tổng cộng</Text>
          <Text style={styles.totalText}>${calculateTotal()}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          /* Chức năng chuyển đến thanh toán */
        }}
      >
        <Text style={styles.checkoutText}>Đi đến Thanh Toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
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
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
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
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  summaryText: {
    fontSize: 16,
    color: "#666",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#000",
    padding: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MyCartScreen;
