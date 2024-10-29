import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const FAQS = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const buttons = ["General", "Account", "Service", "Payment"];

  const handlePress = (index) => {
    setSelectedButtonIndex(index);
  };
  return (
    <SafeAreaView>
      {/* Header */}
      <View
        style={{
          marginEnd: 20,
          marginStart: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 38,
          paddingBottom: 23,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../../../../assets/icons/arrow-icon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: 59,
            height: 22,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 22,
            fontFamily: "GeneralSemibold",
          }}
        >
          FAQs
        </Text>
        <TouchableOpacity>
          <Image
            source={require("../../../../assets/icons/bell-icon.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <ScrollView horizontal={true} style={styles.scrollViewContainer}>
        <View style={styles.container}>
          {buttons.map((buttonLabel, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                selectedButtonIndex === index
                  ? styles.buttonPressed
                  : styles.buttonNormal,
              ]}
              onPress={() => handlePress(index)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedButtonIndex === index
                    ? styles.textPressed
                    : styles.textNormal,
                ]}
              >
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View>
      <View style={styles.containerSearcher}>
      <Image source={require("../../../../assets/icons/search-icon.png")} style={styles.image}/>
      <TextInput placeholder="Search for furniture..." style={styles.input}/>
      <TouchableOpacity>
      <Image source={require("../../../../assets/icons/Mic.png")} style={styles.imageMic}/>
      </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default FAQS;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 26,
    width: 341,
    height: 60,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: 120,
    height: 50,
    marginStart: 10,
  },
  buttonNormal: {
    backgroundColor: "#E6E6E6",
  },
  buttonPressed: {
    backgroundColor: "#1A1A1A",
  },
  buttonText: {
    fontSize: 16,
  },
  textNormal: {
    color: "#1A1A1A", // Màu chữ khi nút chưa được chọn
  },
  textPressed: {
    color: "#E6E6E6", // Màu chữ khi nút đã được chọn
  },
  input: {
    height: 40,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginLeft:10,
  },
  containerSearcher: {
    width: 341,
    height: 55,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    borderWidth:1,
    paddingHorizontal:14,
    paddingVertical:20,
    marginTop:5,
    marginStart: 30
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  imageMic:{
    width: 24,
    height: 24,
    marginLeft: 100,
  },
});
