import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {
    const navigation = useNavigation();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thẻ');
    const [total, setTotal] = useState(5950); // tổng tiền ban đầu chưa có giảm giá
    const [shippingFee, setShippingFee] = useState(80);
    const [vat, setVat] = useState(0);
    const [subTotal, setSubTotal] = useState(5870);
    const [promoApplied, setPromoApplied] = useState(false);
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const handleApplyPromoCode = () => {
        if (promoCode.toLowerCase() === 'save10') {
            setDiscount(0.1);
            const discountAmount = subTotal * 0.1;
            setTotal(subTotal + shippingFee + vat - discountAmount);
            setPromoApplied(true);
            alert('Mã giảm giá đã được áp dụng!');
        } else {
            alert('Mã giảm giá không hợp lệ.');
        }
    };

    const handlePlaceOrder = () => {
        if (!selectedPaymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán.');
            return;
        }
        // Mở modal thông báo thành công
        setSuccessModalVisible(true);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Tiêu đề */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('cart')}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Thanh toán</Text>
                <Ionicons name="notifications-outline" size={24} />
            </View>

            {/* Phần Địa chỉ giao hàng */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
                <TouchableOpacity style={styles.changeButton} onPress={() => navigation.navigate('address')}>
                    <Text style={styles.changeText}>Thay đổi</Text>
                </TouchableOpacity>
                <View style={styles.address}>
                    <Ionicons name="location-outline" size={18} />
                    <Text style={styles.addressText}>Nhà riêng</Text>
                </View>
                <Text style={styles.addressDetail}>925 S Chugach St #APT 10, Alaska 99645</Text>
            </View>

            {/* Phần Phương thức thanh toán */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
                <View style={styles.paymentMethods}>
                    <TouchableOpacity
                        style={[
                            styles.paymentMethod,
                            selectedPaymentMethod === 'Thẻ' && styles.selectedPaymentMethod
                        ]}
                        onPress={() => navigation.navigate('paymentMethod')}
                    >
                        <Ionicons name="card-outline" size={18} />
                        <Text style={styles.paymentText}>Thẻ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentMethod,
                            selectedPaymentMethod === 'Tiền mặt' && styles.selectedPaymentMethod
                        ]}
                        onPress={() => setSelectedPaymentMethod('Tiền mặt')}
                    >
                        <Ionicons name="cash-outline" size={18} />
                        <Text style={styles.paymentText}>Tiền mặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.paymentMethod,
                            selectedPaymentMethod === 'Apple Pay' && styles.selectedPaymentMethod
                        ]}
                        onPress={() => setSelectedPaymentMethod('Apple Pay')}
                    >
                        <Ionicons name="logo-apple" size={18} />
                        <Text style={styles.paymentText}>Apple Pay</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardInfo}>
                    <Text>VISA **** **** **** 2512</Text>
                    <Ionicons name="pencil-outline" size={18} />
                </View>
            </View>

            {/* Phần Tóm tắt đơn hàng */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Tổng tiền hàng</Text>
                    <Text style={styles.orderValue}>${subTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>VAT (%)</Text>
                    <Text style={styles.orderValue}>${vat.toFixed(2)}</Text>
                </View>
                <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Phí giao hàng</Text>
                    <Text style={styles.orderValue}>${shippingFee.toFixed(2)}</Text>
                </View>
                <View style={[styles.orderRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Tổng cộng</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
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
                    <TouchableOpacity style={styles.addButton} onPress={handleApplyPromoCode} disabled={promoApplied}>
                        <Text style={styles.addButtonText}>{promoApplied ? 'Đã áp dụng' : 'Thêm'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nút Đặt hàng */}
            <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                <Text style={styles.placeOrderText}>Đặt hàng</Text>
            </TouchableOpacity>

            {/* Modal Thông báo Thành công */}
            <Modal transparent={true} visible={isSuccessModalVisible} animationType="fade">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Ionicons name="checkmark-circle" size={64} color="green" />
                        <Text style={styles.modalTitle}>Thành công!</Text>
                        <Text style={styles.modalMessage}>Bạn đã đặt hàng thành công.</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setSuccessModalVisible(false);
                                navigation.navigate('index'); // Chuyển đến trang theo dõi đơn hàng
                            }}
                        >
                            <Text style={styles.modalButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    changeButton: {
        position: 'absolute',
        right: 0,
    },
    changeText: {
        color: '#007bff',
    },
    address: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    addressText: {
        marginLeft: 5,
        fontWeight: 'bold',
    },
    addressDetail: {
        color: '#555',
        marginTop: 2,
    },
    paymentMethods: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    selectedPaymentMethod: {
        backgroundColor: '#f0f0f0',
        borderColor: '#000',
    },
    paymentText: {
        marginLeft: 5,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    orderLabel: {
        color: '#333',
    },
    orderValue: {
        color: '#333',
        fontWeight: 'bold',
    },
    totalRow: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    promoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    promoInput: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ddd',
    },
    addButton: {
        marginLeft: 10,
        backgroundColor: '#4caf50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    placeOrderButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    placeOrderText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 10,
    },
    modalButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Checkout;
