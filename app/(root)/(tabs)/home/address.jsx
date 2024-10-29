import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
    const navigation = useNavigation();
    const [selectedAddress, setSelectedAddress] = useState('Nhà riêng');

    const addresses = [
        { id: '1', label: 'Nhà riêng', address: '925 S Chugach St #APT 10, Alaska 99645', isDefault: true },
        { id: '2', label: 'Văn phòng', address: '2438 6th Ave, Ketchikan, Alaska 99901' },
        { id: '3', label: 'Căn hộ', address: '2551 Vista Dr #B301, Juneau, Alaska 99801' },
        { id: '4', label: 'Nhà bố mẹ', address: '4821 Ridge Top Cir, Anchorage, Alaska 99508' },
    ];

    const handleSelectAddress = (label) => {
        setSelectedAddress(label);
    };

    const renderAddressItem = ({ item }) => (
        <TouchableOpacity style={styles.addressContainer} onPress={() => handleSelectAddress(item.label)}>
            <View style={styles.addressInfo}>
                <Ionicons name="location-outline" size={20} color="black" />
                <View style={styles.addressDetails}>
                    <Text style={styles.addressLabel}>
                        {item.label} {item.isDefault && <Text style={styles.defaultText}>Mặc định</Text>}
                    </Text>
                    <Text style={styles.addressText}>{item.address}</Text>
                </View>
            </View>
            <Ionicons
                name={selectedAddress === item.label ? "radio-button-on" : "radio-button-off"}
                size={20}
                color={selectedAddress === item.label ? "black" : "#ccc"}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back" size={24} />
                <Text style={styles.title}>Địa chỉ</Text>
                <Ionicons name="notifications-outline" size={24} />
            </View>

            <Text style={styles.sectionTitle}>Địa chỉ đã lưu</Text>

            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity style={styles.addNewButton} onPress={() => navigation.navigate('newaddress')}>
                <Ionicons name="add-outline" size={20} color="black" />
                <Text style={styles.addNewText}>Thêm địa chỉ mới</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyText}>Áp dụng</Text>
            </TouchableOpacity>
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
        marginBottom: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressDetails: {
        marginLeft: 10,
    },
    addressLabel: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    defaultText: {
        color: '#888',
        fontSize: 12,
        marginLeft: 5,
    },
    addressText: {
        color: '#666',
        fontSize: 12,
        marginTop: 2,
    },
    addNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
    },
    addNewText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    applyButton: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    applyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddressScreen;
