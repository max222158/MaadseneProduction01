
import * as React from 'react';
import {  StyleSheet  } from 'react-native';

import styles from '../style/styleComponentLogin';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import ButtonContinue from '../Components/ButtonContinue';
import SliderHome from '../Components/SliderHome';

const HomeScreen = ({ navigation }) => {
  

  return (
    <SliderHome navigation={navigation} />
    

    );
{/* <View>
    <StatusBar
        backgroundColor="#ffff"
        
        barStyle="default"
      />
<SliderHome />
<ButtonContinue /> 
 <ImageBackground source={require('../assets/login/imgpodcast.jpg')} resizeMode="contain" style={styles.image}>
 

</ImageBackground> 
</View> */}
 
};
export default HomeScreen;

const styless = StyleSheet.create({

  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  input:{
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 40,
    fontSize:18

  }
});