
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Paypal from '../Screen/Subscription/Paypal';
import Paydunya from '../Screen/Subscription/Paydunya';
import { SafeAreaView,  Button, Text, TouchableOpacity, View, ScrollView, StatusBar, FlatList, Pressable, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import Payment from '../Screen/Subscription/Payment';
const Stack = createNativeStackNavigator();

const SubscriptionNavigation = () => {



  return (
    

      <SafeAreaView style={{ flex: 1 }}>

        <StatusBar backgroundColor="white" barStyle='dark-content' />
    
        <Stack.Navigator>
          <Stack.Screen
              name="MainPayment"
              component={Payment}
              options={{
                title: "",
    
                headerStyle: {
                  backgroundColor: '#ffff',
                }, 
                headerShown:false
              }}
            
          />
          <Stack.Screen
            name="Paypal"
            component={Paypal}
            options={{
              title: "",
  
              headerStyle: {
                backgroundColor: '#ffff',
              }, 
              headerShown:false
            }}
           
          />
          <Stack.Screen name="Paydunya" options={{
            title: "",

            headerStyle: {
              backgroundColor: '#ffff',
            },
            headerShown:false 
          }} component={Paydunya}



          />

        </Stack.Navigator>
      </SafeAreaView>

  );


};


export default SubscriptionNavigation;