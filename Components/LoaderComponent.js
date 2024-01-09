import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const LoaderComponent = (props) => {
  return (

      <View
        style={{
          flex:1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LottieView  style={{width:200,height:200,}} source={require('../assets/loading5.json')} autoPlay loop />
      </View>
  );
};

export default LoaderComponent;
