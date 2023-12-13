import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToList, removeToList } from '../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { PodcastItem } from '../Component_items/PodcastItem';
import fetchWithTimeout from '../utils/fetchWithTimeOut';
import { Pagination } from 'react-native-pagination';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function CategoryScreen({ route, navigation }) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);

  //alert(nom)
  const [item, setItem] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [empty, setEmpty] = React.useState(false);
  const isExist = (movie) => {

    if (favorite.filter(item => item.id === movie.id).length > 0) {
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


  const getPodcast = async () => {
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
        timeout: 35000
      })
        .then(response => response.json())
        .then(data => {
          //console.log('podcast', data.podcast.data);
          setItem([...item, ...data.podcast.data]);
          setPage(page + 1);
          setIsLoading(false);
          let x = data;
          //alert(data);
          console.log("-----", x.podcast.to);
          if (x.podcast.to === x.podcast.total || x.podcast.to === null) {
            setEmpty(true);
          } else {
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

      <View style={{ flex: 1 }}>
        {
          !empty ?

            <TouchableOpacity
              style={{ textAlign: 'center', padding: 15, flexWrap: 'wrap', alignContent: 'center' }}
              onPress={() => { getPodcast() }}

            >

              <Text style={{
                alignSelf: 'center', backgroundColor: "red", textAlign: 'center',
                color: "white"
                , margin: 3, fontSize: 13, borderRadius: 15, padding: 4, paddingLeft: 10, paddingRight: 10
              }}>Voir plus +</Text>

            </TouchableOpacity> : null}
        {isLoading ?
          <ActivityIndicator size={20} color="black" /> : null}
      </View>
    );
  };

  const loadMoreItem = () => {

    setPage(page + 1);
  };

  return (
    <ScrollView style={styles.bg}>

      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: 'black', padding: 15 }}>Récemments écoutés </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{paddingLeft:10,height:windowWidth/2-20+100}}>
      <View style={[styles.mainView,{}]}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView1}></View>
         {/* troisième vue superposée */}
        <View style={styles.overlayView2}></View>
        <View style={{height:windowWidth/2-20+5}}></View>
        <Text numberOfLines={1} style={styles.text1}>titre</Text>
                    <Text numberOfLines={1} style={styles.text2}>Auteur</Text>
      </View>
      </ScrollView>


      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: 'black', paddingLeft: 15 }}>Sélection de la semaine </Text>
 




      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:250}}>
      <View style={styles.mainView}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView}></View>
        <View style={{height:200}}></View>
        <Text numberOfLines={1} style={styles.text1}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
      </View>

      </ScrollView>
      <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', color: 'black', paddingLeft: 15 }}>Parlons Entreprenariat! </Text>
 
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:250}}>
      <View style={styles.mainView}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView}></View>
        <View style={{height:200}}></View>
        <Text numberOfLines={1} style={styles.text1}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
      </View>

      <View style={styles.mainView}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView}></View>
        <View style={{height:200}}></View>
        <Text numberOfLines={1} style={styles.text1}>Titre</Text>
                    <Text numberOfLines={1} style={styles.text2}>Auteur</Text>
      </View>
      <ScrollView horizontal style={{height:250}}>
      <View style={styles.mainView}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView}></View>
        <View style={{height:200}}></View>
        <Text numberOfLines={1} style={styles.text1}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
      </View>

      <View style={styles.mainView}>
        {/* Première vue superposée */}
        <View style={styles.overlayView}></View>
        {/* Deuxième vue superposée */}
        <View style={styles.overlayView}></View>
        <View style={{height:200}}></View>
        <Text numberOfLines={1} style={styles.text1}>Titre</Text>
                    <Text numberOfLines={1} style={styles.text2}>Auteur</Text>
      </View>
      </ScrollView>
      </ScrollView>


    </ScrollView>
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
    marginTop: 0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text1: { fontWeight: "500", fontSize: 15, letterSpacing: 1,marginTop:10 },
  text2: { paddingTop: 4, fontFamily: "Arial", fontSize: 14, color: "#868995", letterSpacing: 1 },
  mainView: {
    position: 'relative', // ajustez la largeur selon vos besoins
    aspectRatio:1/1, 
    marginRight:10,// ajustez la hauteur selon vos besoins
    width: windowWidth/2-20,
  },
  overlayView: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: windowWidth/2-35,
    height: windowWidth/2-35,
    borderRadius:10,
    backgroundColor: "green",
    opacity:0.4 // couleur semi-transparente pour l'overlay
  },
  overlayView1: {
    position: 'absolute',
    top: 6,
    left: 6,
    right:10,
    width: windowWidth/2-30,
    aspectRatio:1/1,
    borderRadius:10,
    backgroundColor: 'green',
    opacity:0.7 // couleur semi-transparente pour l'overlay
  },
  overlayView2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right:10,
    width: windowWidth/2-30,
    aspectRatio:1/1,
    borderRadius:10,
    backgroundColor: 'green',
     // couleur semi-transparente pour l'overlay
  },
});
