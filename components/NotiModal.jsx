import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PropTypes from "prop-types";

const NotiModal = ({
  visible,
  onClose,
  title = "Thành công!",
  message = "Bạn đã đặt hàng thành công.",
  forUse = "warning",
  redirect = false,
  redirectTo = "",
  params = {},
}) => {
  const handlePress = () => {
    if (redirect) {
      router.push({ pathname: redirectTo, params });
    }
    onClose();
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
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
