import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getProductById } from "../../../api/productAPIs";
import { getReviewByProductId } from "../../../api/reviewAPIs";
import { CartContext } from "../../../store/contexts/CartContext";
import { SaveItemContext } from "../../../store/contexts/SaveItemContext";
import NotiModal from "../../../components/NotiModal";
import Header from "../../../components/Header";
import { FontAwesome } from "@expo/vector-icons";

const ProductDetails = () => {
  const id = useLocalSearchParams();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState();
  const [reviews, setReviews] = useState();
  const [dataReview, setDataReview] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { wishList, addToWishlist, removeFromWishlist } =
    useContext(SaveItemContext);
  const [price, setPrice] = useState();
  const isInWishlist = wishList.some(
    (wishItem) => wishItem?.product_id?._id === product._id
  );

  // Modal
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");

  const fetchData = async () => {
    const response = await getProductById(id.id);
    setPrice(response.data.price.toLocaleString());
    setProduct(response.data);
  };

  const fetchReview = async () => {
    const responseReview = await getReviewByProductId(id.id);
    const reviewsData = responseReview.data;
    const averageRating =
      reviewsData.length > 0
        ? (
            reviewsData.reduce((sum, review) => sum + review.rating, 0) /
            reviewsData.length
          ).toFixed(1)
        : 0.0;
    setRating(averageRating); // Chuyển chuỗi sang số thực
    setReviews(reviewsData.length);
    setDataReview(reviewsData);
  };

  useEffect(() => {
    fetchReview();
  }, [])

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setForUsr("success");
      setTitle("Thành công");
      setMessage("Vui lòng xem giỏ hàng");
      setShowNotiModal(true);
    } else {
      setForUsr("warning");
      setTitle("Cảnh báo");
      setMessage("Vui lý chọn kích thước");
      setShowNotiModal(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title={"Chi tiết sản phảm"} />

        {/* Product Image */}
        <View style={{ paddingVertical: 8 }}>
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: 300, borderRadius: 8 }}
          />
          <TouchableOpacity
            onPress={() => {
              if (isInWishlist) {
                const wishlistItemId = wishList.find(
                  (wishItem) => wishItem?.product_id?._id === product._id
                )?._id;
                if (wishlistItemId) {
                  removeFromWishlist(wishlistItemId);
                } else {
                  console.log("Wishlist item not found for removal.");
                }
              } else {
                addToWishlist(product._id);
              }
            }}
            className="absolute top-5 right-5 bg-primary-0 rounded-lg p-2"
          >
            <Image
              source={
                isInWishlist
                  ? require("../../../assets/icons/heart-filled-icon.png")
                  : require("../../../assets/icons/heart-icon.png")
              }
              className="w-4 h-4"
              style={{ tintColor: isInWishlist ? "#ED1010" : "#1A1A1A" }}
            />
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
            {product.name}
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
            onPress={() => router.push({
              pathname: "/(root)/reviews/[id]",
              params: { id: product._id, reviews: JSON.stringify(dataReview) }
            })}            
          >
            <FontAwesome name="star" size={17} color="#FFA928" />
            <Text
              style={{
                color: "#374151",
                marginLeft: 4,
                textDecorationLine: "underline",
                fontFamily: "GeneralMedium",
              }}
            >
              {rating}/5
            </Text>
            <Text
              style={{
                color: "#6B7280",
                fontFamily: "GeneralMedium",
                marginLeft: 4,
              }}
            >
              ({reviews} reviews)
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#4B5563",
              marginTop: 8,
              fontFamily: "GeneralRegular",
            }}
          >
            {product.description}
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
            {Array.isArray(product.size) && product.size.length > 0 ? (
              product.size.map((size) => (
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
              ))
            ) : (
              <Text style={{ color: "#6B7280" }}>No sizes available</Text>
            )}
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
            <Text style={{ fontSize: 20, fontFamily: "GeneralSemibold" }}>
              {price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              backgroundColor: "black",
              paddingHorizontal: 59,
              paddingVertical: 16,
              borderRadius: 10,
              flexDirection: "row", // This makes the text and image align horizontally
              alignItems: "center", // Centers items vertically
              justifyContent: "center", // Centers items horizontally within TouchableOpacity
            }}
          >
            <Image
              source={require("../../../assets/icons/bag-icon.png")}
              style={{ width: 24, height: 24, marginRight: 8 }} // Adds space between image and text
              tintColor={"#FFFFFF"}
            />
            <Text style={{ color: "white", fontSize: 16 }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        redirect={true}
        redirectTo="/(root)/(tabs)/home"
      />
    </SafeAreaView>
  );
};

export default ProductDetails;
