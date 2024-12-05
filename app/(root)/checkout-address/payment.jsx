import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { createLinkPayment, checkStatusOrder } from "../../../api/orderAPIs";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { ORDER_STATUS } from "../../../constants/orderConstans";
import moment from "moment";

const PaymentDetailsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const [paymentDetails, setPaymentDetails] = useState({});

  const { order_id, total, quantity } = useLocalSearchParams();
  const [checking, setChecking] = useState(false);
  const [linking, setLinking] = useState("");

  useEffect(() => {
    // Hàm kiểm tra trạng thái thanh toán
    console.log("Đang kiểm tra trạng thái thanh toán...");
    const checkPaymentStatus = async () => {
      try {
        const response = await checkStatusOrder(paymentDetails.app_trans_id);
        const result = response;
        console.log("Result received: ", result);

        if (result.return_code == 1) {
          setStatus("success");
          setChecking(false);
          setTimeout(() => {
            router.replace("/(root)/(tabs)/account")
          }, 5000);
          
        }
        if (result.return_code == 2) {
          setStatus("failed");
          setChecking(false);
          setTimeout(() => {
            router.replace("/(root)/(tabs)/account")
          }, 5000);
        }
        if (result.return_code == 3) {
          setStatus("pending");
        }
      } catch (error) {
        console.log("Lỗi kiểm tra thanh toán:", error);
      }
    };

    let interval;
    if (checking) {
      interval = setInterval(checkPaymentStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [checking]);

  useEffect(() => {
    // Hàm lấy liên kết thanh toán
    const fetchPaymentLink = async () => {
      try {
        const data = await createLinkPayment(order_id); // Đảm bảo createLinkPayment trả về Promise

        // Kiểm tra mã trả về
        if (data.status === 200) {
          console.log("Data received: ", data.data);
          setPaymentDetails(data.data); // Lấy thông tin thanh toán từ dữ liệu
          console.log("Payment details: ", paymentDetails);
          setLinking(data.data.payment_url); // Lấy order_url từ dữ liệu
        } else {
          console.error("Lỗi từ API:", data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy liên kết thanh toán:", error);
      }
    };

    fetchPaymentLink(); // Gọi hàm để lấy liên kết thanh toán
    setLoading(false);
  }, [order_id]);

  const openZaloPay = async () => {
    if (linking) {
      await WebBrowser.openBrowserAsync(linking);
      setChecking(true);
    } else {
      console.error("Linking không có giá trị.");
    }
  };

  const getStatusDetails = () => {
    switch (status) {
      case "success":
        return {
          icon: "check-circle",
          color: "#22c55e",
          message: "Thanh toán thành công",
          label: "Hoàn thành",
        };
      case "failure":
        return {
          icon: "times-circle",
          color: "#ED1010",
          message: "Thanh toán thất bại",
          label: "Thất bại",
        };
      case "pending":
        return {
          icon: "hourglass-half",
          color: "#facc15",
          message: "Đang xử lý thông tin",
          label: "Đang chờ",
        };
      default:
        return {
          icon: "question-circle",
          color: "#6b7280",
          message: "Không xác định",
          label: "Không xác định",
        };
    }
  };

  const { icon, color, message, label } = getStatusDetails();

  if (loading) {
    // Skeleton loader khi dữ liệu đang tải
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, alignItems: "center", padding: 24 }}>
            {/* Skeleton cho header */}
            <View
              style={{
                width: "60%",
                height: 30,
                backgroundColor: "#e5e7eb",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            {/* Skeleton cho icon trạng thái */}
            <View
              style={{
                width: 96,
                height: 96,
                backgroundColor: "#e5e7eb",
                borderRadius: 48,
                marginBottom: 16,
              }}
            />
            {/* Skeleton cho trạng thái */}
            <View
              style={{
                width: "50%",
                height: 20,
                backgroundColor: "#e5e7eb",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            {/* Skeleton cho số tiền */}
            <View
              style={{
                width: "80%",
                height: 40,
                backgroundColor: "#e5e7eb",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
            {/* Skeleton cho thông tin chi tiết */}
            <View
              style={{
                width: "100%",
                height: 150,
                backgroundColor: "#e5e7eb",
                borderRadius: 8,
                marginTop: 16,
              }}
            />
            {/* Skeleton cho nút */}
            <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#e5e7eb",
                borderRadius: 8,
                marginTop: 24,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, alignItems: "center", padding: 24 }}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: "bold",
              color: "#1A1A1A",
              marginBottom: 16,
            }}
          >
            Chi tiết thanh toán
          </Text>
          <FontAwesome name={icon} size={96} color={color} />
          <Text
            style={{ marginTop: 16, fontSize: 16, fontWeight: "500", color }}
          >
            {message}
          </Text>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#000",
              marginTop: 16,
            }}
          >
            {Number(total).toLocaleString()+ " VNĐ"} 
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#6b7280" }}>
            {label}
          </Text>
          <View style={{ marginTop: 32, width: "100%" }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#e5e7eb",
                marginBottom: 16,
              }}
            />
            <TextDetail label="Tổng tiền :" value={`${Number(total).toLocaleString()} VNĐ`} />
            <TextDetail label="Số lượng :" value={quantity} />
            <TextDetail
              label="Thời gian tạo :"
              value={`${moment(paymentDetails.createdAt).format('DD/MM/YYYY HH:mm:ss')}`}
            />
            <TextDetail
              label="Thời gian hết hạn :"
              value={`${moment(paymentDetails.expiresAt).format('DD/MM/YYYY HH:mm:ss')}`}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#e5e7eb",
                marginTop: 16,
              }}
            />
          </View>
        </View>
        {/* Nút thanh toán */}
        <TouchableOpacity
            style={{
              marginTop: 24,
              backgroundColor: "#1A1A1A",
              paddingVertical: 16,
              marginHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={openZaloPay}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Thanh toán
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Component để render thông tin từng dòng
const TextDetail = ({ label, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
    }}
  >
    <Text style={{ fontSize: 16, color: "#6b7280" }}>{label}</Text>
    <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
      {value}
    </Text>
  </View>
);

export default PaymentDetailsScreen;
