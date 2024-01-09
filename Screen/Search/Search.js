import { StyleSheet, Text, View,TouchableOpacity,Dimensions,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TopBarNavigationSearch } from '../../Navigation/TopBarNavigationSearch'
import { SearchService } from '../../services/api/searchService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addBookSearch, addBooksAudioSearch, addBooksSearch, addPodcastSearch, deleteBooksAudioSearch, deleteBooksSearch, deletePodcastSearch, setIsLoadingState, setSearchData, setWordSearchState, } from '../../features/search/SearchSlice';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');
const Search = () => {
    const [bookSearch, setBookSearch] = useState([]);
    const [bookAudio, setBookAudio] = useState([]);
    const [podcast, setPodcast] = useState([]);
    const [wordSearch, setWordSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingState = useSelector((state) => state.search.isLoadingState);

    const dispatch = useDispatch();

    const getDataSearch = async() =>{

      setIsLoading(true);
      dispatch(deleteBooksSearch([]));
      
      dispatch(deleteBooksAudioSearch([]));
      
      dispatch(deletePodcastSearch([]));

      try{
        const data =  await SearchService.getAllSearchData(wordSearch);
      

        dispatch(addBooksSearch(data.livres));
        
        dispatch(addBooksAudioSearch(data.livresAudio));
        
        dispatch(addPodcastSearch(data.podcasts));
       
        dispatch(setWordSearchState(wordSearch));
        dispatch(setIsLoadingState(false));
      }catch(e){
        setIsLoading(false);

      }finally{

        setIsLoading(false);

      }



     
/*       console.log(data.podcasts);
      //setBookSearch(data.livres);
      setBookAudio(data.livresAudio);
      setPodcast(data.podcasts); */

    }
     useEffect(()=>{

      
      dispatch(deleteBooksSearch([]));
      
      dispatch(deleteBooksAudioSearch([]));
      
      dispatch(deletePodcastSearch([]));
  
      dispatch(setIsLoadingState(true));
  
    },[]) 
  return (
    <View style={{backgroundColor:'#ffff',flex:1}}>
        <View style={styles.inputContainer1}>
      <Ionicons name="ios-search-outline" size={24} color="#999" />
      <TextInput
        style={styles.input1}
        placeholder="Rechercher un mot clé"
        placeholderTextColor="#999"
        autoFocus={true}
        onChangeText={(value) => setWordSearch(value)}
    /*     onClear={(value) => searchFilterFunction('')} */
      />
      <TouchableOpacity 
      onPress={getDataSearch}
      style={[styles.searchBtn,{borderLeftWidth:1,borderColor:'gray',paddingLeft:5}]} >
        <Text style={[styles.searchBtnText,{color:'red'}]}>Recherche</Text>
      </TouchableOpacity>
    </View>
    {
      isLoading ?<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <LottieView  style={{width:200,height:200,}} source={require('../../assets/loading5.json')} autoPlay loop />
        <Text>Recherche en cours...</Text>
      </View>
    
   
    : isLoadingState?<View></View>:<TopBarNavigationSearch />}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    textFriends: {
      fontSize: 20,
      textAlign: 'left',
      marginLeft: 10,
      fontWeight: 'bold',
      marginTop: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
      marginTop: 10,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textName: {
      fontSize: 17,
      marginLeft: 10,
      fontWeight: "600",
    },
    textEmail: {
      fontSize: 14,
      marginLeft: 10,
      color: "grey",
    },
    header: {
      height: 80,
      width: '100%',
      backgroundColor: '#ffff',
      paddingTop: 15
  
    },
    input: {
      height: 45,
      width: '90%',
      backgroundColor: '#ffff',
      borderRadius: 20,
      padding: 5,
      paddingLeft: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      padding: 13,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.2
    },
    image: {
      height: 150,
      width: 90,
    },
    dataContainer: {
      padding: 10,
      paddingTop: 5,
      width: width - 100,
    },
    title: {
      fontSize: 15,
      color: '#5f656b',
    },
    description: {
      fontSize: 16,
      color: 'gray',
    },
    author: {
      fontSize: 16,
    },
  
    bookContainer: {
      flexDirection: 'row',
      padding: 5,
    },
    selectItem:{
      borderBottomWidth:2,
      borderBottomColor:"#611039",
      color:'blue',
      fontWeight:'700'    
  },
  
  selectItemText:{
      color:'#611039',
      fontWeight:'700'    
  }
  ,
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor:'#ffff',
    borderRadius: 10,
    padding: 0,
    marginVertical: 5,
    marginRight:10,
    marginLeft:10,
    paddingRight:10,
    paddingLeft:10,

  },
  input1: {
    flex: 1,
    padding: 10,
  
  },
  });