import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import Video from 'react-native-video';
//import { AudioPlayer } from 'react-native-simple-audio-player';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  console.log(currentTrack, playBackState, State.Playing);
  if (currentTrack != null) {
    if (playBackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

export const ReadSoundComponent = ({ navigation, route, goBack }) => {

  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);


    var { id, image, auteur, titre, categorie,resume,lien,episode,podcast} = route.params;

    //let songs1=[{'id':id,'title':titre,'artist':auteur,'url':"https://maadsene.com/podcasts/"+lien,'episode':episode},{'id':48222,'title':'ataya','artist':auteur,'url':"https://maadsene.com/podcasts/"+lien,'episode':4}];
    //alert('dial');
    //let songs1= [{"auteur": "Thiane Ndiaye", "episode": 0, "id": 71,  "name": "YOU BE YOU", "title": "Bande annonce",'url':"https://maadsene.com/podcasts/"+lien}];
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artwork, auteur} = track;
        setTrackTitle(title);
        setTrackArtist(auteur);
        setTrackArtwork(artwork);
        //alert('dioma');
        setIsLoading(false);
      }
    });


    const repeatIcon = () => {
      if (repeatMode == 'off') {
        return 'repeat-off';
      }
  
      if (repeatMode == 'track') {
        return 'repeat-once';
      }
  
      if (repeatMode == 'repeat') {
        return 'repeat';
      }
    };
  
    const changeRepeatMode = () => {
      if (repeatMode == 'off') {
        TrackPlayer.setRepeatMode(RepeatMode.Track);
        setRepeatMode('track');
      }
  
      if (repeatMode == 'track') {
        TrackPlayer.setRepeatMode(RepeatMode.Queue);
        setRepeatMode('repeat');
      }
  
      if (repeatMode == 'repeat') {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        setRepeatMode('off');
      }
    };
  
    const skipTo = async trackId => {
      await TrackPlayer.skip(trackId);
    };

    useEffect(() => {
      console.log("song11111111111-----------",podcast);

      let index = podcast.findIndex(pod=> pod.id === id);
      //alert(index);
      (async () => {

        // Set up the player
        await TrackPlayer.setupPlayer();
    
        // Add a track to the queue
        await TrackPlayer.add(podcast);

        await TrackPlayer.skip(index)
        .then((_) => {
          setsongIndex(index);
          console.log('changed track');
          TrackPlayer.play();
        })
        .catch((e) => console.log('error in changing track ', e));

        let trackIndex = await TrackPlayer.getCurrentTrack();
    
        // Start playing it
        
    })();
  
      scrollX.addListener(({value}) => {
        //   console.log(`ScrollX : ${value} | Device Width : ${width} `);
  
        const index = Math.round(value / width);
        skipTo(index);
        setsongIndex(index);
  
        //   console.log(`Index : ${index}`);
      });
  
      return () => {
        scrollX.removeAllListeners();
        TrackPlayer.destroy();
      };
    }, []);
  
    const skipToNext = () => {
      //alert("skip");
     // alert(songIndex);
      songSlider.current.scrollToOffset({
        
        offset: (songIndex + 1) * width,
      });
    };
  
    const skipToPrevious = () => {
      songSlider.current.scrollToOffset({
        offset: (songIndex - 1) * width,
      });
    };
  
    const renderSongs = ({item, index}) => {
      return (
        <Animated.View style={style.mainWrapper}>
          <View style={[style.imageWrapper, style.elevation]}>
            <Image
              //   source={item.artwork}
              source={{uri:"https://maadsene.com/couverture/"+image}}
              style={style.musicImage}
            />
          </View>
          <Text style={{fontSize:18,color:'#FFFF',fontWeight:'700'}}>episode {item.episode}</Text>
        </Animated.View>
      );
    };
    return (
      <SafeAreaView style={style.container}>
        <StatusBar
            backgroundColor="#222831"
            barStyle="light-content"
        />
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:20,marginTop:10}}>
          <Ionicons name="ios-arrow-back-outline" size={30} color="#ffff" />
        </TouchableOpacity>     
        <View style={style.mainContainer}>
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={podcast}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        
        <View>
          <Slider
            style={style.progressBar}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
          />

          {/* Progress Durations */}
          <View style={style.progressLevelDuraiton}>
            <Text style={style.progressLabelText}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
            <Text style={style.progressLabelText}>
              {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)}
            </Text>
          </View>
        </View>
        {/* music control */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={skipToPrevious}>
            <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity style={{width:100,height:100,justifyContent:'center',alignContent:'center',alignItems:'center'}} onPress={() => togglePlayBack(playBackState)}>
            {

              isLoading?
                <ActivityIndicator size={75} color="#FFD369"/>
              
              :

            
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#FFD369"

            />
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>

            <View style={{paddingBottom:20}}>
              {!isLoading?
              <Text numberOfLines={1} style={[style.songContent, style.songTitle]}>
                {/* {songs[songIndex].title} */ trackTitle}
              </Text>:<Text numberOfLines={1} style={[style.songContent, style.songTitle]}>En cours...</Text>}
              <Text style={[style.songContent, style.songArtist]}>
                {/* {songs[songIndex].artist} */ trackArtist}
              </Text>
            </View>
          </View>
      {/* bottom section */}
{/*       <View style={style.bottomSection}>
        <View style={style.bottomIconContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode !== 'off' ? '#FFD369' : '#888888'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View> */}

{/*       <AudioPlayer
        url={'https://lesabeillessolidaires.com/livres_numeriques/'+lien}
          style={{backgroundColor:'black'}}
      /> */}
    </SafeAreaView>
    

    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,

    },
    container1: {
        alignItems: 'center'

    },
    imageDetails: {

        width: width / 1.8,
        height: height / 2,
        padding: 0,
        marginTop:-50,
        borderRadius:20,



    },
    textview: { width: '100%' },
    title: { fontSize: 20, fontWeight: 'bold', paddingLeft: 20, paddingTop: 20 },
    auteur: { fontSize: 19, paddingLeft: 20 },
    resume: { fontSize: 18, padding: 20, paddingTop: 40, paddingBottom: 40 },
    categorie: { fontSize: 20, padding: 5, paddingLeft: 30, paddingRight: 30, borderWidth: 1, marginLeft: 20, marginTop: 15, borderRadius: 30 }
,
backgroundVideo: {
    width:"100%",
    height:300

  },

});

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    borderTopColor: '#393E46',
    borderWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },

  bottomIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  mainWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },

  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLevelDuraiton: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
