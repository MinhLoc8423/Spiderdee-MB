import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import FomFontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.viewContainerProcduct}>
          <Image
            source={require("../assets/images/table-image.jpg")}
            style={{ width: 83, height: 79, marginStart: 10, marginTop: 13 }}
          />
          <View
            style={[styles.CardContent, { marginStart: 10, marginTop: 13 }]}
          >
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#1A1A1A" }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#808080",
                paddingTop: 5,
              }}
            >
              Size {item.size}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600" }}>
                ${item.price}
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity>
                  <AntDesign
                    name={"minussquareo"}
                    size={20}
                    onPress={() => onDecrease(item.id)}
                    style={{ right: 10 }}
                  />
                </TouchableOpacity>

                <Text>{item.quantity}</Text>

                <TouchableOpacity>
                  <AntDesign
                    name={"plussquareo"}
                    size={20}
                    onPress={() => onIncrease(item.id)}
                    style={{ left: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <FomFontAwesome
              name={"trash-o"}
              color={"red"}
              size={20}
              style={{ marginEnd: 10, marginTop: 13, right: 9 }}
              // onPress={() => handleRemoveItem(item.id)}
              onPress={() => onRemove(item.id)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainerProcduct: {
    height: 107,
    width: "100%",
    borderWidth: 1,
    margin: 5,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    flexDirection: "row",
  },
  CardContent: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 10,
    marginTop: 10,
  },
});
