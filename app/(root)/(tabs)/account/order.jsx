import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import Header from "../../../../components/Header";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const ordersData = [
  {
    id: "1",
    name: "Regular Fit Slogan",
    size: "M",
    price: 1190,
    status: "In Transit",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Regular Fit Polo",
    size: "L",
    price: 1100,
    status: "Picked",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Regular Fit Black",
    size: "L",
    price: 1690,
    status: "In Transit",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    name: "Regular Fit V-Neck",
    size: "S",
    price: 1290,
    status: "Packing",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "5",
    name: "Regular Fit Pink",
    size: "M",
    price: 1341,
    status: "Picked",
    image: "https://via.placeholder.com/100",
  },
];

export default function MyOrdersScreen() {
  const [selectedTab, setSelectedTab] = useState("Ongoing");

  const renderOrderItem = ({ item }) => (
    <StyledView className="flex-row items-center p-4 mb-2 bg-white rounded-lg shadow-md">
      <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg" />
      <StyledView className="flex-1 ml-4">
        <StyledText className="text-lg font-semibold text-gray-800">
          {item.name}
        </StyledText>
        <StyledText className="text-sm text-gray-500">
          Size {item.size}
        </StyledText>
        <StyledText className="text-lg font-semibold text-gray-900">
          ${item.price}
        </StyledText>
      </StyledView>
      <StyledText className="text-xs text-gray-600 bg-gray-200 py-1 px-2 rounded-lg">
        {item.status}
      </StyledText>
      <StyledTouchableOpacity className="bg-black py-2 px-4 rounded-lg ml-4">
        <StyledText className="text-white">Track Order</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );

  const renderEmptyState = () => (
    <StyledView className="flex-1 items-center justify-center mt-10">
      <Image className="w-16 h-16" source={require("../../../../assets/icons/box-icon.png")} />
      <StyledText className="text-lg font-semibold text-gray-700 mt-4">
        No Ongoing Orders!
      </StyledText>
      <StyledText className="text-sm text-gray-500 mt-2">
        You don’t have any ongoing orders at this time.
      </StyledText>
    </StyledView>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">

      <Header title={"Order History"} />

      {/* Tabs */}
      <StyledView className="flex-row justify-center mt-4">
        <StyledTouchableOpacity
          onPress={() => setSelectedTab("Ongoing")}
          className={`px-4 py-2 rounded-full ${
            selectedTab === "Ongoing" ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          <StyledText
            className={`${
              selectedTab === "Ongoing" ? "text-black" : "text-gray-400"
            }`}
          >
            Ongoing
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          onPress={() => setSelectedTab("Completed")}
          className={`px-4 py-2 rounded-full ml-2 ${
            selectedTab === "Completed" ? "bg-gray-300" : "bg-gray-100"
          }`}
        >
          <StyledText
            className={`${
              selectedTab === "Completed" ? "text-black" : "text-gray-400"
            }`}
          >
            Completed
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Orders List */}
      {selectedTab === "Ongoing" ? (
        <FlatList
          data={ordersData}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        <StyledView className="flex-1 items-center justify-center mt-10">
          <Image className="w-16 h-16" source={require("../../../../assets/icons/box-icon.png")} />
          <StyledText className="text-lg font-semibold text-gray-700 mt-4">
            No Completed Orders!
          </StyledText>
          <StyledText className="text-sm text-gray-500 mt-2">
            You don’t have any completed orders at this time.
          </StyledText>
        </StyledView>
      )}
    </SafeAreaView>
  );
}
