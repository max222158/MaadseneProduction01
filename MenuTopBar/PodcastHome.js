import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToList,removeToList  } from '../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { PodcastItem } from '../Component_items/PodcastItem';
import fetchWithTimeout from '../utils/fetchWithTimeOut';
import { Pagination } from 'react-native-pagination';

export default function CategoryScreen({route, navigation}) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  const favorite = useSelector((state)=> state.favorite.favorite);

  //alert(nom)
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [empty, setEmpty] = React.useState(false);
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


  const getPodcast = async () =>{
      //let userToken = userData.token;
      setEmpty(true);
      setIsLoading(true);
      setError(false);
      let url =
      `https://mobile.maadsene.com/api/auth/getPodcastall?page=${page}`;

      try {
        
        await fetchWithTimeout(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json, text/plain, */*',
            // "Content-Type": "application/json",
            Authorization: 'Bearer ' + userDataSelect.token,
          },
          timeout:35000
        })
          .then(response => response.json())
          .then(data => {
            //console.log('podcast', data.podcast.data);
            setItem([...item, ...data.podcast.data]);
            setPage(page + 1);
            setIsLoading(false);
            let x = data;
            //alert(data);
            console.log("-----",x.podcast.to);
            if(x.podcast.to === x.podcast.total || x.podcast.to === null ){
              setEmpty(true);
            }else{
              setEmpty(false);
            }
          });
      } catch (e) {

          
          setError(true);
          setIsLoading(false);
          //actions.logout();

      }

  }
  React.useEffect(() => {

    getPodcast();
  }, []);

  const renderLoader = () => {
    return (
      
        <View style={{flex:1}}>
          {
            !empty ?
          
          <TouchableOpacity 
            style={{textAlign:'center',padding:15,flexWrap: 'wrap',alignContent:'center'}}
            onPress={()=>{getPodcast()}}

          >
             
                  <Text style={{alignSelf: 'center',backgroundColor:"red",textAlign:'center',
                  color:"white"
                  ,margin:3,fontSize:13,borderRadius:15,padding:4,paddingLeft:10,paddingRight:10}}>Voir plus +</Text>
                
          </TouchableOpacity>:null}
          {isLoading?
          <ActivityIndicator size={20} color="black"/>:null}
          </View>
    );
  };

  const loadMoreItem = () => {

    setPage(page + 1);
  };

  return (
    <View style={styles.bg}>


      <View style={styles.ScrollViewcateg}>

        {error?
        <TouchableOpacity onPress={()=>{getPodcast()}} style={{marginBottom:20,marginTop:10,alignSelf:'center',
        backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:70}}>
          
          <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>
        </TouchableOpacity>:null}
        <FlatList
           ListHeaderComponent={      <Text
            style={{
              fontSize: 16,
              color: 'black',
              paddingLeft: 13,
              marginTop:15,
              paddingBottom:10,
              fontWeight: "500", letterSpacing: 0.5
            }}>
            Sélection de podcasts

          </Text>}
          columnWrapperStyle={{flex: 1}}
          data={item}
          style={{paddingBottom:150}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={{marginBottom:15}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate( 'DetailsPodcast', {
                      id: item.id,
                      auteur: item.auteur,
                      image: item.image,
                      titre: item.title,
                      categorie: item.categorie,
                      resume: item.description,
                      book: item.lien,
                      support: item.support,
                      name: item.name,
                      episode:item.episode
                    });
                  }}>
                  <PodcastItem item={item} />
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
          
          ListFooterComponent={renderLoader}
          numColumns={2}
          contentContainerStyle={{marginBottom: 100,paddingBottom:60}}
        />
   
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'white',
  },
  textCateg: {
    fontSize: 30,
    marginLeft: 19,
    marginTop: 18,
    marginBottom: 20,
  },
  ScrollViewcateg: {
    marginTop:0
  },
});
