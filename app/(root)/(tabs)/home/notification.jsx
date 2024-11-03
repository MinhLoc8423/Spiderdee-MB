import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../../components/Header";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-0 px-6">
      <Header title="Thông báo" />

      <View className="flex-1 items-center justify-center bg-white px-4 ">
        <Image
          source={require("../../../../assets/icons/bell-duotone-icon.png")}
          className="w-16 h-16 mb-6"
          tintColor={"#B3B3B3"}
        />
        <Text
          style={{ fontFamily: "GeneralSemibold" }}
          className="text-xl text-center text-black pb-3"
        >
          Bạn vẫn chưa nhận được thông báo nào!
        </Text>
        <Text 
        style={{ fontFamily: "GeneralRegular" }}
        className="text-lg text-center text-primary-500">
          Chúng tôi sẽ thông báo cho bạn khi có điều gì thú vị xảy ra.
        </Text>
      </View>
    </SafeAreaView>
  );
}
