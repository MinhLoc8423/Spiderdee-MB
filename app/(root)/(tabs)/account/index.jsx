// AccountScreen.js
import Header from "@/components/Header";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

const AccountScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6">
          <Header title="Account" />
        </View>

        {/* Options List */}
        <View className="border-t px-6 border-gray-200">
          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image
              className="w-6 h-6"
              source={require("../../../../assets/icons/box-icon.png")}
            />
            <Text className="flex-1 ml-4 text-base">My Orders</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image
              className="w-6 h-6"
              source={require("../../../../assets/icons/details-icon.png")}
            />
            <Text className="flex-1 ml-4 text-base">My Details</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image
              className="w-6 h-6"
              source={require("../../../../assets/icons/address-icon.png")}
            />
            <Text className="flex-1 ml-4 text-base">Address Book</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          {/* Additional options with gray separator */}
          <View className="h-3 bg-gray-100" />

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image
              className="w-6 h-6"
              source={require("../../../../assets/icons/question-icon.png")}
            />
            <Text className="flex-1 ml-4 text-base">FAQs</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-b border-gray-200">
            <Image
              className="w-6 h-6"
              source={require("../../../../assets/icons/headphones-icon.png")}
            />
            <Text className="flex-1 ml-4 text-base">Help Center</Text>
            <MaterialIcons name="chevron-right" size={24} color="#B3B3B3" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity className="flex-row items-center px-6 py-[25] border-t border-gray-200">
            <MaterialIcons
              name="logout"
              size={24}
              color="red"
              style={{ transform: [{ scaleX: -1 }] }}
            />
            <Text className="flex-1 ml-4 text-base text-red-500">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
