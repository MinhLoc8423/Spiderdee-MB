import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodScreen = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const navigation = useNavigation();

    const savedCards = [
        { id: 1, type: 'Visa', number: '**** **** **** 2512', isDefault: true },
        { id: 2, type: 'MasterCard', number: '**** **** **** 5421', isDefault: false },
        { id: 3, type: 'Visa', number: '**** **** **** 2512', isDefault: false },
    ];

    const handleCardSelect = (id) => {
        setSelectedCard(id);
    };

    const handleApply = () => {
        if (selectedCard !== null) {
            Alert.alert('Thành công', 'Phương thức thanh toán đã được chọn');
        } else {
            Alert.alert('Thông báo', 'Vui lòng chọn một thẻ thanh toán');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Phương Thức Thanh Toán</Text>
                    <Ionicons name="notifications-outline" size={24} />
                </View>

                {/* Danh sách thẻ đã lưu */}
                <Text style={styles.sectionTitle}>Thẻ Đã Lưu</Text>
                {savedCards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        style={[styles.cardContainer, selectedCard === card.id && styles.selectedCard]}
                        onPress={() => handleCardSelect(card.id)}
                    >
                        <View style={styles.cardInfo}>
                            <FontAwesome
                                name={card.type === 'Visa' ? 'cc-visa' : 'cc-mastercard'}
                                size={24}
                                color="#000"
                            />
                            <Text style={styles.cardText}>{card.number}</Text>
                            {card.isDefault && <Text style={styles.defaultText}>Mặc định</Text>}
                        </View>
                        <Ionicons
                            name={selectedCard === card.id ? 'radio-button-on' : 'radio-button-off'}
                            size={24}
                            color={selectedCard === card.id ? '#000' : '#ddd'}
                        />
                    </TouchableOpacity>
                ))}

                {/* Nút thêm thẻ mới */}
                <TouchableOpacity style={styles.addCardButton} onPress={() => navigation.navigate('NewCard')}>
                    <Ionicons name="add-circle-outline" size={24} color="#000" />
                    <Text style={styles.addCardText}>Thêm Thẻ Mới</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Nút Áp Dụng */}
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Áp Dụng</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 10 },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedCard: { borderColor: '#000' },
    cardInfo: { flexDirection: 'row', alignItems: 'center' },
    cardText: { fontSize: 16, marginLeft: 10 },
    defaultText: { fontSize: 12, color: '#666', marginLeft: 10, fontStyle: 'italic' },
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginTop: 10,
    },
    addCardText: { fontSize: 16, color: '#000', marginLeft: 10 },
    applyButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    applyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PaymentMethodScreen;
