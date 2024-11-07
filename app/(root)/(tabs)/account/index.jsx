// AccountScreen.js
import Header from "@/components/Header";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../../../store/contexts/AuthContext";
import { router } from "expo-router";

const AccountScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <Header title="Account" />
        </View>

        {/* Options List */}
        <View className="border-t border-gray-200">
          <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/account/my-order')} className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image className="w-6 h-6" source={require("../../../../assets/icons/box-icon.png")} />
            <Text className="flex-1 ml-4 text-base">My Orders</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/account/my-detail')} className="flex-row items-center px-6  py-[25] border-b border-gray-200">
            <Image className="w-6 h-6" source={require("../../../../assets/icons/details-icon.png")} />
            <Text className="flex-1 ml-4 text-base">My Details</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(root)/checkout-address/address')} className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image className="w-6 h-6" source={require("../../../../assets/icons/address-icon.png")} />
            <Text className="flex-1 ml-4 text-base">Address Book</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          {/* Additional options with gray separator */}
          <View className="h-3 px-[-24] bg-gray-100" />

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image className="w-6 h-6" source={require("../../../../assets/icons/question-icon.png")} />
            <Text className="flex-1 ml-4 text-base">FAQs</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image className="w-6 h-6" source={require("../../../../assets/icons/headphones-icon.png")} />
            <Text className="flex-1 ml-4 text-base">Help Center</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            className="flex-row items-center px-6 py-[25] border-t border-gray-200"
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="logout" size={24} color="red" style={{ transform: [{ scaleX: -1 }] }} />
            <Text className="flex-1 ml-4 text-base text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="bg-white rounded-lg p-6 w-80">
            <View className="items-center mb-4">
              {/* Warning Icon Placeholder */}
              <MaterialIcons name="error-outline" size={48} color="red" />
              <Text className="text-lg font-bold mt-2">Logout?</Text>
              <Text className="text-gray-500 mt-1">Are you sure you want to logout?</Text>
            </View>
            <TouchableOpacity
              className="bg-red-500 rounded-lg py-3 mt-4"
              onPress={handleLogout}
            >
              <Text className="text-center text-white font-bold">Yes, Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-200 rounded-lg py-3 mt-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-gray-700 font-bold">No, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AccountScreen;
