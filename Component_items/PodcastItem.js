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
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export function PodcastItem({item}) {

        return (
            <View style={styles.mainView}>
            {/* Première vue superposée */}
            <View style={styles.overlayView}></View>
            {/* Deuxième vue superposée */}
            <View style={styles.overlayView}></View>
            <View style={{height:200}}>

            <ImageBackground source={{uri:item.image}} resizeMode="cover" 
            imageStyle={{ borderRadius: 10}} style={{ flex: 1,borderRadius:20 }}>
                    </ImageBackground>
            </View>
            <Text numberOfLines={1} style={styles.text1}>{item.title}</Text>
                        <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
          </View>
        );
   
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1: {fontWeight: "500",fontSize:15,letterSpacing: 1},
    text2: {paddingTop: 4,fontFamily: "Arial",fontSize:14,color:"#868995",letterSpacing: 1},
});