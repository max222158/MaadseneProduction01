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
        allowUniversalAccessFromFileURLs={true}
      />
            {isLoading?
        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator size={40} color='#5a104ef2' />
        </View>:null

      }
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({})