import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, SafeAreaView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllOrders } from "../../../../api/order";
import { router } from "expo-router";

const MyOrder = () => {
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const navigation = useNavigation();

    const handleLeaveReview = () => {
        setIsReviewModalVisible(true);
    };

    const handleSubmitReview = () => {
        // Submit review logic
        console.log("Rating:", rating);
        console.log("Review:", reviewText);
        setIsReviewModalVisible(false);
        setRating(0);
        setReviewText("");
    };

    return (
        <SafeAreaView>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require("../../../../assets/icons/arrow-icon.png")}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
                    My Order
                </Text>
                <TouchableOpacity>
                    <Image
                        source={require("../../../../assets/icons/bell-icon.png")}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Orders and review button */}
            <ScrollView>
                <View style={styles.card}>
                    <View style={styles.leftContainer}>
                        <Image
                            source={require("../../../../assets/images/table-image.jpg")}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>Order ID:</Text>
                        <Text style={styles.size}>Size L</Text>
                        <Text style={styles.size}>Address</Text>
                        <Text style={styles.price}>Prices: $</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleLeaveReview}>
                            <Text style={styles.buttonText}>Leave Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Review Modal */}
            <Modal
                visible={isReviewModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsReviewModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Leave a Review</Text>
                        <Text style={styles.modalSubtitle}>How was your order?</Text>
                        
                        {/* Star Rating */}
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={30}
                                        color="#FFA500"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Review Text Input */}
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Write your review..."
                            value={reviewText}
                            onChangeText={setReviewText}
                        />

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  header: {
      marginEnd: 20,
      marginStart: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 38,
      paddingBottom: 23,
  },
  card: {
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
  },
  leftContainer: {
      justifyContent: 'center',
  },
  image: {
      width: 70,
      height: 70,
      borderRadius: 5,
  },
  middleContainer: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: 'center',
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  size: {
      color: '#666',
      marginVertical: 5,
  },
  price: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  rightContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
  },
  button: {
      backgroundColor: '#000',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 5,
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  modalSubtitle: {
      fontSize: 16,
      marginTop: 10,
      color: '#555',
      textAlign: 'center',
  },
  starsContainer: {
      flexDirection: 'row',
      marginTop: 10,
  },
  reviewInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      width: '100%',
      height: 100,
      padding: 10,
      marginTop: 10,
      textAlignVertical: 'top',
  },
  submitButton: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
  },
  submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});

export default MyOrder;
