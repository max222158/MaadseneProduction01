import { StyleSheet, Text, View ,Dimensions, Image, ImageBackground} from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PodcastItem1 = ({item}) => {
  return (
    <View style={[styles.mainView, {}]}>
    {/* Première vue superposée */}
    <View style={[styles.overlayView,{backgroundColor:item.color}]}></View>
    {/* Deuxième vue superposée */}
    <View style={[styles.overlayView1,{backgroundColor:item.color}]}>


    </View>
    {/* troisième vue superposée */}
    <View style={styles.overlayView2}>
    <ImageBackground source={{uri:item.image}} resizeMode="cover" 
            imageStyle={{ borderRadius: 10}} style={{ flex: 1,borderRadius:20 }}>
                    </ImageBackground>
    </View>
    <View style={{ height: windowWidth / 2 - 20 + 5 }}></View>
    <Text numberOfLines={1} style={styles.text1}>{item.name}</Text>
    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
  </View>
  )
}

export default PodcastItem1

const styles = StyleSheet.create({

    bg: {
        flex: 1,
        backgroundColor: 'white',
      },
      textCateg: {
        fontSize: 30,
        marginLeft: 19,
        marginTop: 18,
        marginBottom: 20,
      },
      ScrollViewcateg: {
        marginTop: 0
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text1: { fontWeight: "500", fontSize: 15, letterSpacing: 1, marginTop: 10 },
      text2: { paddingTop: 4, fontFamily: "Arial", fontSize: 14, color: "#868995", letterSpacing: 1 },
      mainView: {
        position: 'relative', // ajustez la largeur selon vos besoins
        aspectRatio: 1 / 1,
        marginRight: 10,// ajustez la hauteur selon vos besoins
        width: windowWidth / 2 - 20,
      },
      overlayView: {
        position: 'absolute',
        top: 15,
        left: 15,
        width: windowWidth / 2 - 35,
        height: windowWidth / 2 - 35,
        borderRadius: 10,
        opacity: 0.4 // couleur semi-transparente pour l'overlay
      },
      overlayView1: {
        position: 'absolute',
        top: 6,
        left: 6,
        right: 10,
        width: windowWidth / 2 - 30,
        aspectRatio: 1 / 1,
        borderRadius: 10,
        opacity: 0.9 // couleur semi-transparente pour l'overlay
      },
      overlayView2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 10,
        width: windowWidth / 2 - 30,
        aspectRatio: 1 / 1,
        borderRadius: 10,

        // couleur semi-transparente pour l'overlay
      },
})