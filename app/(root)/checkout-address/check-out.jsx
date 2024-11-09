import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../../components/Header";
import NotiModal from "../../../components/NotiModal.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../../../store/contexts/CartContext";
import { AuthContext } from "../../../store/contexts/AuthContext";
import { createOrder, createLinkPayment } from "../../../api/orderAPIs";
import { AddressContext } from "../../../store/contexts/AddressContext";
import { router } from "expo-router";
<<<<<<< HEAD
import NotiModal from '../../../components/NotiModal';
=======
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/orderConstans.js"

>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509
const Checkout = () => {
  const { cartList, clearCart } = useContext(CartContext);
  const { addresses } = useContext(AddressContext);
  const user = useContext(AuthContext);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const addressDefault = addresses.find(
      (address) => address.isDefault === true
    );
    setAddress(addressDefault);
  }, [addresses]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [vat, setVat] = useState(10);
  const [subTotal, setSubTotal] = useState();
  const [total, setTotal] = useState();
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

<<<<<<< HEAD
  const [showNotiModal, setShowNotiModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [forUsr, setForUsr] = useState("warning");
=======
  //Modal dialog
  const [showNotiModal, setShowNotiModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [forUsr, setForUsr] = useState("warning");
  const [redirectTo, setRedirectTo] = useState("");
  const [params, setParams] = useState({});

  const hanldTurnOnModal = (
    show,
    title,
    message,
    forUsr,
    redirectTo,
    params
  ) => {
    setShowNotiModal(show);
    setTitle(title);
    setMessage(message);
    setForUsr(forUsr);
    setRedirectTo(redirectTo);
    setParams(params);
  };
>>>>>>> 4b2c03462996ddaa391954bc53aa1098c48d8509

  const calculateSubtotal = () => {
    return cartList.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      return sum + price * quantity;
    }, 0);
  };

  const calculateVAT = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * vat) / 100; // Tính VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vatTotal = (subtotal * vat) / 100;
    return subtotal + vatTotal + shippingFee;
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1);
      const discountAmount = subTotal * 0.1;
      setTotal(subTotal + shippingFee + vat - discountAmount);
      setPromoApplied(true);
      alert("Mã giảm giá đã được áp dụng!");
    } else {
      alert("Mã giảm giá không hợp lệ.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) {
      setForUsr('warning');
      setTitle("Thanh toàn không thành công");
      setMessage("Vui lòng chọn phương thức thanh toán!");
      setShowNotiModal(true);
      return;
    }
    try {
      const data = await createOrder(
        user.user.id,
        address,
        selectedPaymentMethod,
        cartList
      );
      if (data.status == 201 && data.data.payment_method == "Cash") {
        clearCart();
        hanldTurnOnModal(
          true,
          "Đặt hàng thành công",
          "Vui lòng chờ hàng đến tay bạn.",
          "success",
          "/(root)/(tabs)/account/my-order",
          {}
        );
      }
      if (data.status == 201 && data.data.payment_method == "ZaloPay") {
        clearCart();
        hanldTurnOnModal(
          true,
          "Đặt hàng thành công",
          "Vui lòng chờ hàng đến tay bạn.",
          "success",
          "/(root)/checkout-address/payment",
          { order_id: data.data._id }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Tiêu đề */}
        <Header title={"Phương thức thanh toán"} />

        {/* Phần Địa chỉ giao hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <TouchableOpacity
            onPress={() => router.push("(root)/checkout-address/address")}
            style={styles.changeButton}
          >
            <Text style={styles.changeText}>Thay đổi</Text>
          </TouchableOpacity>
          <View style={styles.address}>
            <Ionicons name="location-outline" size={18} />
            <Text style={styles.addressText}>{address.name}</Text>
          </View>
          <Text style={styles.addressDetail}>{address.address}</Text>
        </View>

        {/* Phần Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === PAYMENT_METHOD.CASH &&
                  styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedPaymentMethod(PAYMENT_METHOD.CASH)}
            >
              <Ionicons name="cash-outline" size={18} />
              <Text style={styles.paymentText}>Tiền mặt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                selectedPaymentMethod === PAYMENT_METHOD.ZALOPAY &&
                  styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedPaymentMethod(PAYMENT_METHOD.ZALOPAY)}
            >
              <Image
                className="w-6 h-6"
                source={require("../../../assets/icons/zalo-icon.png")}
              />
              <Text style={styles.paymentText}>ZaloPay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Phần Tóm tắt đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Tổng tiền hàng</Text>
            <Text style={styles.orderValue}>
              {calculateSubtotal().toLocaleString() + " VNĐ"}
            </Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>VAT (%)</Text>
            <Text style={styles.orderValue}>
              {calculateVAT().toLocaleString() + " VNĐ"}
            </Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Phí giao hàng</Text>
            <Text style={styles.orderValue}>
              {shippingFee.toLocaleString()} VNĐ
            </Text>
          </View>
          <View style={[styles.orderRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>
              {calculateTotal().toLocaleString() + " VNĐ"}
            </Text>
          </View>

          {/* Phần Mã giảm giá */}
          <View style={styles.promoSection}>
            <Ionicons name="pricetag-outline" size={18} />
            <TextInput
              style={styles.promoInput}
              placeholder="Nhập mã giảm giá"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleApplyPromoCode}
              disabled={promoApplied}
            >
              <Text style={styles.addButtonText}>
                {promoApplied ? "Đã áp dụng" : "Thêm"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nút Đặt hàng */}
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Đặt hàng</Text>
        </TouchableOpacity>

        <NotiModal
          visible={showNotiModal}
          onClose={() => setShowNotiModal(false)}
          title={title}
          forUse={forUsr}
          message={message}
          redirect={true}
          redirectTo={redirectTo}
          params={params}
        />
         <NotiModal
                    visible={showNotiModal}
                    onClose={() => setShowNotiModal(false)}
                    title={title}
                    forUse={forUsr}
                    message={message}
                    redirect={false}
                    redirectTo="(auth)/sign-in"
                />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 24,
    paddingEnd: 24,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  changeButton: {
    position: "absolute",
    right: 0,
  },
  changeText: {
    color: "#1A1A1A",
  },
  address: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  addressText: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  addressDetail: {
    color: "#555",
    marginTop: 4,
    marginLeft: 23,
  },
  paymentMethods: {
    flexDirection: "row",
    marginVertical: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  selectedPaymentMethod: {
    backgroundColor: "#f0f0f0",
    borderColor: "#1A1A1A",
  },
  paymentText: {
    marginLeft: 5,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  orderLabel: {
    color: "#333",
  },
  orderValue: {
    color: "#333",
    fontWeight: "bold",
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  promoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  promoInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#4caf50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  placeOrderButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Checkout;
