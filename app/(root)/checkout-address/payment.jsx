import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import * as Linking from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { createLinkPayment, getOrderByById } from "../../../api/orderAPIs";
import * as WebBrowser from 'expo-web-browser';
import { ORDER_STATUS } from "../../../constants/orderConstans";

const PaymentWaitingScreen = () => {
  const { order_id } = useLocalSearchParams();
  console.log("Order ID: ", order_id);
  const [isPaid, setIsPaid] = useState(false);
  const [checking, setChecking] = useState(false);
  const [linking, setLinking] = useState("");

  useEffect(() => {
    // Hàm lấy liên kết thanh toán
    const fetchPaymentLink = async () => {
      try {
        const data = await createLinkPayment(order_id); // Đảm bảo createLinkPayment trả về Promise
        console.log("Data received: ", data);

        // Kiểm tra mã trả về
        if (data.return_code === 1) {
          setLinking(data.order_url); // Lấy order_url từ dữ liệu
        } else {
          console.error("Lỗi từ API:", data.return_message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy liên kết thanh toán:", error);
      }
    };

    fetchPaymentLink(); // Gọi hàm để lấy liên kết thanh toán
  }, [order_id]);

  const openZaloPay = async () => {
    if (linking) {
      await WebBrowser.openBrowserAsync(linking);
      setChecking(true);
    } else {
      console.error("Linking không có giá trị.");
    }
  };

  useEffect(() => {
    // Hàm kiểm tra trạng thái thanh toán
    const checkPaymentStatus = async () => {
      try {
        const response = await getOrderByById(order_id);
        const result = response.data;
        console.log("Result received: ", result);

        if (result.order.status == ORDER_STATUS.PAYMENT_CONFIRMED) {
          setIsPaid(true);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra thanh toán:", error);
      }
    };

    let interval;
    if (checking) {
      interval = setInterval(checkPaymentStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [checking]);

  return (
    <View style={styles.container}>
      {isPaid ? (
        <>
        <Text style={styles.successText}>Thanh toán thành công!</Text>
        <Button title="Quay về" onPress={() => router.push("/(root)/account/my-order")} />
        </>
      ) : (
        <>
          <Text style={styles.text}>Đang chờ thanh toán qua ZaloPay...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
          <Button title="Thanh toán qua ZaloPay" onPress={openZaloPay} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});

export default PaymentWaitingScreen;
