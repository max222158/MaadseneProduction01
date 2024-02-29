import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, FlatList } from 'react'
import ShapeImageComponent from '../../Component_items/Commons/ShapeImageComponent'
import { ScrollView } from 'react-native-gesture-handler';
import GoBackComponent from '../../Component_items/Commons/GoBackComponent';
import Autolink from 'react-native-autolink';
import ReadButtonComponent from '../../Component_items/Commons/ReadButtonComponent';
import { PodcastService } from '../../services/api/podcastService';
import EpisodeComponent from '../../Components/EpisodeComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import { setArtist, setAudio, setAudioStart, setColor, setEpisode, setIdPodcast, setImage, setItemPodcast, setMinimized, setPlayerOff, setSongType, setTitle } from '../../features/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToList, addToPodcastRead, removeToList, setFavorite } from '../../features/favorite/favoriteSlice';
import { addPodcastStored, setPodcastStored } from '../../features/podcast/PodcastSlice';
import LoaderComponent from '../../Components/LoaderComponent';
import { setIsUpdate } from '../../features/user/authSlice';
import TrackPlayer from "react-native-track-player";



const PodcastDetailsScreen = ({ navigation, route }) => {

  var { item } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [click, setClick] = useState(-1);
  const [episode, setEpisode1] = useState([]);
  const album = useSelector((state) => state.audio.audio);
  const podcastStoredLocal = useSelector((state) => state.podcast.podcastStoredLocal);
  const idPodcast = useSelector((state) => state.audio.idPodcast);
  const audioStart = useSelector(state => state.audio.audioStart);
  let favorite = useSelector((state) => state.favorite.favorite);
  const versionapp = useSelector(state => state.userAuth.versionapp);
    
  const idsong = useSelector((state) => state.audio.idPodcast);
      
  const itemsave = useSelector((state) => state.audio.itemPodcast);

  const dispatch = useDispatch();

  const getEpisode = async () => {
    setIsLoading(true);
    //alert(item.id);
    try {
      const data = await PodcastService.geEpisodesById(item.id);

      if(data.version > versionapp){

        dispatch(setIsUpdate(true));
      }
      setEpisode1(data.podcast);

    } catch (e) {

    } finally {
      setIsLoading(false);
    }


  }


  const isExistInLocal = () => {
    return podcastStoredLocal.find(item => item.id === idPodcast) !== undefined;
  };

  const isExist = () => {
    const id = item.id;

    return favorite.find(item => item.id === id) !== undefined;
  };
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
  useEffect(() => {

    //console.log(idPodcast);
    if (click == 1) {
      //alert(podcastStoredLocal.length);

      if (isExistInLocal()) {

        const newArray = podcastStoredLocal.filter(item => item.id !== idPodcast);
        dispatch(setPodcastStored([item, ...newArray]));
        PodcastService.storePodcastToLocal('podcast_local', [item, ...newArray]);

        //alert(JSON.stringify(newArray));

      } else {

        if (podcastStoredLocal.length > 2) {

          const newState = podcastStoredLocal.slice(0, -1);
          dispatch(setPodcastStored([item, ...newState]));
          PodcastService.storePodcastToLocal('podcast_local', [item, ...newState]);


        } else {
          dispatch(addPodcastStored(item));
          PodcastService.storePodcastToLocal('podcast_local', [item, ...podcastStoredLocal]);
        }

      }



    }


  }, [idPodcast]);
  useEffect(() => {

    getEpisode();

  }, []);

  useEffect(() => {
    console.log("readddddddddddddyyyyyy")
  }, [audioStart]);

  const playAudio = async () => {
    dispatch(setEpisode(0));
    setClick(1);
    setPlayerLoading(true);
    dispatch(setIdPodcast(item.id));
    dispatch(setMinimized(false));
    dispatch(setAudio(episode));
    dispatch(setArtist(item.artist));
    dispatch(setImage(item.image));
    dispatch(setColor(item.color));

    dispatch(setItemPodcast(item));
    dispatch(setSongType("Podcast"));
    //
    dispatch(setAudioStart(true));
    dispatch(setPlayerOff(false));
    setPlayerLoading(false);


  }
  const playAudioEpisode = async (index) => {
    dispatch(setEpisode(index));
    if(item.id != idPodcast){
      setClick(1);
      setPlayerLoading(true);
      dispatch(setIdPodcast(item.id));
      dispatch(setMinimized(false));
      dispatch(setAudio(episode));
      dispatch(setArtist(item.artist));
      dispatch(setImage(item.image));
      dispatch(setColor(item.color));
  
      dispatch(setItemPodcast(item));
      dispatch(setSongType("Podcast"));
      //
      dispatch(setAudioStart(true));
      dispatch(setPlayerOff(false));
      setPlayerLoading(false);
    

    }else{
      dispatch(setMinimized(false));
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }

    //alert(index);
    //alert(idPodcast +"" + item.id);




  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>

      <View style={{
        height: 60, backgroundColor: item.color, width: '100%', justifyContent: 'space-between', alignItems: 'center'
        , paddingLeft: 10, flexDirection: 'row'
      }} >
        <GoBackComponent size={32} color="#ffff" navigation={navigation} />

        {!isExist() ?
                    <TouchableOpacity
                    
                         onPress={()=>{
                            console.log(itemsave);
                            onTapAddTolist(item);
                        
                        }
                        
                        }

                        style={{marginRight:10 }}>
                        <IconMat name="heart-outline" size={40} color="white" />

                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        //onPress={removeData}
                        onPress={()=>{dispatch(removeToList(item));}}

                        style={{marginRight:10 }}>
                        <Icon name="heart" size={40} color="red" />
                    </TouchableOpacity>}
      </View>
      <ScrollView style={{}}>
        <View style={{ height: 120, backgroundColor: item.color, width: '100%' }} >


        </View>
        <View style={{ marginTop: -100, paddingLeft: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <ShapeImageComponent borderRadius={20} height={200} width={200} imageSource={item.image} />

          </View>

          <Text style={{ fontSize: 20, fontFamily: 'Poppins-Bold', marginTop: 10 }}>{item.name}</Text>
          <Text style={{ fontSize: 13, fontFamily: 'Poppins', color: 'gray' }}>{item.artist}</Text>
          <Autolink text={item.description} textProps={styles.textDescription} />

        </View>
        <View style={{ paddingBottom: 200 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: '#000', marginTop: 30, marginLeft: 15, }} >Les épisodes</Text>
          {
            episode.map((epi, index) => (

              <TouchableOpacity onPress={()=>{playAudioEpisode(index)}}>
              <EpisodeComponent item={epi} color={item.color} />
              </TouchableOpacity>
            )



            )

          }

        </View>
      </ScrollView>
      <View style={styles.bottomView} >

        <ReadButtonComponent width={300}
          isLoading={isLoading} iconName="caret-forward-circle"
          color={item.color} textButton="Lire ce podcast" colorText="white"
          onPress={playAudio}
        />


      </View>
      {
        playerLoading ? <LoaderComponent  /> : null
      }


    </View>
  )
}

export default PodcastDetailsScreen

const styles = StyleSheet.create({

  textDescription: {
    fontSize: 15,
    color: 'gray'
  },
  bottomView: {

    width: '100%',
    height: 100,
    backgroundColor: '#ffffffba',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 1,
    bottom: 0
  },
})