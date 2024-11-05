import React, { useContext, useState, useEffect } from "react"; // Thêm useEffect
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { AddressContext } from "../../../store/contexts/AddressContext";

const AddressScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const { addresses, updateAddress } = useContext(AddressContext);

  // Sử dụng useEffect để thiết lập địa chỉ mặc định
  useEffect(() => {
    const addressDefault = addresses.find((address) => address.isDefault === true);
    if (addressDefault) {
      setSelectedAddress(addressDefault._id);
    }
  }, [addresses]); // Chạy khi addresses thay đổi

  const handleAdressDefault = () => {
    const addressDefaultNew = addresses.find((address) => address._id === selectedAddress);
    let name = addressDefaultNew.name;
    let address = addressDefaultNew.address;
    let isDefault = true;
    updateAddress(addressDefaultNew._id, name, address, isDefault);
  };

  const handleSelectAddress = (label) => {
    setSelectedAddress(label);
  };

  const renderAddressItem = ({ item }) => {
    const isSelected = item._id === selectedAddress;
    return (
      <TouchableOpacity
        style={styles.addressContainer}
        onPress={() => handleSelectAddress(item._id)}
      >
        <View style={styles.addressInfo}>
          <Ionicons name="location-outline" size={20} color="black" />
          <View style={styles.addressDetails}>
            <Text style={styles.addressLabel}>
              {item.name}{" "}
              {item.isDefault && (
                <Text style={styles.defaultText}>Mặc định</Text>
              )}
            </Text>
            <Text style={styles.addressText}>{item.address}</Text>
          </View>
        </View>
        <Ionicons
          name={isSelected ? "radio-button-on" : "radio-button-off"}
          size={20}
          color={isSelected ? "black" : "#ccc"}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Địa chỉ" />

      <Text style={styles.sectionTitle}>Địa chỉ đã lưu</Text>

      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item._id}
      />

      <TouchableOpacity
        style={styles.addNewButton}
        onPress={() => router.push("(root)/checkout-address/new-address")}
      >
        <Ionicons name="add-outline" size={20} color="black" />
        <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAdressDefault} style={styles.applyButton}>
        <Text style={styles.applyText}>Áp dụng</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressDetails: {
    marginLeft: 10,
  },
  addressLabel: {
    fontWeight: "bold",
    fontSize: 14,
  },
  defaultText: {
    color: "#888",
    fontSize: 12,
    marginLeft: 5,
  },
  addressText: {
    color: "#666",
    fontSize: 12,
    marginTop: 2,
  },
  addNewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
  },
  addNewText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  applyButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddressScreen;
