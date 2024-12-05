import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import Header from "../../../../components/Header";
import { getOrderDetailsByUserId } from "../../../../api/orderAPIs";
import { formattedDate } from "../../../../utils/formatDate";
import { AuthContext } from "../../../../store/contexts/AuthContext";
import { router } from "expo-router";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../../constants/orderConstans";
import { MotiView } from "moti"; // Import Moti for skeleton effect

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function MyOrdersScreen() {
  const [selectedTab, setSelectedTab] = useState("Ongoing");
  const { user } = useContext(AuthContext);
  const [ordersData, setOrdersData] = useState([]);
  const [orderData0, setOrderData0] = useState([]);
  const [orderData1, setOrderData1] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const hanldeGetData = async () => {
    try {
      const response = await getOrderDetailsByUserId(user.id);
      console.log("Get order by user id response: ", response.data);
      if (response.status === 200) {
        setOrdersData(response.data);
      } else {
        setOrdersData([]);
      }
      setLoading(false); // Stop loading after data is fetched
    } catch (error) {
      setOrdersData([]);
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    hanldeGetData();
  }, []);

  useEffect(() => {
    const ongoingOrders = ordersData.filter(
      (order) => order.status !== ORDER_STATUS.DELIVERED
    );
    const completedOrders = ordersData.filter(
      (order) => order.status == ORDER_STATUS.DELIVERED
    );
    setOrderData0(ongoingOrders);
    setOrderData1(completedOrders);
  }, [ordersData, selectedTab]);

  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/flat-design-delivery-man_23-2149146357.jpg?w=740",
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>
            Ngày đặt: {formattedDate(item.order_date)}
          </Text>
          <Text style={styles.itemSize}>
            Phương thức: {item.payment_method}
          </Text>
        </View>
        <Text style={styles.itemPrice}>
          {Number(item.total_price["$numberDecimal"]).toLocaleString()} VNĐ
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Text
          className={`text-xs font-medium rounded-md px-2 py-1 ${
            item.status === ORDER_STATUS.DELIVERED
              ? "text-success bg-[#E5F1E4]"
              : item.status === ORDER_STATUS.CANCELLED
              ? "text-danger bg-[#FAE3E3]"
              : "text-primary-900 bg-primary-100"
          }`}
        >
          {item.status}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(root)/track-order/[id]",
                params: { id: item.order_id, item: JSON.stringify(item) },
              })
            }
            className="bg-black rounded-lg py-2 px-4 "
          >
            <Text className="text-white font-semibold">Theo dõi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Skeleton for each order item
  const renderOrderItemSkeleton = () => (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "timing",
        duration: 800,
        loop: true,
        repeatReverse: true,
      }}
      style={styles.itemContainer}
    >
      {/* Skeleton cho hình ảnh sản phẩm */}
      <View style={styles.skeletonImage} />
      {/* Skeleton cho chi tiết sản phẩm */}
      <View style={styles.detailsContainer}>
        <View style={styles.skeletonTextShort} />
        <View style={styles.skeletonText} />
      </View>
      {/* Skeleton cho nút Theo dõi */}
    </MotiView>
  );

  const renderEmptyState = () => (
    <StyledView className="flex-1 items-center justify-center mt-10">
      <Image
        className="w-16 h-16"
        source={require("../../../../assets/icons/box-icon.png")}
      />
      <StyledText className="text-lg font-semibold text-gray-700 mt-4">
        Không có đơn hàng nào!
      </StyledText>
      <StyledText className="text-sm text-gray-500 mt-2">
        Hiện tại bạn không có đơn hàng nào.
      </StyledText>
    </StyledView>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-0">
      <View className="px-6 mb-[-27]">
        <Header title={"Lịch sử đơn hàng"} />
      </View>

      <View className="px-6">
        <StyledView className="flex-row w-full p-2 rounded-lg bg-primary-100 justify-center mt-6">
          <StyledTouchableOpacity
            onPress={() => setSelectedTab("Ongoing")}
            className={`px-4 py-2 w-1/2 rounded-lg ${
              selectedTab === "Ongoing" ? "bg-primary-0" : "bg-primary-100"
            }`}
          >
            <StyledText
              className={`text-center ${
                selectedTab === "Ongoing"
                  ? "text-primary-900"
                  : "text-primary-400"
              }`}
            >
              Đang xử lý
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            onPress={() => setSelectedTab(ORDER_STATUS.DELIVERED)}
            className={`px-4 py-2 w-1/2 rounded-lg ml-2 ${
              selectedTab === ORDER_STATUS.DELIVERED
                ? "bg-primary-0"
                : "bg-primary-100"
            }`}
          >
            <StyledText
              className={`text-center ${
                selectedTab === ORDER_STATUS.DELIVERED
                  ? "text-primary-900"
                  : "text-primary-400"
              }`}
            >
              Hoàn thành
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </View>

      {loading ? (
        // Hiển thị Skeleton khi dữ liệu đang tải
        <FlatList
          data={Array(6).fill({})} // Dummy data for skeleton items
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrderItemSkeleton}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        />
      ) : (
        // Hiển thị nội dung thực nếu dữ liệu đã tải xong
        <FlatList
          data={selectedTab === ORDER_STATUS.DELIVERED ? orderData1 : orderData0}
          keyExtractor={(item) => item.order_id}
          renderItem={renderOrderItem}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Skeleton styles
  skeletonImage: {
    width: 85,
    height: 85,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginRight: 16,
  },
  skeletonText: {
    width: "40%",
    height: 20,
    paddingTop: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
    marginTop: -8,
  },
  skeletonTextShort: {
    width: "100%",
    height: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  skeletonReviewButton: {
    width: 80,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  // Existing styles for order items
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
    resizeMode: "center",
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
  quantityText: {
    color: "#1A1A1A",
    fontSize: 12,
    marginHorizontal: 8,
    marginBottom: 5,
  },
});
