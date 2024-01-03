import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShapeImageComponent = ({height,borderRadius,width,imageSource}) => {
  return (

    <View  style={{backgroundColor:'#bbb', height:height,width:width,borderRadius:20 }}>
    
        <ImageBackground source={{uri:imageSource}} resizeMode="cover" 
                imageStyle={{ borderRadius: borderRadius}} style={{backgroundColor:'#bbb', height:height,width:width,borderRadius:20 }} >
        </ImageBackground>
        </View>
  
  )
}

export default ShapeImageComponent

const styles = StyleSheet.create({})