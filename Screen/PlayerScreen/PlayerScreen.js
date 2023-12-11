import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react';
import { Dimensions, StyleSheet,Image } from "react-native";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  {useEffect, useRef, useState} from 'react';
import {

  SafeAreaView,
  TouchableOpacity,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPlayer } from '../../features/player/playerSlice';


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

    // custom referecnces
    const scrollX = useRef(new Animated.Value(0)).current;
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
  return (
    <View style={minimize?[styles.containerMini,{bottom:marginB}]:styles.container}>
        {minimize?
        
    
          
            <View style={{

              //alignItems:"center",
              //justifyContent:"space-between",
              flexDirection:"row",

              marginRight:5}}
            >
              <View style={{width:'20%',justifyContent:'center',paddingLeft:5}}>
              <TouchableOpacity  onPress={()=>{setMinimize(false)}}>
                <Image
                  style={{
                    height:60,
                    width: 60,
                    borderRadius:50,
                    backgroundColor:'#eef4f8'
                  }}
                  source={{
                    uri:"https://maadsene.com/couverture/"+imagePod
                  }}
                />
                </TouchableOpacity>
              </View>

              <View style={{width:'60%'}}>
              <TouchableOpacity  onPress={()=>{setMinimize(false)}}>
              <View>
                <Text numberOfLines={1} style={{paddingTop:10,fontSize:16,fontWeight:'600',color:'black'}}>{trackTitle}</Text>
                <Text numberOfLines={1}  style={{paddingBottom:10,paddingLeft:10,fontSize:14,fontWeight:'500',color:'black'}}>
                  {trackArtist}
                </Text>
              
              </View>


                </TouchableOpacity>
              </View>
              
              <View style={{ flexDirection:"row",width:'20%',alignItems:'center',alignContent:'flex-end',justifyContent:'flex-end'}}>
                {!isLoading?
                <TouchableOpacity  onPress={() => togglePlayBack(playBackState)} style={{marginRight:10}}>
                    <Ionicons
                      name={
                        playBackState === State.Playing
                          ? 'ios-pause'
                          : 'ios-play'
                      }
                      size={_ICON_SIZE} color="black" 

                    />
                  </TouchableOpacity>:
                    <ActivityIndicator size={_ICON_SIZE} color="black" />
                    }

                
                <TouchableOpacity  onPress={()=>{dispatch(setPlayer(false))}} style={{marginRight:10}}>
                  <Ionicons name="close-sharp" size={_ICON_SIZE} color="black" />

                </TouchableOpacity>
                
  
                {/* <TouchableOpacity  onPress={()=>{setMinimize(false)}}>
                  <Ionicons name="chevron-up" size={_ICON_SIZE} color="black" />
                </TouchableOpacity> */}

                
              </View>
            </View>
          :
          

          <SafeAreaView style={styles.container}>
          <StatusBar
              backgroundColor="#222831"
              barStyle="dark-content"
          /> 
          <TouchableOpacity onPress={()=>{setMinimize(true)}} style={{marginLeft:20,position:"absolute",top:10}}>
            <Ionicons name="chevron-down-outline" size={30} color="#ffff" />
          </TouchableOpacity>     
          <View style={styles.mainContainer}>


          <View style={styles.mainWrapper}>
            <View style={[styles.imageWrapper, styles.elevation]}>
              <Image
                //   source={item.artwork}
                source={{uri:"https://maadsene.com/couverture/"+imagePod}}
                style={styles.musicImage}
              />
            </View>
            <Text style={{fontSize:18,color:'#FFFF',fontWeight:'700'}}>episode {episode}</Text>
          </View>
          
          <View>
            <Slider
              style={styles.progressBar}
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
            <View style={styles.progressLevelDuraiton}>
              <Text style={styles.progressLabelText}>
                {new Date(progress.position * 1000)
                  .toLocaleTimeString()
                  .substring(3)}
              </Text>
              <Text style={styles.progressLabelText}>
                {new Date((progress.duration - progress.position) * 1000)
                  .toLocaleTimeString()
                  .substring(3)}
              </Text>
            </View>
          </View>
          {/* music control */}
          <View style={styles.musicControlsContainer}>
          <TouchableOpacity onPress={()=>{skipToPrevious()}}>
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
          <TouchableOpacity onPress={()=>{skipToNext()}}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
            />
          </TouchableOpacity>
        </View>

            <View style={{paddingBottom:20}}>
              {!isLoading?
              <Text numberOfLines={1} style={[styles.songContent, styles.songTitle]}>
                {/* {songs[songIndex].title} */ trackTitle}
              </Text>:<Text numberOfLines={1} style={[styles.songContent, styles.songTitle]}>En cours...</Text>}
              <Text style={[styles.songContent, styles.songArtist]}>
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
          
          }
    </View>
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