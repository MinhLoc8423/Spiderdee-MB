import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { styled } from "nativewind";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import {
  createReview,
  getReviewsByOrderDetailIds,
} from "../../../api/reviewAPIs";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/orderConstans";
import { AuthContext } from "../../../store/contexts/AuthContext";
import NotiModal from "@/components/NotiModal";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const SectionTitle = styled(Text, "text-xl font-semibold mb-2");
const StatusContainer = styled(View, "flex-row items-baseline space-x-4");
const StatusText = styled(Text, "font-medium text-lg");

const TrackOrderScreen = () => {
  const { id, item } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState();
  const parsedItem = JSON.parse(item);
  const paymentMethod = parsedItem.payment_method;

  // Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentOrderDetailId, setCurrentOrderDetailId] = useState(null);
  const [reviews, setReviews] = useState({});

  //Modal dialog
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [button, setButton] = useState("");

  const hanldTurnOnModal = (show, title, message, forUsr, button) => {
    setShowNotiModal(show);
    setTitle(title);
    setMessage(message);
    setForUsr(forUsr);
    setButton(button);
  };

  const openModal = (productId, orderDetailId) => {
    setCurrentProductId(productId);
    setCurrentOrderDetailId(orderDetailId);
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    setStatus(parsedItem.status);
    setProducts(parsedItem.products);
    fetchReviews(parsedItem.products);
  }, []);

  useEffect(() => {
    fetchReviews(parsedItem.products);
  }, [isModalVisible]);

  const fetchReviews = async (products) => {
    const orderDetailIds = products.map((p) => p.order_detail_id);
    console.log("Order detail IDs:", orderDetailIds);
    try {
      const response = await getReviewsByOrderDetailIds(orderDetailIds); // Gọi API lấy reviews
      const reviewsData = response.data.reduce((acc, review) => {
        acc[review.order_detail_id._id] = review; // Lưu review theo order_detail_id
        return acc;
      }, {});
      console.log("Reviews data:", reviewsData);
      setReviews(reviewsData); // Cập nhật state reviews
      console.log("Reviews:", reviews);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const handleRatingPress = (star) => {
    setRating(star);
  };

  const submitReview = async () => {
    try {
      console.log("Submit review:", currentProductId, currentOrderDetailId);
      if (rating === 0 || review === "") {
        hanldTurnOnModal(
          true,
          "Thông báo",
          "Vui lòng điền đầy đủ thông tin.",
          "warning",
          "Đóng"
        );
        return;
      }

      // Call createReview API and store result in `response`
      const response = await createReview(
        review,
        rating,
        currentProductId,
        user.id,
        currentOrderDetailId
      );

      // Check response status
      if (response.status === 201) {
        setRating(0);
        setReview("");
        closeModal();
        hanldTurnOnModal(
          true,
          "Cảm ơn!",
          "Đánh giá của bạn sẽ là góp phần giúp chúng tôi hoàn thiện hơn mỗi ngày",
          "success",
          "Đóng"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isActiveStatus = (currentStatus, targetStatus) => {
    return (
      Object.values(ORDER_STATUS).indexOf(currentStatus) >=
      Object.values(ORDER_STATUS).indexOf(targetStatus)
    );
  };

  // Lọc trạng thái đơn hàng để loại bỏ CANCELLED nếu đơn hàng không bị hủy
  const filteredOrderStatus = Object.values(ORDER_STATUS).filter((status) => {
    // Nếu đơn hàng bị hủy, chỉ hiện trạng thái CANCELLED
    if (parsedItem.status === ORDER_STATUS.CANCELLED) {
      return status === ORDER_STATUS.CANCELLED;
    }
    // Nếu đơn hàng không bị hủy, bỏ qua trạng thái CANCELLED trong danh sách
    if (paymentMethod === PAYMENT_METHOD.CASH) {
      return (
        status !== ORDER_STATUS.CANCELLED &&
        status !== ORDER_STATUS.AWAITING_PAYMENT &&
        status !== ORDER_STATUS.PAYMENT_CONFIRMED
      );
    }
    return status !== ORDER_STATUS.CANCELLED;
  });

  const renderOrderItem = ({ item }) => {
    const review = reviews[item.order_detail_id]; // Lấy review cho sản phẩm hiện tại
    console.log("Review 2131:", item);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text
              onPress={() =>
                router.push({
                  pathname: "/(root)/product-details/[id]",
                  params: { id: item.product_id },
                })
              }
              style={styles.itemName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text style={styles.itemSize}>Size: {item.size}</Text>
          </View>
          <Text style={styles.itemPrice}>
            {Number(item.price).toLocaleString()} VNĐ
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
            Số lượng: {item.quantity}
          </Text>

          <View style={styles.quantityContainer}>
            {status === ORDER_STATUS.DELIVERED ? (
              review ? (
                // Nếu review đã tồn tại, hiển thị rating và bình luận
                <View className="bg-primary-0 border border-primary-100 rounded-lg py-2 px-4 flex-row items-center">
                  <FontAwesome name={"star"} size={15} color="#FFA928" />
                  <Text className="text-primary-900 font-medium ml-1">
                    {review.rating}/5
                  </Text>
                </View>
              ) : (
                // Nếu chưa có review, hiển thị nút Đánh giá
                <TouchableOpacity
                  onPress={() =>
                    openModal(item.product_id, item.order_detail_id)
                  }
                  className="bg-primary-900 rounded-lg py-2 px-4"
                >
                  <Text className="text-white font-semibold">Đánh giá</Text>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                disabled={status !== ORDER_STATUS.DELIVERED}
                className="bg-primary-100 rounded-lg py-2 px-4"
              >
                <Text className="text-primary-700 font-semibold">Đánh giá</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderOrderStatus = (targetStatus) => {
    return (
      <StatusContainer>
        {isActiveStatus(status, targetStatus) ? (
          <View className="flex items-center">
            {targetStatus === ORDER_STATUS.PENDING ? (
              <View className="w-[1.5px] bg-primary-900 border-dotted" />
            ) : (
              <View className="w-[1.5px] h-7 bg-primary-900 border-dotted" />
            )}
            <View className="w-4 h-4 rounded-full bg-primary-900 border border-primary-900" />
          </View>
        ) : (
          <View className="flex items-center justify-around">
            <View className="w-[1.5px] h-7 bg-primary-300 border-dotted" />
            <View className="w-4 h-4 rounded-full bg-primary-300 border border-primary-300" />
          </View>
        )}
        <View>
          <StatusText
            className={`pt-3 ${
              isActiveStatus(status, targetStatus)
                ? "text-primary-900"
                : "text-primary-300"
            }`}
          >
            {targetStatus}
          </StatusText>
        </View>
      </StatusContainer>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <Header title="Theo dõi đơn hàng" />
      {status !== ORDER_STATUS.CANCELLED ? (
        <FlatList
          data={[...filteredOrderStatus, { key: "divider" }, ...products]}
          keyExtractor={(item, index) => item.order_id || index.toString()}
          renderItem={({ item }) => {
            if (typeof item === "string") {
              return renderOrderStatus(item);
            } else if (item.key === "divider") {
              return (
                <>
                  <View className="border-b pt-6 border-primary-100"></View>
                  <SectionTitle className="pt-6">
                    Chi tiết đơn hàng
                  </SectionTitle>
                </>
              );
            } else {
              return renderOrderItem({ item });
            }
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <SectionTitle className="border-b pb-4 border-primary-100">
              Trạng thái đơn hàng
            </SectionTitle>
          }
        />
      ) : (
        <View>
          <SectionTitle className="border-b pb-4 border-primary-100">
            Trạng thái đơn hàng
          </SectionTitle>
          <StatusContainer className="py-3">
            <View className="flex items-center justify-around">
              <View className="w-4 h-4 rounded-full bg-primary-900 border border-gray-300" />
            </View>
            <View>
              <StatusText>{status}</StatusText>
            </View>
          </StatusContainer>
          <View className="border-b pt-2 border-primary-100"></View>
          <SectionTitle className="pt-6">Chi tiết đơn hàng bị hủy</SectionTitle>
          <FlatList
            data={products}
            keyExtractor={(item, index) => item.order_id || index.toString()}
            renderItem={renderOrderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {/* Review Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              {/* Empty onPress handler to prevent closing when tapping inside modal */}
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Để lại đánh giá</Text>
                <View className="border-b pt-2 border-primary-100"></View>
                <Text style={styles.modalSubtitle}>
                  Quý khách hài lòng với đơn hàng không ạ?
                </Text>
                <Text className="text-sm mt-1 mb-5 text-primary-500">
                  Xin vui lòng đánh giá và nhận xét của bạn.
                </Text>
                {/* Star Rating */}
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRatingPress(star)}
                      style={{ marginHorizontal: 16 }}
                    >
                      <FontAwesome
                        name={star <= rating ? "star" : "star-o"}
                        size={32}
                        color="#FFD700"
                      />
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Review Text Input */}
                <TextInput
                  style={styles.textInput}
                  placeholder="Viết đánh giá của bạn..."
                  value={review}
                  onChangeText={(text) => setReview(text)}
                  multiline
                />

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={submitReview}
                >
                  <Text style={styles.submitButtonText}>Đánh giá</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <NotiModal
        visible={showNotiModal}
        onClose={() => setShowNotiModal(false)}
        title={title}
        forUse={forUsr}
        message={message}
        button={button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  reviewButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginTop: 16,
    fontWeight: "semibold",
    color: "#1A1A1A",
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    maxHeight: 120,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: "hidden",
    minHeight: 100,
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  textContainer: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  itemSize: {
    fontSize: 12,
    color: "#888",
  },
  itemPrice: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  actionsContainer: {
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 8,
  },
});

export default TrackOrderScreen;
