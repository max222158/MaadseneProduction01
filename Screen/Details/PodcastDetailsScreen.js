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
import { setArtist, setAudio, setColor, setImage, setMinimized} from '../../features/player/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';


const PodcastDetailsScreen = ({ navigation, route }) => {

  var { item } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [episode, setEpisode] = useState([]);
  const album = useSelector((state) => state.audio.audio);

  const dispatch = useDispatch();

  const getEpisode = async () => {
    //alert(item.id);

    const data = await PodcastService.geEpisodesById(item.id);
    setEpisode(data.podcast);

  }

  useEffect(() => {

    getEpisode();

  }, []);

  const playAudio = () =>{

    dispatch(setMinimized(false));
    dispatch(setAudio(episode));
    dispatch(setArtist(item.artist));
    dispatch(setImage(item.image));
    dispatch(setColor(item.color));
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#ffff' }}>

      <View style={{ height: 60, backgroundColor: item.color, width: '100%',justifyContent:'space-between',alignItems:'center'
        ,paddingLeft: 10,flexDirection:'row' }} >
        <GoBackComponent size={32} color="#ffff" navigation={navigation} />
        <TouchableOpacity>
              
              <Text></Text>
              <Ionicons name="heart-outline" size={40} color="white" />
          </TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <View style={{ height: 120, backgroundColor: item.color, width: '100%' }} >


        </View>
        <View style={{ marginTop: -100, paddingLeft: 10 }}>
          <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
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
         isLoading={!isLoading} iconName="caret-forward-circle" 
         color={item.color} textButton="Lire ce podcast" colorText="white"
         onPress={playAudio}
         />


      </View>



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