import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const ImageTitleAuthorComponent = ({ imageSource, title, author,loadingPlayer }) => {
    const dim300 = 200;
  return (
    <ScrollView style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
    {
        !loadingPlayer ?
            <View style={{ width: dim300, height: dim300, marginTop: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 0, backgroundColor: '#0a3774' }}>


                <Image source={{ uri: imageSource }} style={{ width: dim300, height: dim300, alignSelf: 'center', zIndex: 99 }} />

                <Icon name="ios-musical-notes-outline" style={{ position: 'absolute' }} color="white" size={90} />
            </View> :
            <View style={{ width: dim300, height: dim300, marginTop: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 0, backgroundColor: '#0a3774' }}>



                <Icon name="ios-musical-notes-outline" style={{ position: 'absolute' }} color="white" size={90} />
            </View>
    }


    <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color:  'white', marginTop: 15,textAlign:'center' }} numberOfLines={2}>{title}</Text>

    <Text style={{ fontSize: 14, fontFamily: 'Poppins', color: 'white', marginLeft: 10,textAlign:'center' }} numberOfLines={1}>{author}</Text>









</ScrollView>
  )
}

export default ImageTitleAuthorComponent

const styles = StyleSheet.create({})