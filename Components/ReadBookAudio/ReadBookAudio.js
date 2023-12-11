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
  StatusBar
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

export const ReadBookAudio = ({ navigation, route, goBack }) => {

  const playBackState = usePlaybackState();
  const progress = useProgress();
  //   custom states
  const [songIndex, setsongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  // custom referecnces
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null);


    var { id, image, auteur, titre, categorie,resume,lien} = route.params;

    let songs1=[{'id':id,'title':titre,'artist':auteur,'url':"https://maadsene.com/livres_numeriques/"+lien}];

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const {title, artwork, artist} = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
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
     
      console.log("song11111111111-----------",songs1);
      (async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();
    
        // Add a track to the queue
        await TrackPlayer.add(songs1);
    
        // Start playing it
        await TrackPlayer.play();
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
        </Animated.View>
      );
    };
    return (
      <SafeAreaView style={style.container}>
        <StatusBar
            backgroundColor="#ffff"
            barStyle="dark-content"
        />
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:20,marginTop:10}}>
          <Ionicons name="ios-arrow-back-outline" size={30} color="gray" />
        </TouchableOpacity>     
        <View style={style.mainContainer}>
        <Animated.FlatList
          ref={songSlider}
          renderItem={renderSongs}
          data={songs1}
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
            thumbTintColor="gray"
            minimumTrackTintColor="gray"
            maximumTrackTintColor="gray"
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
            <Ionicons name="play-skip-back-outline" size={35} color="#611039" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayBack(playBackState)}>
            <Ionicons
              name={
                playBackState === State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#611039"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#611039"
            />
          </TouchableOpacity>
        </View>

            <View style={{paddingBottom:20}}>
              <Text numberOfLines={1} style={[style.songContent, style.songTitle]}>
                {/* {songs[songIndex].title} */ trackTitle}
              </Text>
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
    backgroundColor: '#ffff',
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
    color: 'black',
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
    color: 'black',
  },

  musicControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    width: '60%',
  },
});
