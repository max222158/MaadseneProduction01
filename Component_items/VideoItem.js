import React, { Component } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground
} from "react-native";

export function VideoItem({item}) {

        return (
            <View>
            <View style={{  width: 150, marginLeft: 8 ,marginRight:5,backgroundColor: '#eef4f8',borderRadius:15 }}>
                <View style={{ flex: 2,width: 150,height:150,backgroundColor: '#eef4f8',borderRadius:15 }}>
                    
                    <ImageBackground source={{uri:item.image}} resizeMode="cover" imageStyle={{borderRadius:20}} style={{ flex: 1, width: null, height: '100%' }}>
                        <View style={{backgroundColor:"white",width:35,height:35,padding:5,justifyContent:"center",alignItems:"center",borderRadius:50,marginTop:10,marginLeft:10}}>
                            <Ionicons name="md-play" size={18} color="black"  />
                        </View>
                    </ImageBackground>
                </View>

            </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10,width: 130 }}>
                    <Text numberOfLines={1} style={{fontWeight:'500',fontSize: 15,letterSpacing:1}}>{item.titre}</Text>
                    <Text numberOfLines={1} style={{fontSize: 17, color: 'gray'}}>{item.auteur}</Text>
                   
                </View>
            </View>
        );
   
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});