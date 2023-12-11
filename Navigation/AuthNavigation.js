
import * as React from 'react';
import RegisterScreen from '../Screen/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen'
import HomeScreen from '../Screen/HomeScreen'
import VerificationScreen from '../Screen/OTP/VerificationScreen'
import ForgetPasswordScreen from '../Screen/ForgetPasswordScreen';
import NewPasswordScreen from '../Screen/NewPasswordScreen';
import { ActivityIndicator, StatusBar, View,Text } from 'react-native';
import ScreenPhone from '../Screen/ScreenPhone';
import VerificationEmailScreen from '../Screen/OTP/VerificationEmailScreen';
import ForgetPasswordWithEmail from '../Screen/ForgetPasswordWithEmail';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {


    return (
    
        <Stack.Navigator screenOptions={{animation:"slide_from_right"}}>
         
     
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown:false}}
          />
          <Stack.Screen name="Login" options={{title:"" ,
            headerShown:false,
            headerStyle: {
              backgroundColor: '#ffff',
              },headerShadowVisible:false
            }} component={LoginScreen} 
  
  
          
          />
          <Stack.Screen name="Register" options={{title:"Maadsene" ,headerShown:false,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={RegisterScreen} 
  
  
          
          />       
          <Stack.Screen name="Verification" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={VerificationScreen} 
  
  
          
          />
          <Stack.Screen name="VerificationEmail" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={VerificationEmailScreen} 
  
  
          
          /> 
          <Stack.Screen name="PasswordForget" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={ForgetPasswordScreen} 
  
  
          
          />

          <Stack.Screen name="PasswordForgetWithEmail" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={ForgetPasswordWithEmail} 
  
  
          
          />
          <Stack.Screen name="NewPassword" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={NewPasswordScreen} 
  
  
          
          /> 

          <Stack.Screen name="PhoneCheck" options={{title:"" ,
            
            headerStyle: {
              //backgroundColor:"#ddeeff",
              },headerShadowVisible:false,
              //headerTintColor:"#60103b",
              elevation:0
            }} component={ScreenPhone} 
  
  
          
          /> 
        </Stack.Navigator>
     
    );

  
};


export default AuthNavigation;