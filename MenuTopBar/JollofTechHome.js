
import * as React from 'react';
import  { useEffect, useState } from 'react';
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,  Keyboard,StyleSheet,FlatList  } from 'react-native';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { VideoItem } from '../Component_items/VideoItem';
import BookItem3 from '../Component_items/BookItem3';
import { useSelector,useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import {getDataDB } from '../features/user/authSlice'
import { addToList,removeToList } from '../features/favorite/favoriteSlice';

const JollofTechHome = ({ navigation }) => {
 

 const [books, setBooks] = useState([]);
 const [booksAudio, setBooksAudio] = useState([]);
 const [booksVideo, setBooksVideo] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 //const userData = useSelector((state)=> state.auth.userData)
 const userData = useSelector((state)=> state.userAuth.userDetails);
 const dispatch = useDispatch();
 const DataAppSelect = useSelector((state)=> state.userAuth.dataAppDB);
  const favorite = useSelector((state)=> state.favorite.favorite);




 return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      <ScrollView style={{backgroundColor: '#ffff'}}>
      <TouchableOpacity onPress={() => {navigation.navigate('cinema')}}>

      <View style={styles.GoProBox}>
            <ImageBackground source={require('../assets/cinema.jpg')} resizeMode='cover' style={styles.goProBgImage}>
            <View style={styles.overlayView}/>
            <Text style={styles.goProText}>Cinéma</Text>
            
            </ImageBackground>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate('kadu')}}>

          <View style={styles.GoProBox1}>
              <ImageBackground source={require('../assets/kadu.jpeg')} resizeMode='cover' style={styles.goProBgImage}>
              <View style={styles.overlayView1}/>
              <Text style={styles.goProText}>Kadu</Text>
              
              </ImageBackground>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );


}
export default JollofTechHome;


const styles = StyleSheet.create({
  GoProBox: {
          width: '95%',
          height: 200,
          margin: 15,
          backgroundColor: '#00cc00',
          borderRadius: 10,
          alignSelf: 'center',
          overflow: 'hidden'
  
      },
    GoProBox1: {
        width: '95%',
        height: 200,
        margin: 15,
        backgroundColor: '#00cc00',
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden'

    },
  goProBgImage: {
          width: '100%', height: '100%',
  
  
      },
  
      goProText: {
          textAlign: 'center',
          fontSize: 20,
          marginTop: 10,
          fontWeight: 'bold',
          padding: 10,
          color: 'white'
  
      },
  GoProButton: {
          height: 60,
          width: 200,
          backgroundColor: 'red',
          borderRadius: 15,
          alignSelf: 'center',
          justifyContent: 'center',
          top: 50
      },
  overlayView: {
          height: "100%",
          width: "100%",
          position: 'absolute',
          backgroundColor: 'rgba(0, 204, 0, 0.5)',
  
      },

      overlayView: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        backgroundColor: '#3490dc94',

    },
    overlayView1: {
      height: "100%",
      width: "100%",
      position: 'absolute',
      backgroundColor: '#611039a6',

  }
  
  })

