import { View, Text, Image, Alert, TouchableOpacity, Animated, Dimensions, StyleSheet, Pressable, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setMinimized, setPausePlay, setPausePlay1, setPlayerOff } from '../../features/player/playerSlice';
import TrackPlayer from 'react-native-track-player';
//import { setMinimized, setMinimized1, setPlaypause } from '../../features/player/playerSlice';

const { width } = Dimensions.get('window');



const Pulse = ({ delay = 0, repeat }) => {
  const animation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 3000,
      delay: delay,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (repeat) {
        animation.setValue(0);
        startAnimation();
      }
    });
  };

  startAnimation();

  const animatedStyles = {
    opacity: animation.interpolate({
      inputRange: [1, 1],
      outputRange: [0.6, 0],
      extrapolate: 'clamp',
    }),
    transform: [{ scale: animation }],
  };

  return <Animated.View style={[styles.circle, animatedStyles]} />;
};
export default function MiniPlayer() {

  const [pulse, setPulse] = useState([1]);

  const dispatch = useDispatch();
  const image = useSelector((state) => state.audio.image);
   const artist = useSelector((state) => state.audio.artist);
  const title = useSelector((state) => state.audio.title);
  const playpause = useSelector((state) => state.audio.playpause);
  const playpause1 = useSelector((state) => state.audio.playpause1);
  const background = useSelector((state) => state.audio.color); 


  const fullScreen = () => {

    //dispatch(setMinimized1(true));
    dispatch(setMinimized(false));
  }

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });


  return (
    <View style={{ width: '100%', opacity: 1, height: 55, paddingRight: 10, paddingLeft: 10, position: 'absolute', bottom: 52, zIndex: 80, }}>
      <View style={{ backgroundColor: background, height: 55, borderRadius: 5, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: 40, height: 40, zIndex: 50 }} />
        <TouchableOpacity onPress={fullScreen} style={{ marginLeft: 8, flexGrow: 1 }}>

          <Animated.View style={{ width: width - 40 - 80, zIndex: 10, transform: [{ translateX }] }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#ffff', }} numberOfLines={1}>{title}</Text>
          </Animated.View>
          <Text style={{ color: '#ffff', marginTop: -3 }}>{artist}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginRight: 10, position: 'absolute', right: 0, zIndex: 900, backgroundColor: background }} numberOfLines={1}>

          <TouchableOpacity style={{justifyContent:'center', marginRight: 30, height: 50, }}
            onPress={() => {
/*               dispatch(setPlaypause(playpause1 + 1))

              dispatch(setMinimized(true)); */
              dispatch(setPlayerOff(true));

            }}
          >
            <Ionicons name="close-circle-outline"
              size={35} color="white" />
          </TouchableOpacity>


          <View style={[styles.containercircle, { alignItems: 'center', justifyContent: 'center' }]}>

              <TouchableOpacity style={[styles.innerCircle,{  backgroundColor:background}]}
                onPress={() => {

                  //playPause(playBackState);
                  dispatch(setPausePlay1(playpause1 + 1))

                  if(playpause == 0){
                    dispatch(setPausePlay(1))
                  }else{
                    dispatch(setPausePlay(0))
                  }

                }}
              >
                <Ionicons name={
                   playpause === 0 ? "pause-circle-sharp"  : "play-circle-sharp" 
                } size={35} color="white" />
              </TouchableOpacity>
            {pulse.map((item, index) => (
              <Pulse key={index} repeat={index === 0} />
            ))}
          </View>

        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  containercircle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eee',
    padding:0,
    marginRight:10
    
  },
  circle: {
    width: 80,
    borderRadius: 150,
    height: 80,
    position: 'absolute',
    borderColor: '#bbb',
    borderWidth: 5,
    backgroundColor: '#ffff',
    
  },
  innerCircle: {
    width: 40,
    borderRadius: 100,
    height: 40,
    zIndex: 100,
    position: 'absolute',
  
    justifyContent:"center",
    alignItems:'center',
    flexDirection:'row'
  },
})