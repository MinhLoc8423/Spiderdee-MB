import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styled } from "nativewind";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants/orderConstans";

const SectionTitle = styled(Text, "text-xl font-semibold mb-2");
const StatusContainer = styled(View, "flex-row items-baseline space-x-4");
const StatusText = styled(Text, "font-medium text-lg");

const TrackOrderScreen = () => {
    const { id, item } = useLocalSearchParams();
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState();
    const parsedItem = JSON.parse(item);
    const paymentMethod = parsedItem.payment_method;

    useEffect(() => {
        setStatus(parsedItem.status);
        setProducts(parsedItem.products);
    }, []);

    const isActiveStatus = (currentStatus, targetStatus) => {
        return (
            Object.values(ORDER_STATUS).indexOf(currentStatus) >=
            Object.values(ORDER_STATUS).indexOf(targetStatus)
        );
    };

    // Lọc trạng thái dựa trên phương thức thanh toán
    const filteredOrderStatus = Object.values(ORDER_STATUS).filter((status) => {
        if (paymentMethod === PAYMENT_METHOD.CASH) {
            return status !== ORDER_STATUS.AWAITING_PAYMENT && status !== ORDER_STATUS.PAYMENT_CONFIRMED;
        }
        return true;
    });

    const renderOrderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemSize}>Size: {item.size}</Text>
                    <Text style={styles.itemSize}>Quantity: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>
                    {Number(item.price).toLocaleString()} VNĐ
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <Text
                    className={`text-xs font-medium rounded-md px-2 py-1 ${
                        status === ORDER_STATUS.DELIVERED
                            ? "text-success bg-[#E5F1E4]"
                            : item.status === ORDER_STATUS.CANCELLED
                            ? "text-danger bg-[#FAE3E3]"
                            : "text-primary-900 bg-primary-100"
                    }`}
                >
                    {status}
                </Text>
                <View style={styles.quantityContainer}>
                    {status === ORDER_STATUS.DELIVERED ? (
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: "/(root)/track-order/[id]",
                                    params: { id: item.order_id, item: JSON.stringify(item) },
                                })
                            }
                            className="bg-primary-900 rounded-lg py-2 px-4"
                        >
                            <Text className="text-white font-semibold">Đánh giá</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            disabled={status !== ORDER_STATUS.DELIVERED}
                            onPress={() =>
                                router.push({
                                    pathname: "/(root)/track-order/[id]",
                                    params: { id: item.order_id, item: JSON.stringify(item) },
                                })
                            }
                            className="bg-primary-100 rounded-lg py-2 px-4"
                        >
                            <Text className="text-primary-700 font-semibold">Đánh giá</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );

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
                    data={[
                        ...filteredOrderStatus,
                        { key: "divider" },
                        ...products,
                    ]}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
