import React from 'react';
import {View, Text, StyleSheet, ImageBackground,Image} from 'react-native';

export default BookItem3 = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.img_back} >
        <Image source={{uri: item.image}} style={{width:'100%',height:'100%',borderRadius:5}} />

          {item.free == 1?
                                      <View style={{flexWrap: 'wrap',position:'absolute'}}>
                                      <Text style={{alignSelf: 'flex-start',backgroundColor:"white",color:"#60103b",fontFamily:'Poppins-Bold', margin:3,fontSize:11,borderRadius:5,paddingLeft:5,paddingRight:5,paddingTop:2}}>Gratuit</Text>
                                    </View>:null

                }
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
