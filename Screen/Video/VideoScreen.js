import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet,ActivityIndicator,Text } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';


const VideoScreen = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const webview = useRef();
  const [isLoading,setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("https://maadsene.com/videos-maadsene-mobile");


  const handleToggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  if (error) {
    return (
      <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => {setError(false); setUrl("https://maadsene.com/videos-maadsene-mobile"); }} style={{ alignSelf: 'center', backgroundColor: 'orange', padding: 8, paddingLeft: 35, paddingRight: 35, borderRadius: 50 }}>

          <Text style={{ color: "white" }}><Ionicons size={20} name="ios-refresh-sharp" color="white" /> Actualiser</Text>
        </TouchableOpacity></View>)
  }

  return (


      <View style={{ flex: 1 ,backgroundColor:'white'}}>
  
        <WebView
          ref={webview}
          style={{ flex: 1 }}
          onLoad={()=>{setIsLoading(false)}}
          source={{ uri: url }}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadProgress={()=>{setIsLoading(true)}}
          allowUniversalAccessFromFileURLs={true}
          onError={()=>{setError(true); setIsLoading(false); setUrl("");}}
        />
              {isLoading?
          <View style={styles.ActivityIndicatorStyle}>
            <ActivityIndicator size={60} color='#5a104ef2' />
          </View>:null
  
        }
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenButton: {
    flex: 1,
    alignSelf: 'stretch',
  },
  thumbnail: {
    flex: 1,
    backgroundColor: 'grey',
  },
  video: {
    flex: 1,
  },
});

export default VideoScreen;
