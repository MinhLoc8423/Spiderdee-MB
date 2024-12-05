import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import "moment/locale/vi";


const ReviewsScreen = () => {
  const { id, reviews } = useLocalSearchParams();
  const parsedReviews = JSON.parse(reviews);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  moment.locale("vi");

  const caculateRatings = (start) => {
    const totalRatings = parsedReviews.length;
    const starRatings = parsedReviews.filter(
      (rating) => rating.rating === start
    ).length;
    const percentage = (starRatings / totalRatings) * 100;
    return percentage.toFixed(1);
  };

  const fetchData = async () => {
    const averageRating =
      parsedReviews.length > 0
        ? (
            parsedReviews.reduce((sum, review) => sum + review.rating, 0) /
            parsedReviews.length
          ).toFixed(1)
        : 0.0;
    setRating(averageRating);
    setReview(parsedReviews.length);
  };

  useEffect(() => {
    fetchData();
  }, [parsedReviews]);

  const RatingSummary = () => (
    <View className="py-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-6xl font-bold text-black">{rating}</Text>
        <View className="ml-3 flex-col items-start">
          <View className="flex-row space-x-[6]">
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < rating ? "star" : "star"}
                size={24}
                color={index < rating ? "#FFA928" : "#E6E6E6"}
              />
            ))}
          </View>
          <Text className="text-primary-500 text-base">Xếp hạng</Text>
        </View>
      </View>

      {[5, 4, 3, 2, 1].map((star, index) => (
        <View key={index} className="flex-row items-center my-1">
          <View className="flex-row items-center space-x-[6]">
            {[...Array(star)].map((_, i) => (
              <FontAwesome key={i} name="star" size={18} color="#FFA928" />
            ))}
            {[...Array(5 - star)].map((_, i) => (
              <FontAwesome key={i} name="star" size={18} color="#E6E6E6" />
            ))}
          </View>
          <View className="flex-1 bg-gray-300 h-2 mx-3 rounded-full overflow-hidden">
            <View
              className={`bg-black h-full`}
              style={{ width: `${caculateRatings(star)}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );

  const ReviewItem = ({ review }) => (
    <View className="py-4 border-b border-primary-100">
      <View className="flex-row items-center mb-1">
        {[...Array(5)].map((_, i) => (
          <FontAwesome
            key={i}
            name={i < review.rating ? "star" : "star-o"}
            size={16}
            color="#FFA928"
          />
        ))}
      </View>
      <Text className="text-primary-500 mb-1">{review.comment}</Text>
      <Text className="text-gray-500 font-normal">
        <Text className="font-bold text-black">
          {review.user_id.first_name}
        </Text>{" "}
        • {moment(review.createdAt).fromNow()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="px-6 flex-1 bg-white">
      <Header title="Đánh giá" />
      <View className="border-b border-primary-100"></View>
      <RatingSummary />
      <View className="border-b border-primary-100"></View>
      <FlatList
        data={parsedReviews}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ListHeaderComponent={
          <Text className="text-lg font-bold mt-4 mb-1">{review} Đánh giá</Text>
        }
      />
    </SafeAreaView>
  );
};

export default ReviewsScreen;
