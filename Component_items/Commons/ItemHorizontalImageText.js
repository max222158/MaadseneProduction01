import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ItemHorizontalImageText = ({item,heightRatio}) => {

    const navigation = useNavigation();
  return (
    <View style={{ margin: 1, borderTopWidth: 0.5, borderTopColor: '#bbb' }}>
    <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
            navigation.navigate('SingleAudioDetails', {
                'data': item
            })
        }}>


        <Image source={{ uri: item.image  }} style={{ width: width < 600 ? 140 : 160, aspectRatio: 1 / heightRatio }} />
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 , marginTop:10}}>
            <Text style={{ fontSize: 14, fontFamily: 'Poppins-Bold', }} numberOfLines={2}>{item.titre || item.name}</Text>
            <Text style={{ fontSize: 13,fontFamily:'Poppins',color:'black' }} numberOfLines={1}>{item.artist || item.auteur}</Text>
            <Text style={{ fontSize: 13 }} numberOfLines={5}>{item.description || item.resume}</Text>
            <View style={{ flexDirection: 'row' }}>


            </View>

        </View>


    </TouchableOpacity>



</View>
  )
}

export default ItemHorizontalImageText

const styles = StyleSheet.create({})