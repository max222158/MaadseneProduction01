import * as React from 'react';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import styles from '../style/styleComponentLogin';
import { NavigationContainer } from '@react-navigation/native';
import {  KeyboardAvoidingView,  Platform, TouchableWithoutFeedback,  Keyboard,StyleSheet  } from 'react-native';
import AuthNavigation from '../Navigation/AuthNavigation'
import MainNavigation from '../Navigation/MainNavigation'
import { useSelector } from 'react-redux';


const IndexScreen = () => {

const userData = useSelector((state)=> state.userAuth.userDetails)
console.log("user data index screen ",userData)

    return (
        <NavigationContainer>
        
            {//userData.credential == "valide" ?
                 //<MainNavigation /> :
                  <AuthNavigation />
            }
        </NavigationContainer>

    );

  
};

export default IndexScreen;
