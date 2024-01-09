import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

export default BookAudio = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.img_back}>
        <ImageBackground
          source={{uri:  item.image}}
          resizeMode="contain"
          imageStyle={{ borderRadius: 5,height:200}}
          style={styles.backgr}></ImageBackground>
      </View>
      <View style={styles.view_text}>
        <Text numberOfLines={1} style={styles.text1}>
          {item.titre}
        </Text>
        <Text style={styles.text2} numberOfLines={1}>
          {item.auteur}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img_back: {
    height: 200,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#eef4f8',
  },
  container: {width: 160, marginLeft: 8,borderRadius: 20,},
  backgr: {flex: 1, height: 200,borderRadius: 20,},
  view_text: {paddingLeft: 8, paddingTop: 5,},
  text1: {fontWeight: "500",fontSize:15,letterSpacing: 1},
  text2: {paddingTop: 4,fontFamily: "Arial",fontSize:14,color:"#868995",letterSpacing: 1},
});
