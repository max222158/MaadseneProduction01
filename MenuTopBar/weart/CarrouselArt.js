import React from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CarrouselArt = ({navigation,route}) => {

  var { id, images,index } = route.params;
  return (
    <View style={styles.container}>
      <View style={{padding:5,paddingTop:20,backgroundColor:'#000'}}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <ImageViewer
        index={index}
        imageUrls={images}
        minScale={2}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black'
  },
});

export default CarrouselArt;