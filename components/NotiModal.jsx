// SuccessModal.js

import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const NotiModal = ({
  visible,
  onClose,
  title = "Thành công!",
  message = "Bạn đã đặt hàng thành công.",
  forUse = "warning",
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="bg-white rounded-lg p-6 w-80">
          <View className="items-center mb-4">
            {/* Warning Icon Placeholder */}
            {forUse === "warning" ? (
              <Ionicons name="warning" size={48} color="orange" />
            ) : (
              <Ionicons name="checkmark-circle" size={48} color="#0C9409" />
            )}
            <Text className="text-lg font-bold mt-2">{title}</Text>
            <Text className="text-gray-500 mt-1">
              {message}
            </Text>
          </View>
          <TouchableOpacity
            className="bg-gray-200 rounded-lg py-3 mt-2"
            onPress={onClose}
          >
            <Text className="text-center text-gray-700 font-bold">
              Quay lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotiModal;
