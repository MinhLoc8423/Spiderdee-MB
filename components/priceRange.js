import { TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import Slider from '@react-native-community/slider'
import React,{useState} from 'react'

const PriceRange = () => {
  
  const [price, setPrice] = useState(20);

    return (
      <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.title}>Price</Text>
      <View flexDirection={'row'}>
      <Text style={styles.priceText}>$0</Text>
      <Text style={styles.priceText}>${price}</Text>
      </View>
      </View>
      <View style={styles.sliderContainer}>
        
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={20}
          value={price}
          onValueChange={setPrice}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          thumbTintColor="#ffffff"
        />
        
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Apply Filter</Text>
        </TouchableOpacity>
    </View>
    );
}

export default PriceRange

const styles = StyleSheet.create({
 container: {
  width: 341,
  height: 52,
  gap: 10,
  marginTop: 40,
  marginLeft: 35,
 },
 title: {
  width: 120,
    height: 24,
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
 },
 textContainer: {
  width: 341,
  height: 22,
  flexDirection: 'row',
  justifyContent:'space-between',
 },
 priceText: {
  width: 60,
  height: 24,
  fontWeight: "400",
  fontSize: 20,
  color: '#808080'
 },
 sliderContainer:{
  marginTop: 10,
  width: 341,
  height: 24,
  border: 1,
  color: '#CCCCCC'
 },
 slider:{
  flex: 1,
 },
 button: {
  width: 341,
  height: 70,
  paddingTop: 16,
  paddingBottom: 16,
  paddingLeft: 84,
  paddingRight: 84,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  marginTop: 10,
  marginBottom: 40,
  backgroundColor: '#1A1A1A'
 },
 text:{
  width: 120,
  height: 24,
  fontWeight: "bold",
  fontSize: 20,
  lineHeight: 24,
  color: '#ffffff'},
})