import React from 'react';
import {View, Text, StyleSheet, ImageBackground,Image} from 'react-native';

export default BookItem3 = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.img_back} >
        <Image source={{uri: 'https://maadsene.com/couverture/' + item.image}} style={{width:'100%',height:'100%',borderRadius:5}} />
{/*         <ImageBackground
          source={{uri: 'https://maadsene.com/couverture/' + item.image}}
          resizeMode="contain"
          imageStyle={{ borderRadius: 5,height:200}}
          style={styles.backgr}></ImageBackground> */}
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
    height: 180,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#eef4f8',
  },
  container: {width: 130, marginLeft: 8,borderRadius: 20,},
  backgr: {flex: 1, height: 180,borderRadius: 20,},
  view_text: {paddingLeft: 8, paddingTop: 5,},
  text1: {fontWeight: "500",fontSize:14,letterSpacing: 1},
  text2: {paddingTop: 4,fontFamily: "Arial",fontSize:12,color:"#868995",letterSpacing: 1},
});
