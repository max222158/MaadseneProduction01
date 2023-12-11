import { View, Text } from 'react-native'
import {   SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import React, { useState } from 'react';

const KaduScreen = () => {

    const [isLoading,setIsLoading] = useState(true);
  return (
    <SafeAreaView style={{flex:1}}>


      
      <WebView source={{ uri: 'https://maadsene.com/mobile/kadu' }} style={{backgroundColor:'#ffff'}} 

        onLoad={()=>{setIsLoading(false)}}
        onLoadStart={()=>{}}
        domStorageEnabled={true}
      />

      {isLoading?
        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator size={40} color='#5a104ef2' />
        </View>:null

      }



  </SafeAreaView>
  )
}

export default KaduScreen;

const styles = StyleSheet.create({


    ActivityIndicatorStyle:{
  
      flex:1,
      position:'absolute',
      margin:'auto',
      left:0,
      right:0,
      top:0,
      bottom:0,
      justifyContent:'center'
    }
  })