import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <ScrollView>
        {/* Header */}
        <View className="flex-row justify-between items-center w-full mt-5">
          <Text style={{ fontFamily: "GeneralSemibold" }} className="text-3xl">
            Discover
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex items-center"
          >
            <Image
              source={require("../../../../assets/icons/bell-icon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        {/* Search and Filter Section */}
        <View className="mt-4 flex-row items-center space-x-2">
          {/* Search Bar */}
          <View className="flex-1 flex-row items-center border border-primary-100 rounded-xl px-4 py-2">
            <Image
              source={require("../../../../assets/icons/search-icon.png")}
              className="w-6 h-6"
              style={{ tintColor: "gray" }}
            />
            <TextInput
              placeholder="Search for clothes..."
              className="ml-2 flex-1 text-primary-400 text-base"
              style={{
                fontFamily: "GeneralRegular",
                paddingVertical: 0,
                lineHeight: 20,
              }}
            />
          </View>

          {/* Filter Button */}
          <TouchableOpacity className="bg-primary-900 rounded-xl p-[10] flex items-center justify-center">
            <Image
              source={require("../../../../assets/icons/filter-icon.png")}
              className="w-6 h-6"
              style={{ tintColor: "#FFFFFF" }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
