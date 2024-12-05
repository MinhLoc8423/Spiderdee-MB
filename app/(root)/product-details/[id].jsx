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
import { MotiView } from "moti";

const ProductDetails = () => {
  const id = useLocalSearchParams();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState();
  const [reviews, setReviews] = useState();
  const [dataReview, setDataReview] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const [isRedirect, setIsRedirect] = useState(false);
  const [button, setButton] = useState("");


  const fetchData = async () => {
    try {
      console.log("Product ID:", id.id);
      const response = await getProductById(id.id);
      console.log("Products by id response: ", response.data);
      setPrice(response.data.price.toLocaleString());
      setProduct(response.data);
      setLoading(false); // Data fetched, stop loading
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false); // Stop loading on error
    }
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
  }, []);

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setForUsr("success");
      setTitle("Thành công");
      setMessage("Vui lòng xem giỏ hàng");
      setShowNotiModal(true);
      setIsRedirect(true);
      setButton("Tiếp tục")

    } else {
      setForUsr("warning");
      setTitle("Cảnh báo");
      setMessage("Vui lý chọn kích thước");
      setShowNotiModal(true);
      setIsRedirect(false);
      setButton("Đóng")

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          <Header title={"Chi tiết sản phảm"} />

          {/* Product Image Skeleton */}
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "timing",
              duration: 800,
              loop: true,
              repeatReverse: true,
            }}
            style={{
              height: 300,
              borderRadius: 8,
              marginVertical: 8,
              backgroundColor: "#E0E0E0",
            }}
          />

          {/* Product Details Skeleton */}
          <View style={{ marginTop: 16 }}>
            <MotiView
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: 800,
                loop: true,
                repeatReverse: true,
              }}
              style={{
                width: "60%",
                height: 24,
                borderRadius: 4,
                backgroundColor: "#E0E0E0",
                marginBottom: 10,
              }}
            />
            <MotiView
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: 800,
                loop: true,
                repeatReverse: true,
              }}
              style={{
                width: "40%",
                height: 20,
                borderRadius: 4,
                backgroundColor: "#E0E0E0",
                marginBottom: 10,
              }}
            />
            <MotiView
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: 800,
                loop: true,
                repeatReverse: true,
              }}
              style={{
                width: "80%",
                height: 100,
                borderRadius: 4,
                backgroundColor: "#E0E0E0",
                marginBottom: 10,
              }}
            />

            {/* Size Options Skeleton */}
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              {[...Array(3)].map((_, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    type: "timing",
                    duration: 800,
                    loop: true,
                    repeatReverse: true,
                  }}
                  style={{
                    width: 50,
                    height: 30,
                    borderRadius: 8,
                    backgroundColor: "#E0E0E0",
                    marginRight: 8,
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 24 }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title={"Chi tiết sản phẩmm"} />

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
                  console.log("Mục danh sách yêu thích không được tìm thấy để xóa.");
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
              fontWeight: "700",
              marginTop: 8,
              fontFamily: "GeneralSemibold",
            }}
          >
            {product.name}
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
            onPress={() =>
              router.push({
                pathname: "/(root)/reviews/[id]",
                params: {
                  id: product._id,
                  reviews: JSON.stringify(dataReview),
                },
              })
            }
          >
            <FontAwesome name="star" size={17} color="#FFA928" />
            <Text
              style={{
                color: "#374151",
                marginLeft: 4,
                textDecorationLine: "underline",
                fontWeight:"500"
              }}
            >
              {rating}/5.0
            </Text>
            <Text
              style={{
                color: "#808080",
                fontWeight:"500",
                marginLeft: 4,
              }}
            >
              ({reviews} Đánh giá)
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "#808080",
              marginTop: 9,
              fontWeight:"400"
            }}
          >
            {product.description}
          </Text>

          {/* Size Options */}
          <Text
            style={{
              fontSize: 20,
              fontWeight:"600",
              marginTop: 16,
            }}
          >
            Kích thước
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
                      fontWeight:"500",
                      fontSize: 20,
                      color: selectedSize === size ? "white" : "#374151",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: "#6B7280" }}>Không có kích thước có sẵn</Text>
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
                fontWeight:"400",
                color: "#808080",
              }}
            >
              Giá
            </Text>
            <Text style={{ fontSize: 20, fontWeight:"700" }}>
              {price} VNĐ
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              left:5,
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
            <Text style={{ color: "white", fontSize: 16, fontWeight:"500" }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>

      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        redirect={isRedirect}
        button ={button}
        redirectTo="/(root)/(tabs)/cart"
      />
    </SafeAreaView>
  );
};

export default ProductDetails;
