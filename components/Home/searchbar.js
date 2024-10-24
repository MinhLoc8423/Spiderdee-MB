import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.main}>
        <Image source={require("../../constants/Image/Search.png")} />
        <TextInput placeholder="Search for furniture..."></TextInput>
      </View>
      <View>
        <TouchableOpacity style={styles.Button}>
          <Image
            source={require("../../constants/Image/Vector.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
    marginLeft: 24,
    gap: 4,
    backgroundColor: "#E6E6E6",
    width: 290,
    height: 60,
    borderRadius: 10,
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: "row",
  },
  Button: {
    marginTop: 50,
    marginLeft: 12,
    height: 60,
    width: 60,
    borderRadius: 10,
    paddingTop: 14.5,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 10,
    backgroundColor: "#1A1A1A",
  },
});
