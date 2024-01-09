import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setIsRegister } from '../../features/user/authSlice';
import { saveRegistration } from '../../features/subcription/subscriptionSlice';

 
const Paydunya = ({navigation}) => {

  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(true);
  const is_register = useSelector((state)=> state.userAuth.is_register);
  const isSubscription = useSelector(state => state.billing.isRegister);
  const userDataSelect = useSelector(state => state.userAuth.userDetails);

  React.useEffect(()=>{

    console.log("register = = = = ",userDataSelect.user.id);

  },[])

  const returnToApp = () =>{
    //alert("dial");

    //dispatch(setIsRegister(true));
    dispatch(saveRegistration(true));

    navigation.navigate('Main');
  }

  

  return (

    <SafeAreaView style={{flex:1}}>


      
      <WebView source={{ uri: 'https://maadsene.com/paiement/mobile/api-paytech?iduser='+ userDataSelect.user.id}} style={{backgroundColor:'#ffff'}} 
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

export default Paydunya

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