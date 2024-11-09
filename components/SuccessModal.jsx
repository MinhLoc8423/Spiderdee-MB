// SuccessModal.js

import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuccessModal = ({
  visible,
  onClose,
  forUse = "checkmark-circle",
  title = "Thành công!",
  message = "Bạn đã đặt hàng thành công.",
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
        {forUse === "warning" ? (
              <Ionicons name="warning" size={48} color="orange" />
            ) : (
              <Ionicons name="checkmark-circle" size={48} color="#0C9409" />
            )}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  modalButtonText: {
    textAlign:'center',
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    
  },
};

export default SuccessModal;
