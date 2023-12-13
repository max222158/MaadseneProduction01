import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
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

const PlayerAudio = () => {
  const translateY = useSharedValue(0);
  const { width: wWidth, height: wHeight } = Dimensions.get("window");
  const height = Dimensions.get("window").height;
  const progress = useProgress();
  const playBackState = usePlaybackState();




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
          translateY.value = withSpring(wHeight);
        } else {
            translateY.value = withTiming(0);
        }
    },
});

const closeView = () => {
  translateY.value = withTiming(wHeight); // Faites glisser la vue en bas de l'écran
 
  // Attendez que l'animation soit terminée pour masquer la vue
};



  
const animatedStyle = useAnimatedStyle(() => {
  return {
      transform: [{ translateY: translateY.value }],
  };
});

  const openBottomSheet = () => {
    translateY.value = withSpring(0,{ damping: 20, stiffness: 30 });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={openBottomSheet}>
        <Text>Ouvrir le Bottom Sheet</Text>
      </TouchableOpacity>
      <PanGestureHandler onGestureEvent={gestureHandler1}>
        <Animated.View style={[styles.bottomSheet, animatedStyle,{backgroundColor:'blue'}]}>
            <HeaderComponent  />
            <ImageTitleAuthorComponent author="author" title="titre du son " imageSource="" />
            <SlideControlButtonComponent progress={progress} playBackState={playBackState} State={State} />

        </Animated.View>
      </PanGestureHandler>
      </View>
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
