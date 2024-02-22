import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import WebView from 'react-native-webview';

const FullscreenVideo = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const webview = useRef();
  const [isLoading,setIsLoading] = useState(true);

  const handleToggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

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

export default FullscreenVideo;
