import { View, Text, ActivityIndicator, Modal } from 'react-native'
import React from 'react';
import { Dimensions, StyleSheet,Image } from "react-native";
import { PanGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import {

  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar
} from 'react-native';
import Animated from 'react-native-reanimated';

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPlayer } from '../../features/player/playerSlice';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import  {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  runOnUI,
  block,
  call,
} from 'react-native-reanimated';

const { width: wWidth, height: wHeight } = Dimensions.get("window");
const HEIGHT = wHeight;
const DOCK_HEIGHT = wHeight * 0.08;
const _ICON_SIZE = 26;
const _ICON_COLOR = "black";

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
const PlayerScreen = ({ navigation, route, goBack,marginB }) => {

    const dispatch = useDispatch();
    const translateY = useSharedValue(height);
    const stateAudio = useSelector(state=>state.audio.audio);
    const image = useSelector(state=>state.audio.image);
    const idsong = useSelector(state=>state.audio.idsong);

    const playBackState = usePlaybackState();
    const progress = useProgress();
    //   custom states
    const [songIndex, setsongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState('off');
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtwork, setTrackArtwork] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [episode,setEpisode] = useState("");
    const [imagePod,setImagePod] = useState("");
    const [mode, setMode] = useState("clair");
    const [visi1, setVisi1] = React.useState(true);
    const [repeter, setRepeter] = useState(false);
    const [color, setColor] = React.useState('gray');

    const [isModalVisible1, setIsVisible2] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [chargement, SetChargement] = React.useState(false);
    const audio = useSelector((state) => state.audio.audio1);
    const playpauseredux = useSelector((state) => state.audio.playpause);
    const favorite = useSelector((state) => state.favorite.favorite);
    const [visibility, setVisibility] = useState(false);
    const chapitre = useSelector((state) => state.audio.chapitre);
    const supportOfBook = useSelector((state) => state.audio.support);
    const loadingPlayer = useSelector((state) => state.audio.loadingPlayer);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [replay, setReplay] = useState(false);
    const [numberStop, setNumberStop] = useState(0);
    const minimize1 = useSelector((state) => state.audio.minimize1);
    // custom referecnces
    //const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null);

  
     const pos = TrackPlayer.getBufferedPosition();
      //var { id, image, auteur, titre, categorie,resume,lien,episode,podcast} = route.params;
  
      //let songs1=[{'id':id,'title':titre,'artist':auteur,'url':"https://maadsene.com/podcasts/"+lien,'episode':episode},{'id':48222,'title':'ataya','artist':auteur,'url':"https://maadsene.com/podcasts/"+lien,'episode':4}];
  
      //let songs1= [{"auteur": "Thiane Ndiaye", "episode": 0, "id": 71,  "name": "YOU BE YOU", "title": "Bande annonce",'url':"https://maadsene.com/podcasts/"}];
      useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        setIsLoading(true);
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          const {title, artwork, artist,episode,image} = track;
          setTrackTitle(title);
          setTrackArtist(artist);
          setTrackArtwork(artwork);
          setEpisode(episode);
          setImagePod(image);
          //alert('dioma');
      
        }
      });
  
 
      React.useEffect(()=>{

        if(progress.duration == 0){

          setIsLoading(true);
        


        }else{

          setIsLoading(false);
        }

        

      },[progress.duration]);




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

      const isExist = (book) => {
        return favorite.find(item => item.id === idsong) !== undefined;
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
        //console.log("song11111111111-----------",podcast);
        //alert(idsong);
        let index = stateAudio.findIndex(pod=> pod.id === idsong);
        //alert(index);
        (async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();
        
        // Add a track to the queue
        await TrackPlayer.add(stateAudio);

         await TrackPlayer.skip(index)
        .then((_) => {
          setsongIndex(index);
          console.log('changed track');
          TrackPlayer.play();
        })
        .catch((e) => console.log('error in changing track ', e)); 

        let trackIndex = await TrackPlayer.getCurrentTrack();
      })();
    

      }, [stateAudio,idsong]);
    
      const skipToNext = () => {
        //alert("skip");
          TrackPlayer.skipToNext();
      };
    
      const skipToPrevious = () => {
          TrackPlayer.skipToPrevious();
      };
    
      const renderSongs = ({item, index}) => {
        return (
          <View style={styles.mainWrapper}>
            <View style={[styles.imageWrapper, styles.elevation]}>
              <Image
                //   source={item.artwork}
                source={{uri:"https://maadsene.com/couverture/"+artwork}}
                style={styles.musicImage}
              />
            </View>
            <Text style={{fontSize:18,color:'#FFFF',fontWeight:'700'}}>episode {item.episode}</Text>
          </View>
        );
      };

  const [ minimize,setMinimize] = React.useState(false);


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
        ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
        translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
        if (translateY.value > height * 0.3) {
            runOnJS(closeView)();
        } else {
            translateY.value = withTiming(0);
        }
    },
});
const closeView = () => {
  translateY.value = withTiming(height); // Faites glisser la vue en bas de l'écran
 
      setIsVisible(false);
      dispatch(setMinimized1(false));
  // Attendez que l'animation soit terminée pour masquer la vue
};

