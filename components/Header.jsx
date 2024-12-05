// Header.js
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const Header = ({ title }) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 14,
        paddingBottom: 27,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={require("../assets/icons/arrow-icon.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight:"700" }}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => router.navigate("/(root)/(tabs)/home/notification")}
      >
        <Image
          source={require("../assets/icons/bell-icon.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
