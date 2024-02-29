import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
const EpisodeComponent = ({item,color}) => {
  return (
    <View style={{borderTopWidth:1,borderColor:'#eee',justifyContent:'center',paddingLeft:10,paddingBottom:10,paddingTop:10,}}>
      <Text style={{fontFamily:'Poppins',fontSize:11,color:'#6b6b6b'}}>épisode: {item.episode}</Text>
      <View style={{flexDirection:'row',alignItems:'center',marginRight:45}}>
    
      <Ionicons name="play-circle-outline" size={40} color={color} />
      <Text style={{fontFamily:'Poppins-Bold',fontSize:15,marginLeft:10}}>{item.title}</Text>
    </View>
    </View>
  )
}

export default EpisodeComponent

const styles = StyleSheet.create({})