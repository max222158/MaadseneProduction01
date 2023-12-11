import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';



const WebHome = ({ navigation, route }) => {


  const [isLoading,setIsLoading] = React.useState(true);
  const [art,setArt] = React.useState([]);
  const [error,setError] = React.useState(false);

    React.useEffect(()=>{
        //alert("52");
    },[])

  return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      <WebView 
          source={{uri:"https://readium.maadsene.com/reader/index.html"}}
          onLoadEnd={()=>{console.log("dial end webview");}}
      />

    </SafeAreaView>
  )
}

export default WebHome;

const styles = StyleSheet.create({

  
  });