import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

const productdetail = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/ban.jpg")}
          style={styles.Image}
        />
        <TouchableOpacity style={styles.ImageContainerHeart}>
        <Image
          style={{alignSelf:'center'}}
          source={require("../../assets/images/Heart.png")}/>
        </TouchableOpacity>
      </View>
    <Text style={styles.TextName}>Regular Fit Slogan</Text>
    <View style={styles.ImageContainerStar}
    >
        <Image
             style={styles.ImageStar}
             source={require("../../assets/images/Star.png")}
        />
        <Link href={"/(auth)/rivew"} style={{marginStart:5,fontWeight:'600'}}>
        4.0/5 (45 reviews)
        </Link>
    </View>
    <Text style={styles.TextRievew}>The name says it all, the right size slightly snugs the body leaving enough room for comfort in the sleeves and waist.</Text>
    <Text style={{fontSize:20,fontWeight:'600',color:'#1A1A1A',paddingTop:5,marginStart:10}}>Choose size</Text>
    <View style={styles.ViewSizeContaier}>
    <TouchableOpacity style={styles.TouchableOpacitySize} >
       <Text style={styles.TextSizeItem}>S</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.TouchableOpacitySize} >
       <Text style={styles.TextSizeItem}>M</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.TouchableOpacitySize} >
       <Text style={styles.TextSizeItem}>L</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.ContainerPrice}>
        <View style={styles.ViewTextPrice}>
        <Text style={{fontSize:16,fontWeight:'400',color:'#808080'}}>Price</Text>
        <Text style={{fontSize:24,fontWeight:'600',color:'#1A1A1A'}}>$1,190</Text>
        </View>
        <TouchableOpacity style={styles.TouchableOpacityAdd}>
        <Image
          style={{right:10}}
          source={require("../../assets/images/Bag.png")}/>
          <Text style={{color:'#FFFFFF'}}>Add to Cart</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default productdetail

const styles = StyleSheet.create({
container:{
    
    flex:1
},
Image:{
    width:370,
    height:370,
    
    margin:10
},
ImageContainerHeart:{
    width:40,
    height:40,
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
     borderColor:'#E6E6E6',
    backgroundColor:'#FFFFFF',
    position:'absolute',
    zIndex:1000,
    top:20,
    right:20
},
TextName:{
    fontSize:24,
    fontWeight:'600',
    color:'#1A1A1A',
    paddingTop:10,
    marginStart:10
},
ImageContainerStar:{
    marginTop:5,
    flexDirection:'row',
    marginStart:10
},
ImageStar:{
    width:15,
    height:15,
    
},
TextRievew:{
    fontSize:14,
    color:'#808080',
    fontWeight:'400',
    paddingTop:5,
    marginStart:10
},
ViewSizeContaier:{
    flexDirection:'row',
    
    
},
TouchableOpacitySize:{
    width:47,
    height:45,
    borderWidth:1,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    marginStart:7,
    //borderColor:'#FFFFFF'
    

},
TextSizeItem:{
    fontSize:20,
    fontWeight:'500',
    color:'#1A1A1A',
    textAlign:'center'
},
ContainerPrice:{
    width:'100%',
    flex:2,
    marginTop:10,
    borderWidth:1,
    borderColor:'#E6E6E6',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    
},
ViewTextPrice:{
    right:30
},
TouchableOpacityAdd:{
    width:240,
    height:54,
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'black'
}
})