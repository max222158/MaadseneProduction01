
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


const MagasineHome = ({ navigation }) => {
 

 const [books, setBooks] = useState([]);
 const [booksAudio, setBooksAudio] = useState([]);
 const [booksVideo, setBooksVideo] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 //const userData = useSelector((state)=> state.auth.userData)
 const userData = useSelector((state)=> state.userAuth.userDetails);
 const dispatch = useDispatch();
 const DataAppSelect = useSelector((state)=> state.userAuth.dataAppDB);

 React.useEffect(() => {


    if(DataAppSelect.livre){
      setBooks(DataAppSelect.livre);

    }
 

 }, [DataAppSelect]);

 React.useEffect(()=>{
  LogBox.ignoreLogs(['Sending...']);

  
  },[]);
 return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      <ScrollView style={{backgroundColor: '#ffff'}}>
        <View style={{flex: 1, padding: 7, backgroundColor: '#ffff',paddingTop:20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 13,
                  fontWeight: "500",letterSpacing: 1
                }}>
                Magazines
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text style={{fontSize: 17, color: 'black'}}>Plus + </Text>
            </View>
          </View>
          <View style={{flex: 1, marginTop: 20, height: 350}}>

            <FlatList
              data={books}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetailsBook', {
                        id: item.id,
                        auteur: item.auteur,
                        image: item.image,
                        titre: item.titre,
                        categorie: item.categorie,
                        resume: item.resume,
                        book: item.lien_livre,
                        support: item.support,
                      });
                    }}>
                    <BookItem3 item={item} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}}>
                    <Ionicons
                      name="ios-bookmark-outline"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              )}
              horizontal
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );


}
export default MagasineHome;

