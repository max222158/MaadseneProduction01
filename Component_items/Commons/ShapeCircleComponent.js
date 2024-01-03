import { ImageBackground, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShapeCircleComponent= ({height,borderRadius,width,onPress,color,iconName}) => {
  return (

    <TouchableOpacity onPress={onPress}>

      <View  style={{ justifyContent:"center", alignItems:"center", backgroundColor:color, height:height,width:width,borderRadius:borderRadius,borderWidth:2,marginRight:15 }}>
      <Ionicons name={iconName} size={18}   />

      </View>
    </TouchableOpacity>
  
  )
}

export default ShapeCircleComponent

const styles = StyleSheet.create({})