import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, } from 'react-native';
import { WebView } from 'react-native-webview';
import LoaderComponent from '../LoaderComponent';

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

      
      <LoaderComponent />
      );
  }
  return(

    <WebView source={{ uri: 'http://futurepress.github.io/epub.js/examples/swipe.html' }} />

    /* <WebView source={{ uri: 'http://maadsene.com/lecture-epub?link=dial' }} /> */
  );
}