// import React, { useContext, useState, useEffect } from "react"; // Thêm useEffect
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Header from "../../../components/Header";
// import { AddressContext } from "../../../store/contexts/AddressContext";

// const AddressScreen = () => {
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const { addresses, updateAddress } = useContext(AddressContext);

//   // Sử dụng useEffect để thiết lập địa chỉ mặc định
//   useEffect(() => {
//     const addressDefault = addresses.find((address) => address.isDefault === true);
//     if (addressDefault) {
//       setSelectedAddress(addressDefault._id);
//     }
//   }, [addresses]); // Chạy khi addresses thay đổi

//   const handleAdressDefault = () => {
//     const addressDefaultNew = addresses.find((address) => address._id === selectedAddress);
//     let name = addressDefaultNew.name;
//     let address = addressDefaultNew.address;
//     let isDefault = true;
//     updateAddress(addressDefaultNew._id, name, address, isDefault);
//   };

//   const handleSelectAddress = (label) => {
//     setSelectedAddress(label);
//   };

//   const renderAddressItem = ({ item }) => {
//     const isSelected = item._id === selectedAddress;
//     return (
//       <TouchableOpacity
//         style={styles.addressContainer}
//         onPress={() => handleSelectAddress(item._id)}
//       >
//         <View style={styles.addressInfo}>
//           <Ionicons name="location-outline" size={20} color="black" />
//           <View style={styles.addressDetails}>
//             <Text style={styles.addressLabel}>
//               {item.name}{" "}
//               {item.isDefault && (
//                 <Text style={styles.defaultText}>Mặc định</Text>
//               )}
//             </Text>
//             <Text style={styles.addressText}  numberOfLines={1} ellipsizeMode="tail" >{item.address}</Text>
//           </View>
//         </View>
//         <Ionicons
//           name={isSelected ? "radio-button-on" : "radio-button-off"}
//           size={20}
//           color={isSelected ? "black" : "#ccc"}
//         />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Địa chỉ" />

//       <Text style={styles.sectionTitle}>Địa chỉ đã lưu</Text>

//       <FlatList
//         data={addresses}
//         renderItem={renderAddressItem}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={(item) => item._id}
//       />

//       <TouchableOpacity
//         style={styles.addNewButton}
//         onPress={() => router.push("(root)/checkout-address/new-address")}
//       >
//         <Ionicons name="add-outline" size={20} color="black" />
//         <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={handleAdressDefault} style={styles.applyButton}>
//         <Text style={styles.applyText}>Áp dụng</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingStart: 24,
//     paddingEnd: 24,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   addressContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 10,
//   },
//   addressInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   addressDetails: {
//     marginLeft: 10,
//   },
//   addressLabel: {
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   defaultText: {
//     color: "#888",
//     fontSize: 12,
//     marginLeft: 5,
//   },
//   addressText: {
//     color: "#666",
//     fontSize: 12,
//     marginTop: 2,
//   },
//   addNewButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 15,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   addNewText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginLeft: 5,
//   },
//   applyButton: {
//     backgroundColor: "#000",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   applyText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { AddressContext } from "../../../store/contexts/AddressContext";
import NotiModal from "../../../components/NotiModal.jsx";

const AddressScreen = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [longPressedAddress, setLongPressedAddress] = useState(null);
  const { addresses, updateAddress, deleteAddress } = useContext(AddressContext);
  const [addressDefault, setAddressDefault] = useState(null);

  //Modal dialog
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [button, setButton] = useState("");

  const hanldTurnOnModal = (show, title, message, forUsr, button) => {
    setShowNotiModal(show);
    setTitle(title);
    setMessage(message);
    setForUsr(forUsr);
    setButton(button);
  };

  useEffect(() => {
    const addressDefault = addresses.find(
      (address) => address.isDefault === true
    );
    if (addressDefault) {
      setAddressDefault(addressDefault._id);
      setSelectedAddress(addressDefault._id);
    }
  }, [addresses]);

  const handleAdressDefault = () => {
    const addressDefaultNew = addresses.find(
      (address) => address._id === selectedAddress
    );
    let name = addressDefaultNew.name;
    let address = addressDefaultNew.address;
    let isDefault = true;
    updateAddress(addressDefaultNew._id, name, address, isDefault);
  };

  const handleSelectAddress = (label) => {
    setSelectedAddress(label);
  };

  const handleLongPress = (address) => {
    setLongPressedAddress(address);
    setModalVisible(true);
  };

  const handleEditAddress = () => {
    setModalVisible(false);
    console.log(longPressedAddress);
    router.push({
      pathname: `(root)/checkout-address/edit-address`,
      params: {
        address: JSON.stringify(longPressedAddress),
      }
    });
  };

  const handleDeleteAddress = () => {
    setModalVisible(false);
    if (addressDefault === longPressedAddress._id) {
      hanldTurnOnModal(
        true,
        "Xóa địa chỉ",
        "Không thể xóa chỉ mặc định",
        "warning",
        "Đóng"
      )
      return;
    }
    deleteAddress(longPressedAddress._id);
  };

  const renderAddressItem = ({ item }) => {
    const isSelected = item._id === selectedAddress;
    return (
      <Pressable
        style={styles.addressContainer}
        onPress={() => handleSelectAddress(item._id)}
        onLongPress={() => handleLongPress(item)}
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
            <Text
              style={styles.addressText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.address}
            </Text>
          </View>
        </View>
        <Ionicons
          name={isSelected ? "radio-button-on" : "radio-button-off"}
          size={20}
          color={isSelected ? "black" : "#ccc"}
        />
      </Pressable>
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
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addNewButton}
        onPress={() => router.push("(root)/checkout-address/new-address")}
      >
        <Ionicons name="add-outline" size={20} color="black" />
        <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAdressDefault}
        style={styles.applyButton}
      >
        <Text style={styles.applyText}>Áp dụng</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Phát hiện nhấn ra ngoài */}
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false); // Đóng modal
          }}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalMessage}>Mở rộng tiện ích</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#CCCCCC",
                    width: "100%",
                  }}
                ></View>
                <TouchableOpacity
                  style={styles.modalButtonEdit}
                  onPress={handleEditAddress}
                >
                  <MaterialIcons name="edit" size={25} color="black" />
                  <Text style={styles.modalButtonText}>Chỉnh sửa địa chỉ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonDanger}
                  onPress={handleDeleteAddress}
                >
                  <MaterialIcons name="delete" size={25} color="black" />
                  <Text style={styles.modalButtonText}>Xóa địa chỉ</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        button={button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
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
    borderColor: "#B3B3B3",
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
    borderColor: "#B3B3B3",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtonEdit: {
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonDanger: {
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 16,
  },
  modalButtonCancel: {
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonCancelText: {
    color: "#374151",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddressScreen;
