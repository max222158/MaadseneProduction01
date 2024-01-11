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
import { setArtist, setAudio, setAudioStart, setColor, setIdPodcast, setImage, setItemPodcast, setMinimized, setPlayerOff, setSongType, setTitle } from '../../features/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { addToList, addToPodcastRead, removeToList } from '../../features/favorite/favoriteSlice';
import { addPodcastStored, setPodcastStored } from '../../features/podcast/PodcastSlice';
import LoaderComponent from '../../Components/LoaderComponent';
import { setIsUpdate } from '../../features/user/authSlice';



const PodcastDetailsScreen = ({ navigation, route }) => {

  var { item } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [click, setClick] = useState(-1);
  const [episode, setEpisode] = useState([]);
  const album = useSelector((state) => state.audio.audio);
  const podcastStoredLocal = useSelector((state) => state.podcast.podcastStoredLocal);
  const idPodcast = useSelector((state) => state.audio.idPodcast);
  const audioStart = useSelector(state => state.audio.audioStart);
  const favorite = useSelector((state) => state.favorite.favorite);
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
      setEpisode(data.podcast);

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
  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>

      <View style={{
        height: 60, backgroundColor: item.color, width: '100%', justifyContent: 'space-between', alignItems: 'center'
        , paddingLeft: 10, flexDirection: 'row'
      }} >
        <GoBackComponent size={32} color="#ffff" navigation={navigation} />

        {!isExist() ?
                    <TouchableOpacity
                    sty
                         onPress={()=>{
                            console.log(itemsave);
                            dispatch(addToList(item)); 
                        
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


              <EpisodeComponent item={epi} color={item.color} />
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
        playerLoading ? <LoaderComponent /> : null
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