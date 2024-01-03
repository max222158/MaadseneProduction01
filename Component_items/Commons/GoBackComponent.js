import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const GoBackComponent = ({navigation,color,size}) => {
  return (
    <TouchableOpacity style={{paddingTop:10}} onPress={() => navigation.goBack()}>
    <Ionicons name="ios-arrow-back-outline" size={size} color={color} />
</TouchableOpacity>
  )
}

export default GoBackComponent

const styles = StyleSheet.create({})