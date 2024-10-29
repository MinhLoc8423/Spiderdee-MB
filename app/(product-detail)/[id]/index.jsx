import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getProductById } from "../../../api/product";


import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductDetails = () => {
  const id = useLocalSearchParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);

  const data = async () => {
    const data = await getProductById(id.id);
    setProduct(data.data);
  }
  
  useEffect(() => {
    data();
  }, []);


  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };
 

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
    >
      <ScrollView>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 23,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../../assets/icons/arrow-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
            Details
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/icons/bell-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={{ paddingVertical: 8 }}>
          <Image
            source={{
              uri: (product.image),
            }}
            style={{ width: "100%", height: 300, borderRadius: 8 }}
          />
          <TouchableOpacity className="absolute top-5 right-4 bg-primary-0 rounded-lg p-2 ">
            <AntDesign name={"hearto"} size={20}/>
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              marginTop: 8,
              fontFamily: "GeneralSemibold",
            }}
          >
            {(product.name)}
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
            onPress={() => router.push("(product-detail)/[id]/review", id.id)}
          >
            <Text style={{ color: "#FBBF24" }}>⭐</Text>
            <Text
              style={{
                color: "#374151",
                marginLeft: 4,
                textDecorationLine: "underline",
                fontFamily: "GeneralMedium",
              }}
            >
              4.0/5
              </Text>
            <Text
              style={{
                color: "#6B7280",
                fontFamily: "GeneralMedium",
                marginLeft: 4,
              }}
            >
              (45 reviews)
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#4B5563",
              marginTop: 8,
              fontFamily: "GeneralRegular",
            }}
          >
            {(product.description)}
          </Text>

          {/* Size Options */}
          <Text
            style={{
              fontSize: 20,
              fontFamily: "GeneralSemibold",
              marginTop: 16,
            }}
          >
            Choose size
          </Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            {["S", "M", "L"].map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => handleSizeSelect(size)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: selectedSize === size ? "black" : "#D1D5DB",
                  backgroundColor:
                    selectedSize === size ? "black" : "transparent",
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GeneralMedium",
                    fontSize: 20,
                    color: selectedSize === size ? "white" : "#374151",
                  }}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Price and Add to Cart at Bottom */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          paddingStart: 24,
          paddingEnd: 24,
          paddingBottom: 15,
          paddingTop: 15,
          borderTopWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "GeneralSemibold",
                color: "black",
              }}
            >
              Price
            </Text>
            <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
              {product.price}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "black",
              paddingHorizontal: 59,
              paddingVertical: 16,
              borderRadius: 10,
            }}
            
            >
            <Image
              source={require("../../../assets/icons/bag-icon.png")}
              style={{
                width: 20,
                height: 20,
                marginRight: 8,
                tintColor: "white",
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "GeneralMedium",
              }}
            >
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;