import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PriceRange from "../priceRange";
import React, { useState } from "react";

const Filter = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const buttons = [
    "Relevance",
    "Price: Low - High",
    "Price: High - Low",
    "Popular",
  ];

  const handlePress = (index) => {
    setSelectedButtonIndex(index);
  };
  return (
    <View style={styles.backdrop}>
      <View style={styles.bottomsheet}>
        <View style={styles.heeaderContainer}>
          <Text style={styles.text}>Filter</Text>
          <Image
            style={styles.Image}
            source={require("../../constants/Image/Cancel.png")}
          />
        </View>
        <View style={styles.sortContainer}>
          <Text style={styles.text}>Sort By</Text>
          <ScrollView horizontal={true} marginTop={12}>
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
          </ScrollView>
        </View>
        <PriceRange />
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomsheet: {
    width: "100%",
    height: 405,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  heeaderContainer: {
    marginTop: 30,
    marginLeft: 35,
    width: 341,
    height: 24,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sortContainer: {
    marginTop: 30,
    marginLeft: 35,
    width: 458,
    height: 100,
    gap: 12,
  },
  text: {
    width: 120,
    height: 24,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
  },
  image: {
    width: 24,
    height: 24,
  },
  button: {
    width: 180,
    height: 45,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    gap: 10,
    alignItems: "center",
  },
  buttonNormal: {
    backgroundColor: "#E6E6E6",
  },
  buttonPressed: {
    backgroundColor: "#1A1A1A",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  textNormal: {
    color: "#1A1A1A",
  },
  textPressed: {
    color: "#FFFFFF",
  },
});
