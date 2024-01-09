import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  Easing,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import HeaderComponent from './HeaderComponent';
import ImageTitleAuthorComponent from './ImageTitleAuthorComponent';
import SlideControlButtonComponent from './SlideControlButtonComponent';
import { useProgress } from 'react-native-track-player';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { setAudio, setIdSong, setMinimized, setTitle } from '../../features/player/playerSlice';
import { addAlbumPlayer, initializedPlayer } from '../../services/player/PlayerService';
import { PodcastService } from '../../services/api/podcastService';

const PlayerAudio = () => {


  const [slidefinished, setSlideFinished] = React.useState(false);
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [item, setItem] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();


  const translateY = useSharedValue(0);
  const { width: wWidth, height: wHeight } = Dimensions.get("window");
  const height = Dimensions.get("window").height;
  const progress = useProgress();
  const playBackState = usePlaybackState();
  const minimize = useSelector((state) => state.audio.minimize);
  const album = useSelector((state) => state.audio.audio);
  const artist = useSelector((state) => state.audio.artist);
  const imagePodcast = useSelector((state) => state.audio.image);
  const color = useSelector((state) => state.audio.color);
  const idPodcast = useSelector((state) => state.audio.idPodcast);
  const podcastStoredLocal = useSelector((state) => state.podcast.podcastStoredLocal);
  const itemRef = useRef(item);



  const dispatch = useDispatch();


  TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
  useEffect(() => {
    
    
    // Stocker la valeur actuelle de item dans la référence
    itemRef.current = item;

    const timeoutId = setTimeout(() => {
      // Comparer la valeur actuelle de item avec la valeur stockée dans la référence
      if (item === itemRef.current) {

        PodcastService.updateNumberOfViewPodcast(idPodcast);

      }
    }, 5000);

    // Nettoyer la référence si le composant est démonté avant que le setTimeout ne soit atteint.
    return () => clearTimeout(timeoutId);
  }, [item]);
  useEffect(() => {


    if (!minimize) {
      openBottomSheet();

    }



  }, [minimize]);

  useEffect(() => {

    if(idPodcast != 0){


    }

  }, [idPodcast]);

  useEffect(() => {
          TrackPlayer.setupPlayer();

    if (album.length == 0) {



    } else {
      addAlbumPlayer(album);

    }

    //alert(album.length);

  }, [album]);

  useEffect(() => {
    //alert(slidefinished);
    if (slidefinished) {
      dispatch(setMinimized(true));


    }else{

      

    }



  }, [slidefinished]);



  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      const newTranslateY = ctx.startY + event.translationY;

      // Ajoutez des conditions pour vérifier la position limite supérieure et inférieure
      if (newTranslateY >= 0 && newTranslateY <= height) {
        translateY.value = newTranslateY;
      }
    },
    onEnd: () => {

      if (translateY.value > wHeight * 0.3) {
        runOnJS(setSlideFinished)(true);
        // Utilisez runOnJS pour exécuter de manière asynchrone la fonction setMinimizedWorklet sur le thread UI
        translateY.value = withSpring(wHeight);
      } else {
        runOnJS(setSlideFinished)(false);
        translateY.value = withTiming(0);
      }

    },
  });


  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
   
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { id,title, artwork, artist, episode, image } = track;
      dispatch(setIdSong(id));
      setItem(track);
      setTrackTitle(title);
      dispatch(setTitle(title));
      setTrackArtist(artist);
      setTrackArtwork(artwork);
      setImagePod(image);
      TrackPlayer.play();

      

    }
  });




  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const openBottomSheet = () => {
    setSlideFinished(false);
    translateY.value = withSpring(0, { damping: 20, stiffness: 30 });
  };
  const closeView = () => {
    translateY.value = withTiming(height); // Faites glisser la vue en bas de l'écran
        setSlideFinished(true)
    // Attendez que l'animation soit terminée pour masquer la vue
  };

  return (


    <PanGestureHandler onGestureEvent={gestureHandler1}>
      <Animated.View style={[styles.bottomSheet, animatedStyle, { backgroundColor: color, flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%' }]}>
        <HeaderComponent onPressBack={closeView} />
        <ImageTitleAuthorComponent author={artist} title={trackTitle} imageSource={imagePodcast} />
        <SlideControlButtonComponent currentAudio={item} />

      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
});

export default PlayerAudio;
