import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const FilterModal = ({ visible, onClose, onApply }) => {
  const [sortBy, setSortBy] = useState("Tổng hợp");
  const [priceRange, setPriceRange] = useState([100000, 10000000]);

  const handleSortChange = (option) => setSortBy(option);

  const handleApplyFilters = () => {
    onApply({ sortBy, priceRange });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="bg-white rounded-t-2xl p-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-semibold">Bộ lọc</Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../assets/icons/cancel-icon.png")}
                className="w-6 h-6"
                tintColor={"#1a1a1a"}
              />
            </TouchableOpacity>
          </View>
          <View className="border-b pt-4 border-primary-100"></View>
          <Text className="text-lg mt-4 font-semibold mb-2">Sắp xếp</Text>
          <View className="flex-row space-x-2 mb-4">
            {["Tổng hợp", "Giá: Thấp - Cao", "Giá: Cao - Thấp"].map(
              (option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleSortChange(option)}
                  className={`p-2 rounded-lg border border-primary-100 ${
                    sortBy === option ? "bg-primary-900" : "bg-primary-0"
                  }`}
                >
                  <Text
                    className={
                      sortBy === option
                        ? "text-primary-100"
                        : "text-primary-900"
                    }
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          <View className="border-b pt-4 border-primary-100"></View>
          <View className="flex-row mt-4 justify-between items-center">
            <Text className="text-lg font-semibold">Giá</Text>
            <Text className="text-gray-600 text-right">
              {priceRange[0].toLocaleString()} VNĐ -{" "}
              {priceRange[1].toLocaleString()} VNĐ
            </Text>
          </View>
          <View className="mb-4 items-center px-6">
            <MultiSlider
              values={priceRange}
              markerStyle={{
                backgroundColor: "#FFFFFF",
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "#CCCCCC",
              }}
              selectedStyle={{ height: 4, backgroundColor: "#1A1A1A" }}
              unselectedStyle={{ height: 4, backgroundColor: "#CCCCCC" }}
              sliderLength={360}
              onValuesChange={setPriceRange}
              min={100000}
              max={10000000}
              step={1000}
              allowOverlap={false}
              snapped
              containerStyle={{ marginHorizontal: 20,  }}
            />
          </View>

          <TouchableOpacity
            className=" bg-black p-4 rounded-lg items-center"
            onPress={handleApplyFilters}
          >
            <Text className="text-white font-semibold">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
