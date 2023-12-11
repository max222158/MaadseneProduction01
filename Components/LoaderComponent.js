import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

const LoaderComponent = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.loading}
    >
      <View
        style={{
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

export default LoaderComponent;
