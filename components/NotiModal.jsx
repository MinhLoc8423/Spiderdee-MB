import React from "react";
<<<<<<< HEAD
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
=======
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PropTypes from "prop-types";
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509

const NotiModal = ({
  visible,
  onClose,
  title = "Thành công!",
  message = "Bạn đã đặt hàng thành công.",
  forUse = "warning",
  redirect = false,
<<<<<<< HEAD
  button="đóng",
  redirectTo="",
  
}) => {

  const handleClose = () => {
    onClose();
    router.push(routerRedirect);
=======
  redirectTo = "",
  params = {},
}) => {
  const handlePress = () => {
    if (redirect) {
      router.push({ pathname: redirectTo, params });
    }
    onClose();
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            {forUse === "warning" ? (
              <Ionicons name="warning" size={48} color="orange" />
            ) : (
              <Ionicons name="checkmark-circle" size={48} color="#0C9409" />
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
<<<<<<< HEAD
          <TouchableOpacity
            className="bg-gray-200 rounded-lg py-3 mt-2"
            onPress={() => {redirect == true ? router.push(redirectTo) : onClose()}}
          >
            <Text className="text-center text-gray-700 font-bold">
              {button}
            </Text>
=======
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Quay lại</Text>
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

<<<<<<< HEAD
export default NotiModal;
=======
// Định nghĩa kiểu dữ liệu cho props
NotiModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  forUse: PropTypes.oneOf(["warning", "success"]),
  redirect: PropTypes.bool,
  redirectTo: PropTypes.string,
  params: PropTypes.object,
};

// StyleSheet để tách biệt các kiểu
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    width: 320,
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  message: {
    color: "gray",
    marginTop: 4,
  },
  button: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 8,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
  },
});

export default NotiModal;
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509
