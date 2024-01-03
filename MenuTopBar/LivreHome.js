
import * as React from 'react';
import  { useEffect, useState } from 'react';
import {  KeyboardAvoidingView, Platform, TouchableWithoutFeedback,  Keyboard,StyleSheet,FlatList  } from 'react-native';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { VideoItem } from '../Component_items/VideoItem';
import BookItem3 from '../Component_items/BookItem3';
import { useSelector,useDispatch } from 'react-redux';
import { addToList,removeToList  } from '../features/favorite/favoriteSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import {getDataDB } from '../features/user/authSlice';
import NewComponent from '../Components/Home/NewsComponent'


const LivreHome = ({ navigation }) => {
 

 const [books, setBooks] = useState([]);
 const [booksAudio, setBooksAudio] = useState([]);
 const [booksVideo, setBooksVideo] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 //const userData = useSelector((state)=> state.auth.userData)
 const userData = useSelector((state)=> state.userAuth.userDetails);
 const dispatch = useDispatch();
 const bookState = useSelector((state)=> state.userAuth.book);
 const favorite = useSelector((state)=> state.favorite.favorite);
 const isExist = (movie) => {
        
  if(favorite.filter(item => item.id === movie.id).length > 0){
    return true
  }

  return false
}

const onTapAddTolist = (movie) => {

  dispatch(addToList(movie));
  //console.log("list favorite",favorite)
}
const onTapRemoveTolist = (movie) => {

  dispatch(removeToList(movie));
  //console.log("list favorite",favorite)
}
 React.useEffect(() => {


      setBooks(bookState);

 
 
 }, [bookState]);

 React.useEffect(()=>{
  LogBox.ignoreLogs(['Sending...']);

  
  },[]);
 return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      
      <ScrollView style={{backgroundColor: '#ffff'}}>
      <View style={{paddingLeft:13}}>
      <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  paddingLeft: 13,
                  marginTop:20,
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Nouveautés

              </Text>
        <NewComponent/>
        </View>
        <View style={{flex: 1, padding: 7, backgroundColor: '#ffff',paddingTop:20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 13,
                  fontWeight: "500",letterSpacing: 1,
                  fontFamily:'Poppins-Bold'
                }}>
                Livres
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              
            </View>
          </View>
          <View style={{flex: 1, marginTop: 20, height: 350}}>

            <FlatList
              data={books}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('DetailsBook', {
                          item:item
                      });
                    }}>
                    <BookItem3 item={item} />
                  </TouchableOpacity>
                  {isExist(item) ?
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}}
                    onPress={() => onTapRemoveTolist(item)}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={25}
                      color="#60103b"
                    />
                    
                  </TouchableOpacity>:
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}} 
                    onPress={() => onTapAddTolist(item)}
                  >
                  <Ionicons
                    name="ios-bookmark-outline"
                    size={25}
                    color="black"
                  />
                </TouchableOpacity>
              }
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
export default LivreHome;

