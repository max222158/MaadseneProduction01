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
import { addToList,removeToList, setFavorite } from '../../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import LoaderComponent from '../../Components/LoaderComponent';
import { URL_BASE } from '../../utils/utils';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const numColumns = 3;

export default function CategoryScreen({route, navigation}) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  let favorite = useSelector((state)=> state.favorite.favorite);

  var {id, nom} = route.params;
  //alert(nom)
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [endOfList, setEndOfList] = React.useState(false);
  const [imageWidth, setImageWidth] = React.useState(0);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const isExist = (movie) => {
        
    if(favorite.filter(item => item.id === movie.id).length > 0){
      return true
    }

    return false
  }

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

  const getByCat = async () =>{

      //let userToken = userData.token;
      setIsLoading(true);
      setError(false);
     let url =
        URL_BASE+'getBookByNameCategory/name/'+nom+'/page/1';

        ///api/getBookByNameCategory/name/:name



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
          console.log("dtata ==",data)


            
            setItem(data.book);
            //alert(data.book.length)
   
        if(data.book.length >= 20){
        
       
        }
          
          
          setIsLoading(false);
          //alert(endOfList);
        });;

      } catch (error) {
        console.log(error)

        setIsLoading(false);
        setError(true);
      }

  }

  const getByCatPagi = async () =>{

    //let userToken = userData.token;
    setIsLoadingMore(true)
   let url =
      URL_BASE+'getBookByNameCategory/name/'+nom+'/page/'+page;

      ///api/getBookByNameCategory/name/:name



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
        console.log("dtata ==",data)

        if(page>1){

          setItem([...item , ...data.book])

      }else{
          
          setItem(data.book);
      }

      if(data.book.length == 0){
          setEndOfList(true);
     
      }
        
        
        setIsLoadingMore(false);
        //alert(endOfList);
      });

    } catch (error) {
      console.log(error)

      setIsLoadingMore(false);
      setError(true);
    }

}

  useEffect(() => {
    setImageWidth((width - 20) / numColumns);
  }, [width]);

  React.useEffect(() => {

    setIsLoading(true);
    setEndOfList(false);
    setPage(1);
    setItem([]);
    
    getByCat();


  }, [nom]);
  React.useEffect(() => {
    if(page>1){

      getByCatPagi();

    }

}, [page]);
  if(isLoading){

    return(

      <LoaderComponent/>
    );
  }
  const renderLoader = () => {
    return (
      isLoadingMore ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> :  !isLoadingMore  && !endOfList ?
    <TouchableOpacity onPress={()=>{setPage(page+1); }}>
    <Text style={{fontSize:17,textAlign:'center',color:'red',marginBottom:20}}>Voir plus</Text>
    </TouchableOpacity>:<Text style={{alignSelf:'center',color:'green'}}> - Fin de liste - </Text>
    );
  };

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
                      item:item
                    });


            

                  }}>
                    <View>

                    <ImageBackground
                      borderRadius={10}
                      source={{ uri: item.image }}
                      resizeMode='cover'
                      style={{ width: imageWidth-5, marginTop: 15,aspectRatio: 1 / 1.5, backgroundColor: '#007bff1c',borderRadius:15 }}
                    >
                  {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}
                
          {item.free == 1?
                                      <View style={{flexWrap: 'wrap',position:'absolute'}}>
                                      <Text style={{alignSelf: 'flex-start',backgroundColor:"white",color:"#60103b",fontFamily:'Poppins-Bold', margin:3,fontSize:11,borderRadius:5,paddingLeft:5,paddingRight:5,paddingTop:2}}>Gratuit</Text>
                                    </View>:null

                }
                </ImageBackground>
                <Text style={{fontFamily:'Poppins-Bold'}} numberOfLines={1}>{item.titre}</Text>
                <Text style={{fontFamily:'Poppins'}}  numberOfLines={1}>{item.auteur}</Text>

                    </View>
        
                </TouchableOpacity>

              {isExist(item) ?
                  <TouchableOpacity style={{paddingLeft: 0, paddingTop: 5}}
                    onPress={() => onTapRemoveTolist(item)}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={28}
                      color="#60103b"
                    />
                    
                  </TouchableOpacity>:
                  <TouchableOpacity style={{paddingLeft: 0, paddingTop: 5}} 
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
          ListFooterComponent={renderLoader}
          style={{paddingBottom:70}}
          contentContainerStyle={{paddingBottom:70}}
          
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
