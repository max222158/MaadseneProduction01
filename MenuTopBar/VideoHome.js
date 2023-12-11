import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const FullscreenVideo = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleToggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleToggleFullscreen}
        style={styles.fullscreenButton}>
        {fullscreen ? (
          <Video
            source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
            style={styles.video}
            resizeMode="cover"
            repeat={true}
          />
        ) : (
          <View style={styles.thumbnail} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenButton: {
    flex: 1,
    alignSelf: 'stretch',
  },
  thumbnail: {
    flex: 1,
    backgroundColor: 'grey',
  },
  video: {
    flex: 1,
  },
});

export default FullscreenVideo;
