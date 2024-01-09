import { StyleSheet, Text, View,TouchableOpacity,Image,Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const ItemHorizontalImageText = ({item,heightRatio,route}) => {

    const navigation = useNavigation();
  return (
    <View style={{ margin: 1, borderTopWidth: 0.5, borderTopColor: '#cbdcf7' }}>
    <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
            navigation.navigate(route, {
                item:item
            });
          }}>


        <Image source={{ uri: item.image  }} style={{ width: width < 600 ? 140 : 160, aspectRatio: 1 / heightRatio,backgroundColor:'#eef4f8' }} />
        {item.free == 1?
                                      <View style={{flexWrap: 'wrap',position:'absolute'}}>
                                      <Text style={{alignSelf: 'flex-start',backgroundColor:"white",color:"#60103b",fontFamily:'Poppins-Bold', margin:3,fontSize:11,borderRadius:5,paddingLeft:5,paddingRight:5,paddingTop:2}}>Gratuit</Text>
                                    </View>:null

                }
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