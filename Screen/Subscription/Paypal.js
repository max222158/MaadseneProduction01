import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setIsRegister } from '../../features/user/authSlice';

const Paypal = ({navigation}) => {

  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(true);
  const is_register = useSelector((state)=> state.userAuth.is_register);
  React.useEffect(()=>{

    console.log("register = = = = ",is_register);

  },[])

  const returnToApp = () =>{
    //alert("dial");

    dispatch(setIsRegister(true));

    navigation.navigate('Main');
  }

  

  return (

    <SafeAreaView style={{flex:1}}>


      
      <WebView source={{ uri: 'https://maadsene.com/paypal' }} style={{backgroundColor:'#ffff'}} 
        onMessage={event => {
          const { data } = event.nativeEvent;
          
          returnToApp();
        }}
        onLoad={()=>{setIsLoading(false)}}
        onLoadStart={()=>{}}
        domStorageEnabled={true}
      />

      {isLoading?
        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator size={40} color='#5a104ef2' />
        </View>:null

      }



  </SafeAreaView>


  )
}

export default Paypal

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