import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from 'react-native';
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import BookItem3 from '../../Component_items/BookItem3';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToList,removeToList } from '../../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const numColumns = 3;

export default function CategoryScreen({route, navigation}) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  const favorite = useSelector((state)=> state.favorite.favorite);

  var {id, nom} = route.params;
  //alert(nom)
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [imageWidth, setImageWidth] = React.useState(0);
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

  const getByCat = async () =>{

      //let userToken = userData.token;
      setIsLoading(true);
      setError(false);
     let url =
        'https://mobile.maadsene.com/api/auth/getBookByNameCategory?name='+nom;



      try {
        const response = await fetchWithTimeout(url, {
          method: 'GET',
          timeout:10000,
          headers: {
            Accept: 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + userDataSelect.token,

          },
        } ,{
          timeout: 15000
        }).then(response => response.json())
        .then(data => {
          
          setItem(data.book);
          setIsLoading(false);
          //alert(JSON.stringify(data));
        });;

      } catch (error) {

        setIsLoading(false);
        setError(true);
      }

  }

  useEffect(() => {
    setImageWidth((width - 20) / numColumns);
  }, [width]);

  React.useEffect(() => {

    setIsLoading(true);
    setItem([]);
    getByCat();



  }, [nom]);

  if(isLoading){

    return(

      <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
        <ActivityIndicator size={40} color="#691c43"/>
        <Text style={{fontSize:25}}>En cours...</Text>
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <TouchableOpacity style={[styles.iconContainer,{alignSelf:'flex-start',marginLeft:10}]} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.textCateg}>{nom}</Text>
      {error?
        <TouchableOpacity onPress={()=>{getByCat()}} style={{alignSelf:'center',backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:50}}>
          
          <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>

        </TouchableOpacity>:null}
        <FlatList
          columnWrapperStyle={{flex: 1}}
          data={item}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          renderItem={({item}) => (
            <View style={{ width: imageWidth, marginBottom: 20,borderRadius:15 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate( 'DetailsBook', {
                      id: item.id,
                      auteur: item.auteur,
                      image: item.image,
                      titre: item.titre,
                      categorie: item.categorie,
                      resume: item.resume,
                      book: item.epub_mobile,
                      epub: item.epub_mobile,
                      support: item.support,
                    });


            

                  }}>
                    <View>

                    <ImageBackground
                  borderRadius={10}
                  source={{ uri: 'https://maadsene.com/couverture/' + item.image }}
                  resizeMode='cover'
                  style={{ width: imageWidth-5, marginTop: 15,aspectRatio: 1 / 1.5, backgroundColor: '#007bff1c',borderRadius:15 }}
                >
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
                    onPress={() => onTapRemoveTolist({
                      id: item.id,
                      auteur: item.auteur,
                      image: item.image,
                      titre: item.titre,
                      categorie: item.categorie,
                      resume: item.resume,
                      book: item.epub_mobile,
                      epub: item.epub_mobile,
                      support: item.support,
                    })}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={28}
                      color="#60103b"
                    />
                    
                  </TouchableOpacity>:
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}} 
                    onPress={() => onTapAddTolist({
                      id: item.id,
                      auteur: item.auteur,
                      image: item.image,
                      titre: item.titre,
                      categorie: item.categorie,
                      resume: item.resume,
                      book: item.epub_mobile,
                      epub: item.epub_mobile,
                      support: item.support,
                    })}
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
    fontSize: 17,
    marginLeft: 19,
    marginTop: -5,
    marginBottom: 10,
    fontWeight:'700'
  },
  ScrollViewcateg: {
    marginTop: 10,
  },
});
