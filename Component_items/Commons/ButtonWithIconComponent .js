import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonWithIconComponent  = ({color,width,colorText,onPress,iconName,textButton,size}) => {
  return (
    <TouchableOpacity
    style={{ backgroundColor: color, width: width, borderRadius: 10,borderWidth:1,padding:5 }}
    onPress={onPress
      
    }
>
            <Text style={{ color: colorText, fontWeight: "bold", fontSize: size, alignItems: "center", justifyContent: "center" }}><Ionicons name={iconName} size={18} color={colorText} >{textButton}</Ionicons> </Text>
    


    
    

    

</TouchableOpacity>
  )
}

export default ButtonWithIconComponent 

const styles = StyleSheet.create({})