import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React, { useRef, useState } from 'react'
import { WebView } from 'react-native-webview';

const VideoScreen = () => {
  const webview = useRef();
  const [isLoading,setIsLoading] = useState(true);

  return (
    <View style={{ flex: 1 ,backgroundColor:'white'}}>

      <WebView
        ref={webview}
        style={{ flex: 1 }}
        onLoad={()=>{setIsLoading(false)}}
        source={{ uri: "https://maadsene.com/videos-maadsene-mobile" }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadProgress={()=>{setIsLoading(true)}}
        allowUniversalAccessFromFileURLs={true}
      />
            {isLoading?
        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator size={60} color='#5a104ef2' />
        </View>:null

      }
    </View>
  )
}

export default VideoScreen

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