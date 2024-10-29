import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView, Alert, Modal, FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NewAddressScreen = () => {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isNicknameModalVisible, setNicknameModalVisible] = useState(false);

    const handleAddAddress = () => {
        if (!nickname || !fullAddress) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        // Hiển thị modal thông báo thành công
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        navigation.navigate('address');
    };

    const handleNicknameSelect = (selectedNickname) => {
        setNickname(selectedNickname);
        setNicknameModalVisible(false); // Đóng modal sau khi chọn
    };

    const nicknameOptions = ["Nhà riêng", "Văn phòng", "Căn hộ", "Nhà bố mẹ"];

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Tiêu đề */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Thêm địa chỉ mới</Text>
                    <Ionicons name="notifications-outline" size={24} />
                </View>

                {/* Bản đồ giả lập */}
                <View style={styles.mapPlaceholder}>
                    <Ionicons name="location-outline" size={64} color="#000" />
                </View>

                {/* Form Thêm Địa Chỉ */}
                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>Địa chỉ</Text>

                    {/* Biệt danh Địa chỉ */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Biệt danh Địa chỉ</Text>
                        <TouchableOpacity 
                            style={styles.dropdown} 
                            onPress={() => setNicknameModalVisible(true)}
                        >
                            <Text style={styles.dropdownText}>{nickname || "Chọn một"}</Text>
                            <Ionicons name="chevron-down" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Địa chỉ đầy đủ */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Địa chỉ đầy đủ</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập địa chỉ đầy đủ..."
                            value={fullAddress}
                            onChangeText={setFullAddress}
                        />
                    </View>

                    {/* Đặt làm địa chỉ mặc định */}
                    <View style={styles.defaultContainer}>
                        <Text style={styles.defaultText}>Đặt làm địa chỉ mặc định</Text>
                        <Switch
                            value={isDefault}
                            onValueChange={setIsDefault}
                        />
                    </View>

                    {/* Nút Thêm */}
                    <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
                        <Text style={styles.addButtonText}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal Thông Báo Thành Công */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Ionicons name="checkmark-circle" size={64} color="green" />
                        <Text style={styles.modalTitle}>Chúc mừng!</Text>
                        <Text style={styles.modalMessage}>Địa chỉ mới của bạn đã được thêm.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                            <Text style={styles.modalButtonText}>Cảm ơn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal Chọn Biệt Danh */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isNicknameModalVisible}
                onRequestClose={() => setNicknameModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.nicknameModalContainer}>
                        <Text style={styles.modalTitle}>Chọn biệt danh</Text>
                        <FlatList
                            data={nicknameOptions}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.nicknameOption}
                                    onPress={() => handleNicknameSelect(item)}
                                >
                                    <Text style={styles.nicknameText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setNicknameModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold' },
    mapPlaceholder: { height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
    formContainer: { padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#fff' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    inputContainer: { marginBottom: 15 },
    label: { fontSize: 14, color: '#333', marginBottom: 5 },
    dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
    dropdownText: { fontSize: 14, color: '#333' },
    input: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8 },
    defaultContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
    defaultText: { fontSize: 14, color: '#333' },
    addButton: { backgroundColor: '#000', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
    addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    modalMessage: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20 },
    modalButton: { backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
    modalButtonText: { color: '#fff', fontSize: 16 },
    nicknameModalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
    nicknameOption: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    nicknameText: { fontSize: 16, color: '#333' }
});

export default NewAddressScreen;
