import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 38,
            paddingBottom: 23,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../../../assets/icons/arrow-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontFamily: "GeneralSemibold" }}>
            Reviews
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../../../assets/icons/bell-icon.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      {/* Phần hiển thị điểm đánh giá trung bình */}
      <View style={styles.header}>
        <Text style={styles.ratingText}>4.0</Text>
        <View style={{left:10}}>
        <View style={styles.starsRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.star}>★</Text>
          <Text style={styles.starEmpty}>★</Text>
        </View>
          <Text style={styles.totalRatings}>1034 Ratings</Text>
        </View>
        
      </View>

      {/* Phần biểu đồ sao */}
      <View style={styles.breakdownContainer}>
        {[
          { stars: 5, percentage: '60%' },
          { stars: 4, percentage: '30%' },
          { stars: 3, percentage: '5%' },
          { stars: 2, percentage: '3%' },
          { stars: 1, percentage: '2%' },
        ].map((item) => (
          <View key={item.stars} style={styles.breakdownRow}>
            <Text>{item.stars} stars</Text>
            <View style={styles.bar}>
              <View style={[styles.fillBar, { width: item.percentage }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Danh sách các đánh giá */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>45 Reviews</Text>

        <View style={styles.review}>
          <View style={styles.starsRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
          </View>
          <Text style={styles.reviewText}>
            The item is very good, my son likes it very much and plays every day.
          </Text>
          <Text style={styles.authorText}>Wade Warren • 6 days ago</Text>
        </View>

        <View style={styles.review}>
          <View style={styles.starsRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.starEmpty}>★</Text>
          </View>
          <Text style={styles.reviewText}>
            The seller is very fast in sending packet, I just bought it and the item arrived in just 1 day!
          </Text>
          <Text style={styles.authorText}>Guy Hawkins • 1 week ago</Text>
        </View>

        <View style={styles.review}>
          <View style={styles.starsRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.star}>★</Text>
            <Text style={styles.starEmpty}>★</Text>
          </View>
          <Text style={styles.reviewText}>
            I just bought it and the stuff is really good! I highly recommend it!
          </Text>
          <Text style={styles.authorText}>Robert Fox • 2 weeks ago</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "white", paddingHorizontal: 24
  },
  header: {
    marginBottom: 20,
    flexDirection:'row'
  },
  ratingText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  
  star: {
    fontSize: 30,
    color: '#FFD700',
  },
  starEmpty: {
    fontSize: 30,
    color: '#E0E0E0',
  },
  totalRatings: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  breakdownContainer: {
    marginVertical: 5,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
  fillBar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  reviewsContainer: {
    flex: 1,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  review: {
    marginBottom: 20,
  },
  reviewText: {
    fontSize: 16,
    marginTop: 4,
  },
  authorText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default App;