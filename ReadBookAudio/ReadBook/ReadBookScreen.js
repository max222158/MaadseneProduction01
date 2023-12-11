import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function ReadBookScreen() {

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    

  },[]);

  if(isLoading){

    return(

      <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
        <ActivityIndicator size={40} color="#691c43"/>
        <Text style={{fontSize:25}}>En cours...</Text>
      </View>
    );
  }
  return(

    <WebView source={{ uri: 'http://futurepress.github.io/epub.js/examples/swipe.html' }} />

    /* <WebView source={{ uri: 'http://maadsene.com/lecture-epub?link=dial' }} /> */
  );
}