import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GeneratedIdentifierFlags } from "typescript";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          width: 130,
          height: 32,
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 32,
        }}
      >
        Discover
      </Text>
      <TouchableOpacity>
      <Image
        source={require("../../constants/Image/Bell.png")}
        style={styles.image}
      />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop:1,
    paddingTop: 59,
    paddingLeft: 24,
    width: 341,
    height: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  image: {
    width: 32,
    height: 32,
    marginLeft: 200,
  },
});