const animatedStyle = useAnimatedStyle(() => {
  return {
      transform: [{ translateY: translateY.value }],
  };
});


useEffect(()=>{
  if(minimize1 == true){
      translateY.value = withTiming(0);
      setIsVisible(true);
  }else{


  }

},[minimize1]);
  return (
    <>
    {/* {!isVisible && ( */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={[
                    { position: 'absolute', width: '100%', height: '100%', zIndex: 9999, backgroundColor: mode == "clair" ? 'white' : '#141414' },
                    animatedStyle,
                ]}
            >
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    borderBottomWidth: 1, height: 50,
                    borderBottomColor: mode == "clair" ? "#eee" : '#242424', justifyContent: 'space-between',
                    borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: StatusBar.currentHeight + 10
                }}>

                    <TouchableOpacity style={{ marginTop: 5, marginRight: 10, marginLeft: 10 }} onPress={() => { dispatch(setMinimized1(false)); }}>
                        <Icon name="chevron-down-outline" color={mode == "clair" ? "black" : 'white'} size={20} />
                    </TouchableOpacity>
                    <Text style={{ alignItems: 'center', justifyContent: 'center' }}></Text>
                    <Text style={{ alignItems: 'center', justifyContent: 'center', color: mode == "clair" ? "black" : 'white' }} >Chap </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View>
                            <TouchableOpacity onPress={() => {
                                if (mode == 'clair') {

                                    AsyncStorage.setItem('themeplayer', "sombre")
                                        .then(() => {


                                        })
                                        .catch((error) => {
                                            //console.log('Erreur lors du stockage des données:', error);

                                        });
                                    setMode('sombre');
                                } else {
                                    AsyncStorage.setItem('themeplayer', "clair")
                                        .then(() => {


                                        })
                                        .catch((error) => {
                                            //console.log('Erreur lors du stockage des données:', error);

                                        });

                                    setMode('clair');

                                }
                            }} style={{ textAlign: 'center', alignItems: 'center' }}>
                                <Icon size={18} name="contrast-outline" color={mode == "clair" ? "black" : 'white'} />
                                <Text style={{ color: mode == "clair" ? "black" : 'white' }}>Mode Sombre</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginRight: 10, marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => {

                                if (visibility == true) {
                                    setVisibility(false)
                                } else {
                                    setVisibility(true)
                                }
                            }} style={{ textAlign: 'center', alignItems: 'center' }}>
                                <Icon size={18} name="list" color={mode == "clair" ? "black" : 'white'} />
                                <Text style={{ color: mode == "clair" ? "black" : 'white' }}>Chapitres</Text>
                            </TouchableOpacity>


                        </View>


                    </View>






                </View>


                {visi1 ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <ActivityIndicator size={30} color="gray" />
                </View> :

                    <ScrollView style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
                        {
                            !loadingPlayer ?
                                <View style={{ width: dim300, height: dim300, marginTop: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 0, backgroundColor: '#0a3774' }}>


                                    <Image source={{ uri: trackArtwork }} style={{ width: dim300, height: dim300, alignSelf: 'center', zIndex: 99 }} />

                                    <Icon name="ios-musical-notes-outline" style={{ position: 'absolute' }} color="white" size={90} />
                                </View> :
                                <View style={{ width: dim300, height: dim300, marginTop: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 0, backgroundColor: '#0a3774' }}>



                                    <Icon name="ios-musical-notes-outline" style={{ position: 'absolute' }} color="white" size={90} />
                                </View>
                        }


                        <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold', color: mode == "clair" ? "black" : 'white', marginTop: 15 }} numberOfLines={2}>{trackTitle}</Text>

                        <Text style={{ fontSize: 14, fontFamily: 'Poppins', color: 'gray', marginLeft: 10 }} numberOfLines={1}>{trackArtist}</Text>









                    </ScrollView>}

                <View style={{
                    position: 'absolute', bottom: 30, flex: 1, width: width <= 600 ? width - 30 : 580 - 30, alignSelf: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row'


                        }}
                            onPress={() => {
                                if (repeter == false) {
                                    setRepeter(true)
                                } else {
                                    setRepeter(false)
                                }
                            }}

                        >
                            <IconMat size={30} name={repeter ? "repeat" : "repeat-off"} color={repeter ? "orange" : color} />
                            {/* <Text style={{ color: repeter ? "orange" : color, fontSize: 14, marginLeft: 5 }}>Répéter</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {

                            if (visibility == true) {
                                setVisibility(false)
                            } else {
                                setVisibility(true)
                            }
                        }} style={{ textAlign: 'center', alignItems: 'center' }}>
                            <Icon size={30} name="share-outline" color={mode == "clair" ? "gray" : 'white'} />
                            {/* <Text style={{ color: mode == "clair" ? "black" : 'white' }}>Chapitres</Text> */}
                        </TouchableOpacity>
                        {/* 
                    <TouchableOpacity style={{
                    flexDirection: 'row', marginRight: 10
                     
                    
                }} 
                onPress={()=>{

                }}  
                
                >
                    <IconMat size={25} name="heart-outline" color={repeter?"orange":color} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{
                    flexDirection: 'row', marginRight: 10
                     
                    
                }} 
                onPress={()=>{

                }}  
                
                >
                    <IconMat size={25} name="heart" color="red" />
                    </TouchableOpacity> */}


                        {!isExist() ?
                            <TouchableOpacity
                                /* onPress={createData} */

                                style={{ marginRight: 20 }}>
                                <IconMat name="heart-outline" size={30} color={color} />

                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={removeData}

                                style={{ marginRight: 20 }}>
                                <Icon name="heart" size={30} color="red" />
                            </TouchableOpacity>}
                    </View>
                    <Slider
                        style={[styles.progressBar, { height: 20 }]}
                        thumbTintColor={mode == "clair" ? "black" : 'white'}
                        minimumTrackTintColor="blue"
                        maximumTrackTintColor="#bbb"
                        minimumValue={0}
                        value={progress.position}
                        maximumValue={progress.duration}
                        onSlidingComplete={async value => {

                            await TrackPlayer.seekTo(value);


                        }}

                    />

                    <View style={{
                        width: "100%", flexDirection: 'row', alignSelf: 'center',
                        color: 'black', justifyContent: 'space-between', marginBottom: 0, paddingLeft: 15, paddingRight: 15
                    }} >
                        <Text style={{ color: mode == "clair" ? "black" : 'white' }}>

                            {new Date(progress.position * 1000).toLocaleTimeString('en-US', { hour12: false, hourCycle: 'h23' }).substring(3)}
                        </Text>

                        <Text style={{ color: mode == "clair" ? "black" : 'white' }}>
                            {new Date((progress.duration - progress.position) * 1000).toLocaleTimeString('en-US', { hour12: false, hourCycle: 'h23' }).substring(3)}
                        </Text>


                    </View>

                    <View
                        style={{
                            width: width <= 600 ? '100%' : 580,
                            flexDirection: 'row', marginRight: 10, marginTop: 5,
                            justifyContent: 'space-around', alignSelf: 'center', alignItems: 'center',
                            borderTopColor: mode == "clair" ? "#eee" : '#242424', paddingTop: 20
                        }}
                    >
                        <TouchableOpacity style={{
                            flexDirection: 'row'


                        }}
                            onPress={() => {
                                if (repeter == false) {
                                    setRepeter(true)
                                } else {
                                    setRepeter(false)
                                }
                            }}

                        >
                            <IconMat size={30} name={repeter ? "repeat" : "repeat-off"} color={repeter ? "orange" : color} />
                            {/* <Text style={{ color: repeter ? "orange" : color, fontSize: 14, marginLeft: 5 }}>Répéter</Text> */}
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}>


                            <TouchableOpacity  /* disabled={songIndexList ==0?true:false} */
                                style={{ marginRight: 10, backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => { TrackPlayer.seekTo(progress.position - 15); }}>
                                <IconMat name="rewind-15" size={30}
                                    color={mode == "clair" ? "black" : 'white'} />
                            </TouchableOpacity>
                            {

                                replay == false ?

                                    chargement || loadingPlayer ? <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10, backgroundColor: 'green', justifyContent: 'center' }} onPress={() => {



                                    }} >
                                        <ActivityIndicator size={30} color="white" />

                                    </TouchableOpacity> :

                                        <TouchableOpacity
                                            style={{
                                                width: 70, flexDirection: 'row', justifyContent: 'center',

                                                alignItems: 'center', height: 70,
                                                marginRight: 10, backgroundColor: 'green', borderRadius: 50
                                            }}
                                            onPress={() => {

                                                playPause(playBackState);


                                            }} >
                                            <Ionicons name={
                                                playBackState === State.Playing ? "ios-pause" : "ios-play"
                                            } size={40} color="white" style={{ zIndex: 1000, alignSelf: 'center', marginLeft: 5 }} />
                                        </TouchableOpacity>

                                    :

                                    <TouchableOpacity onPress={() => {

                                        //playPause(playBackState);

                                    }} >
                                        <IconMat name="replay" size={60} color="green" />

                                    </TouchableOpacity>

                            }

                            <TouchableOpacity onPress={() => { TrackPlayer.seekTo(progress.position + 15); }} style={{ backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <IconMat name="fast-forward-15" size={30} color={mode == "clair" ? "black" : 'white'} />

                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => {

                            if (visibility == true) {
                                setVisibility(false)
                            } else {
                                setVisibility(true)
                            }
                        }} style={{ textAlign: 'center', alignItems: 'center' }}>
                            <Icon size={30} name="list" color={mode == "clair" ? "gray" : 'white'} />
                            {/* <Text style={{ color: mode == "clair" ? "black" : 'white' }}>Chapitres</Text> */}
                        </TouchableOpacity>


                    </View>








                </View>
                {chargement || loadingPlayer ?
                    <Text style={{
                        position: 'absolute', bottom: 0,
                        fontFamily: 'Poppins-Italic'
                        , color: 'gray', alignSelf: 'center'
                    }}>
                        En cours de chargement.....
                    </Text>
                    : null}


                {
                    visibility ?
                        <TouchableWithoutFeedback onPress={() => { setVisibility(false) }}>
                            <View style={{ width: '100%', top: 50, backgroundColor: 'black', opacity: 0.5, height: '100%', position: 'absolute' }}>

                            </View>
                        </TouchableWithoutFeedback>
                        :
                        null
                }

                {/* Content of the full screen view */}
            </Animated.View>
        </PanGestureHandler>
  {/*   )} */}
</>
  )
}

export default PlayerScreen;



const styles = StyleSheet.create({
  containerMini: {
    justifyContent: "flex-end",
    height: DOCK_HEIGHT,
    zIndex: 2,
    backgroundColor:"#ff914c14",
    width:"100%",
    borderBottomWidth:3,
    borderBottomColor:'#91919152'
  },
  container: {
    height: '100%',
    width:'100%',
    backgroundColor:"#222831",
    
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
    backgroundColor:'#eef4f8'
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