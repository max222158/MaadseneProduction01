import * as React from 'react';
import { Text, View , StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import  { useState,useRef } from "react";

const LoginModal = () => {
  // Needed in order to use .show()
  const bottomSheet = useRef();
  return (
    <SafeAreaView >
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>
        <View>
          <Text style={{fontWeight:"bold",fontSize:18}}>Se connecter</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
export default LoginModal;
