
import * as React from 'react';
import  { useEffect, useState } from 'react';
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,  Keyboard,StyleSheet,FlatList  } from 'react-native';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import BookItem3 from '../Component_items/BookItem3';

const DocumentHome = ({ navigation }) => {
 

 const [books, setBooks] = useState([]);
 const [booksAudio, setBooksAudio] = useState([]);
 const [booksVideo, setBooksVideo] = useState([]);
 const [isLoading, setIsLoading] = useState(true);


   

    useEffect(()=>{
        alert('home');

    },[])

    return(
        <View style={{backgroundColor:'white',flex:1}}>
            <Text>DocumentHome</Text>
        </View>

    );




}
export default DocumentHome;

