import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReadButtonComponent = ({ color, width, colorText, isLoading, onPress, iconName, textButton, height }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: color, marginTop: 15, marginBottom: 15, width: width, alignItems: 'center', padding: 0, justifyContent: 'center', borderRadius: 10, height: height || 50 }}
      onPress={onPress}
      disabled={isLoading ? true : false}
    >
      {isLoading ?
        <ActivityIndicator size={30} color="white" /> :
        <View style={{flexDirection:'row',alignItems:'center'}}><Ionicons name={iconName} size={30} color={colorText} ></Ionicons>
          <Text style={{ color: colorText, fontWeight: "bold",marginLeft:10, fontSize: 18, alignItems: "center", justifyContent: "center" }}>{textButton} </Text>

        </View>

      }




    </TouchableOpacity>
  )
}

export default ReadButtonComponent

const styles = StyleSheet.create({})