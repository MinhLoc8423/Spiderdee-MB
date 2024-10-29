import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NewCardScreen = () => {
    const navigation = useNavigation();
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddCard = () => {
        if (!cardNumber || !expiryDate || !securityCode) {
            alert('Vui lòng nhập đầy đủ thông tin thẻ');
            return;
        }

        // Hiển thị modal thông báo thành công
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        navigation.goBack(); // Quay lại trang trước sau khi đóng modal
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm Thẻ Mới</Text>
                <Ionicons name="notifications-outline" size={24} />
            </View>

            <Text style={styles.sectionTitle}>Thêm Thẻ Tín Dụng hoặc Ghi Nợ</Text>

            {/* Form Nhập Thông Tin Thẻ */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Số thẻ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số thẻ của bạn"
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />
            </View>

            <View style={styles.row}>
                <View style={styles.inputContainerSmall}>
                    <Text style={styles.label}>Ngày hết hạn</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                    />
                </View>
                <View style={styles.inputContainerSmall}>
                    <Text style={styles.label}>Mã bảo mật</Text>
                    <View style={styles.securityCodeContainer}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="CVC"
                            keyboardType="numeric"
                            value={securityCode}
                            onChangeText={setSecurityCode}
                        />
                        <Ionicons name="help-circle-outline" size={20} color="#808080" style={{ marginLeft: 5 }} />
                    </View>
                </View>
            </View>

            {/* Nút Thêm Thẻ */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
                <Text style={styles.addButtonText}>Thêm Thẻ</Text>
            </TouchableOpacity>

            {/* Modal Thông Báo Thành Công */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Ionicons name="checkmark-circle" size={64} color="green" />
                        <Text style={styles.modalTitle}>Thành công!</Text>
                        <Text style={styles.modalMessage}>Thẻ mới của bạn đã được thêm vào.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Thanks</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputContainerSmall: {
        flex: 1,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    securityCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
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
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    modalMessage: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default NewCardScreen;
