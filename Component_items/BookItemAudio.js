import React, { Component } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions
} from "react-native";

export function BookItemAudio({item}) {

        return (
            <View>
            <View style={{  width: 150, marginLeft: 15, borderWidth: 0.5, borderColor: '#dddddd',borderRadius: 20,backgroundColor: '#eef4f8' }}>
                <View style={{ width: 150,height:150,borderRadius: 20 }}>
                    
                    <ImageBackground source={{uri:item.image}} resizeMode="cover" imageStyle={{ borderRadius: 10}} style={{ flex: 1, width: null, height: '100%',borderRadius:20 }}>
                        <View style={{backgroundColor:"white",width:35,height:35,padding:5,justifyContent:"center",alignItems:"center",borderRadius:50,margin:7}}>
                            <Ionicons name="md-volume-high" size={17} color="black" />
                        </View>
                    </ImageBackground>
                </View>

            </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10,width: 160 }}>
                    <Text numberOfLines={1} style={styles.text1}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
                </View>
            </View>
        );
   
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1: {fontWeight: "500",fontSize:14,letterSpacing: 1},
    text2: {paddingTop: 4,fontFamily: "Arial",fontSize:12,color:"#868995",letterSpacing: 1},
});