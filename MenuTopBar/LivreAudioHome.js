import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToList,removeToList, setFavorite  } from '../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import BookItem3 from '../Component_items/BookItem3';
import { useEffect } from 'react';
import fetchWithTimeout from '../utils/fetchWithTimeOut';
import LoaderComponent from '../Components/LoaderComponent';
const widthWindow = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');
const numColumns = 3;
export default function LivreAudioHome({route, navigation}) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  let favorite = useSelector((state)=> state.favorite.favorite);

  //alert(nom)
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [nber_item,setNum_item] = useState(3);
  const [error,setError] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const isExist = (movie) => {
        
    if(favorite.filter(item => item.id === movie.id).length > 0){
      return true
    }

    return false
  }
  

  useEffect(() => {
    setImageWidth((width - 20) / numColumns);
  }, [width]);


  const onTapAddTolist = (movie) => {
    console.log(favorite);

    if(favorite.filter(item => item.support === movie.support).length>=30){
/*       let newState = favorite.filter(item => item.support !== 'Livre');
      console.log(favorite.filter(item => item.support !== 'Livre').length);
      // Retirer le dernier élément du tableau filtré
      newState.pop(); */

// Trouver l'index du dernier élément avec support "Livre"
      //const indexToRemove = favorite.map(item => item.support).lastIndexOf("Livre");
      let lastIndex = null;

      // Parcours du tableau en commençant par la fin
      for (let i = favorite.length - 1; i >= 0; i--) {
          // Vérification si le support est "Livre"
          if (favorite[i].support === movie.support) {
              // Si c'est le cas, on sauvegarde l'index et on arrête la boucle
              lastIndex = i;
              break;
          }
      }
      //favorite.splice(lastIndex, 1);
      favorite = favorite.filter((item, i) => i !== lastIndex);

      // Affichage de l'index du dernier élément avec support "Livre"
      console.log("L'index du dernier élément avec support 'Livre' est :", lastIndex);
      //alert("--last== "+lastIndex + '--'+favorite.length);

      dispatch(setFavorite(favorite));

      

      // Supprimer l'élément correspondant à cet index s'il existe
/*       if (indexToRemove !== -1) {
          favorite.splice(indexToRemove, 1);
      }
 */
    
     // alert(favorite.filter(item => item.support === movie.support).length);
      //dispatch(setFavorite(favoris_filtres));
      //console.log(newState);


    }



    dispatch(addToList(movie));
    //console.log("list favorite",favorite)
  }
  const onTapRemoveTolist = (movie) => {

    dispatch(removeToList(movie));
    //console.log("list favorite",favorite)
  }

  const getBooksAudio = async () =>{
    //let userToken = userData.token;
    setIsLoading(true);
    setError(false);
    let url =
    'https://mobile.maadsene.com/api/auth/getBooksAudio';

    try {
      
      await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          // "Content-Type": "application/json",
          Authorization: 'Bearer ' + userDataSelect.token,
        },
        timeout:15000
      })
        .then(response => response.json())
        .then(data => {
          //console.log('Audiooooooooooooooooooooooooooooooooooooooooooo', data.books);
          setItem(data.books);
          setIsLoading(false);
          //alert(data);
        });
    } catch (e) {

        
        setError(true);
        setIsLoading(false);
        //actions.logout();

    }

}

  React.useEffect(() => {

    getBooksAudio();
  }, []);

  useLayoutEffect(()=>{
    if(widthWindow>=510 && widthWindow<=700){

      //alert("llllllllll");

      setNum_item(3);
      //alert(nber_item);
    }

    if(widthWindow>=685){

      //alert("llllllllll");

      setNum_item(4);
      //alert(nber_item);
    }


  },[]);

  if(isLoading){

    return(

      <LoaderComponent/>

      );

  }

  return (
    <View style={styles.bg}>
      <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  paddingLeft: 13,
                  marginTop:15,
                  paddingBottom:5,
                  letterSpacing: 0.5,
                  fontFamily:'AlfaSlabOne-Regular'
                }}>
                Selection de livres audios

              </Text>

                  {error?
                      <TouchableOpacity onPress={()=>{getBooksAudio()}} style={{marginBottom:20,alignSelf:'center',backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:50,marginTop:20}}>
                        
                        <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>
                      </TouchableOpacity>:null}

        <FlatList
          columnWrapperStyle={{flex: 1}}
          data={item}
          keyExtractor={item => item.id.toString()}
          style={{paddingBottom:1000}}
          renderItem={({item}) => (
            <View style={{ width: imageWidth, marginBottom: 20,borderRadius:15 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate( 'DetailsBookAudio', {
                      item:item
                    });


            

                  }}>
                    <View>

                    <ImageBackground
                  borderRadius={10}
                  source={{ uri:  item.image }}
                  resizeMode='cover'
                  style={{ width: imageWidth-5, marginTop: 15,aspectRatio: 1 / 1.5, backgroundColor: '#007bff1c',borderRadius:15 }}
                >
                  <View style={{flexWrap: 'wrap'}}>
                  <Text style={{alignSelf: 'flex-start',backgroundColor:"red",color:"white",margin:3,fontSize:11,borderRadius:5,paddingLeft:3,paddingRight:3}}>Livre audio</Text>
                </View>
                  {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}
                
                </ImageBackground>
                        <Text numberOfLines={1} style={styles.text1}>
                          {item.titre}
                        </Text>
                        <Text style={styles.text2} numberOfLines={1}>
                          {item.auteur}
                        </Text>
                    </View>
        
                </TouchableOpacity>

              {isExist(item) ?
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}}
                    onPress={() => onTapRemoveTolist(item)}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={28}
                      color="#60103b"
                    />
                    
                  </TouchableOpacity>:
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}} 
                    onPress={() => onTapAddTolist(item)}
                  >
                  <Ionicons
                    name="ios-bookmark-outline"
                    size={28}
                    color="black"
                  />
                </TouchableOpacity>
              }
            </View>
          )}
          numColumns={numColumns}

        />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center'
  },
  textCateg: {
    fontSize: 30,
    marginLeft: 19,
    marginTop: 18,
    marginBottom: 20,
  },
  ScrollViewcateg: {
    marginTop: 10,
    paddingBottom:40

  },
  text1: {fontWeight: "500",fontSize:14,letterSpacing: 1},
  text2: {paddingTop: 4,fontFamily: "Arial",fontSize:12,color:"#868995",letterSpacing: 1},
});



 