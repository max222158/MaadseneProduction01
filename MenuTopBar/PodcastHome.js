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
import { PodcastService } from '../services/api/podcastService';
import PodcastItem1 from '../Component_items/Commons/PodcastItem';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function CategoryScreen({ route, navigation }) {
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);
  const podcastStoredLocal = useSelector((state) => state.podcast.podcastStoredLocal);


  //alert(nom)
  const [item, setItem] = React.useState([]);

  const [podcastOfWeek, setPodcastOfWeek] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [empty, setEmpty] = React.useState(false);
  const [dataByCateg, setDataByCateg] = React.useState([]);
  
  const [isLoading1, setIsLoading1] = React.useState(true);
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


  const getDataPodcastOfWeek = async () => {
    //let userToken = userData.token;
    setEmpty(true);
    setIsLoading(true);
    setError(false);
    try {
      

      const data = await PodcastService.getPodcastOfWeek();

      setPodcastOfWeek(data.podcastOfWeek);
      //console.log(data.podcastOfWeek);
      setIsLoading(false);
      try{
        const data1 = await PodcastService.getPodcastByCateg();

        setDataByCateg(data1);


      }catch(e){
        setIsLoading1(false)

      }finally{
        setIsLoading1(false)
      }


    } catch (e) {


      setError(true);
      setIsLoading(false);
      //actions.logout();

    }

  }
  React.useEffect(() => {

    getDataPodcastOfWeek();
    //alert(JSON.stringify(podcastStoredLocal));
  }, []);

/*   React.useEffect(() => {
    console.log("----",podcastStoredLocal)
  }, [podcastStoredLocal]); */
  const LineItem = ({ title,  items }) => {
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                
        <Text style={{ fontSize: 20,paddingLeft: 15 , fontFamily: 'Poppins-Bold', color: 'black',paddingTop: 20,paddingBottom:10 }}>{title}</Text>


            </View>

            <FlatList
                data={items}
                style={{paddingLeft: 15,height:240 }}

                renderItem={({ item, index }) =>
                <TouchableOpacity onPress = {()=>{navigation.navigate('detailsPodcast',{item:item})}}>
                <PodcastItem1 item={item} />
              </TouchableOpacity>

                }
   
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};



  return (
    <ScrollView style={[styles.bg,{ }]}>
      {
      Object.keys(podcastStoredLocal  || []).length !=0?
      <>
        <Text style={{ fontSize: 20,paddingLeft: 15 , fontFamily: 'Poppins-Bold', color: 'black',paddingTop: 30,paddingBottom:10 }}>Récemments écoutés </Text>
        <FlatList
      data={podcastStoredLocal}
      keyExtractor={(item, index) => index.toString()} // Utilisez une clé unique pour chaque élément
      renderItem={({item}) =>(
        <TouchableOpacity onPress = {()=>{navigation.navigate('detailsPodcast',{item:item})}}>
      <PodcastItem1 item={item} />
      </TouchableOpacity>

      )
    
    }
    style={{paddingLeft: 15 }}
      horizontal
      showsHorizontalScrollIndicator={false}

    />
      </>:null
      }


      <Text style={{ fontSize: 20,paddingTop: 20, fontFamily: 'Poppins-Bold', color: 'black', paddingLeft: 15,paddingBottom:10 }}>Sélection de la semaine </Text>





      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 10, height: 240 }}>

       {podcastOfWeek.map((item, index) => (
        <TouchableOpacity onPress = {()=>{navigation.navigate('detailsPodcast',{item:item})}}>
          <PodcastItem1 item={item} />
        </TouchableOpacity>

                  ))}

      </ScrollView>
 

      {isLoading1 ?
                        <ActivityIndicator size={20} color="gray" style={{ marginTop: 20 }} /> :


                        dataByCateg.map((item, index) => (
                            <View key={index.toString()}>
                                <LineItem
                                    title={item.title}
                                    items={item.items}
                                />
                            </View>
                        ))
                    }      
      {!isLoading  && !error?
        <TouchableOpacity style={{marginTop:20,marginBottom:70}} onPress={()=>{navigation.navigate('podcast_category')}}>
        <Text style={{fontSize:17,textAlign:'center',color:'red',marginBottom:20}}>Voir plus</Text>
        </TouchableOpacity>:null}

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
  text1: { fontWeight: "500", fontSize: 15, letterSpacing: 1, marginTop: 10 },
  text2: { paddingTop: 4, fontFamily: "Arial", fontSize: 14, color: "#868995", letterSpacing: 1 },
  mainView: {
    position: 'relative', // ajustez la largeur selon vos besoins
    aspectRatio: 1 / 1,
    marginRight: 10,// ajustez la hauteur selon vos besoins
    width: windowWidth / 2 - 20,
  },
  overlayView: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: windowWidth / 2 - 35,
    height: windowWidth / 2 - 35,
    borderRadius: 10,
    backgroundColor: "green",
    opacity: 0.4 // couleur semi-transparente pour l'overlay
  },
  overlayView1: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 10,
    width: windowWidth / 2 - 30,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    backgroundColor: 'green',
    opacity: 0.7 // couleur semi-transparente pour l'overlay
  },
  overlayView2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 10,
    width: windowWidth / 2 - 30,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    backgroundColor: 'green',
    // couleur semi-transparente pour l'overlay
  },
});
