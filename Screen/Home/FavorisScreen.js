import React, { useState, useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { KeyboardAvoidingView, PlatformTouchableWithoutFeedback, Keyboard, StyleSheet, FlatList } from 'react-native';
import { StatusBar, Button, ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View, SafeAreaView, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeToList } from '../../features/favorite/favoriteSlice';
const { width, height } = Dimensions.get('window');


const numColumns = 3;



const dataForTab2 = [
  { id: 1, title: 'Element 1 for Tab 2' },
  { id: 2, title: 'Element 2 for Tab 2' },
  { id: 3, title: 'Element 3 for Tab 2' },
];

const dataForTab3 = [
  { id: 1, title: 'Element 1 for Tab 3' },
  { id: 2, title: 'Element 2 for Tab 3' },
  { id: 3, title: 'Element 3 for Tab 3' },
];




const FavorisScreen = ({ navigation }) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const favorite = useSelector((state) => state.favorite.favorite);
  const livres = favorite.filter(element => element.support === 'Livre');
  const podcasts = favorite.filter(element => element.support === 'podcast');
  const livreaudio = favorite.filter(element => element.support === 'Livre audio');
  
  const [activeTab, setActiveTab] = useState(1);
  let data;
  if (activeTab === 1) {
    data = livres;
  } else if (activeTab === 2) {
    data = podcasts;
  } else {
    data = livreaudio;
  }

  React.useEffect(() => {

    //console.log("favorite",Object.keys(favorite).length);
    //console.log("list favorite",favorite);


  });

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    console.log(favorite);
    

  }, []);
  const dispatch = useDispatch();
  const onTapRemoveTolist = (movie) => {


    dispatch(removeToList(movie));
    //console.log("list favorite",favorite)
  }
  useEffect(() => {
    setImageWidth((width - 20) / numColumns);
  }, [width]);



  const handleTabPress = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  if (isLoading) {

    return (

      <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size={40} color="#691c43" />
        <Text>En cours...</Text>
      </View>
    );
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#ffff', padding: 0, alignItems: 'center' }}>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 1 && styles.activeTabButton,
            activeTab === 1 && styles.activeTabButtonLeft,
          ]}
          onPress={() => handleTabPress(1)}
        >
          <Text style={[styles.tabButtonText, activeTab === 1 && styles.activeTabButtonText]}>Livres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 2 && styles.activeTabButton]}
          onPress={() => handleTabPress(2)}
        >
          <Text style={[styles.tabButtonText, activeTab === 2 && styles.activeTabButtonText]}>Podcasts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 3 && styles.activeTabButton,
            activeTab === 3 && styles.activeTabButtonRight,
          ]}
          onPress={() => handleTabPress(3)}
        >
          <Text style={[styles.tabButtonText, activeTab === 3 && styles.activeTabButtonText]}>Livres audios</Text>
        </TouchableOpacity>
      </View>
      {Object.keys(data).length != 0 ?
        <FlatList
          data={data}
          numColumns={numColumns}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ width: imageWidth, marginTop: 15,borderRadius:15 }}>
              <TouchableOpacity onPress={() => {

                if (item.support == "Vidéo") {
                  navigation.navigate('ReadVideo', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.resume,
                    lien_video: item.lien_livre,
                    support: item.support,
                  });

                }
                if (item.support == "podcast") {


                  navigation.navigate('DetailsPodcast', {
                    id: item.id,
                    auteur: item.artist,
                    image: item.image,
                    titre: item.title,
                    categorie: item.categorie,
                    resume: item.description,
                    book: item.lien,
                    support: item.support,
                    name: item.name,
                    episode: item.episode
                  });
                }
                if (item.support == "Livre") {

                  navigation.navigate('DetailsBook', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.resume,
                    book:  item.epub,


                  });

                }

                if (item.support == "Livre audio") {

                  navigation.navigate('DetailsBookAudio', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.description,
                    url: item.lien_livre,
                    support: item.support,
                  });



                }
                
              }}>

                <ImageBackground
                  borderRadius={10}
                  source={{ uri: 'https://maadsene.com/couverture/' + item.image }}
                  resizeMode='cover'
                  style={{ width: imageWidth-5, marginTop: 15,aspectRatio: item.support == "podcast"?1/1:1/1.5, backgroundColor: '#007bff1c',borderRadius:15 }}
                >
                  {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}
                  <TouchableOpacity onPress={()=>{onTapRemoveTolist(item)}} style={{marginTop:-10}}>
          
                    <Ionicons name="ios-bookmark-sharp" size={30} color="#60103b" />
                  
                  </TouchableOpacity>

                </ImageBackground>
                

{/*                 <Image style={{ borderRadius: 10, width: imageWidth - 5, aspectRatio: 1 / 1.5, backgroundColor: '#007bff1c' }} source={{ uri: "https://maadsene.com/couverture/" + item.image }}>
                
                </Image> */}
                  
              </TouchableOpacity>

            </View>
          )}
          contentContainerStyle={{ justifyContent: 'center' }}
        />
        :
        
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          { 
            activeTab == 1 ?
/*             <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={require('../../assets/6263.jpg')} style={{ width: 300, aspectRatio: 2,  }} />
          <Text style={{ fontSize: 20 }}>La liste est vide</Text>
          <Text style={{ fontSize: 18, padding: 25, letterSpacing: 1 }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> */
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ImageBackground
                borderRadius={10}
                source={require('../../assets/6263.jpg')}
                
                style={{ width: width-5, marginTop: 15,aspectRatio: 2, backgroundColor: '#007bff1c',borderRadius:15 }}
              >
                {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}

              </ImageBackground>
             
          <Text style={{ fontSize: 18,fontFamily:'Lobster-Regular',marginTop:10 }}>La liste de livres est vide</Text>
          <Text style={{ fontSize: 17, padding: 25, letterSpacing: 1,textAlign:'center' }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> 
            :null}

          {activeTab == 2 ?
/*             <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={require('../../assets/6263.jpg')} style={{ width: 300, aspectRatio: 2,  }} />
          <Text style={{ fontSize: 20 }}>La liste est vide</Text>
          <Text style={{ fontSize: 18, padding: 25, letterSpacing: 1 }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> */
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ImageBackground
                borderRadius={10}
                source={require('../../assets/login/imgpodcast.jpg')}
                resizeMode="contain"
                style={{ width: width-5, marginTop: 15,aspectRatio: 2, backgroundColor: '#007bff1c',borderRadius:15 }}
              >
                {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}

              </ImageBackground>
             
          <Text style={{ fontSize: 18,fontFamily:'Lobster-Regular',marginTop:10 }}>La liste de podcasts est vide</Text>
          <Text style={{ fontSize: 17, padding: 25, letterSpacing: 1,textAlign:'center' }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> 
            :null}
          {activeTab == 3 ?
/*             <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image source={require('../../assets/6263.jpg')} style={{ width: 300, aspectRatio: 2,  }} />
          <Text style={{ fontSize: 20 }}>La liste est vide</Text>
          <Text style={{ fontSize: 18, padding: 25, letterSpacing: 1 }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> */
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ImageBackground
                borderRadius={10}
                source={require('../../assets/5444276.jpg')}
                resizeMode="contain"
                style={{ width: width-5, marginTop: 15,aspectRatio: 2, backgroundColor: '#007bff1c',borderRadius:15 }}
              >
                {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}

              </ImageBackground>
             
          <Text style={{ fontSize: 18,fontFamily:'Lobster-Regular',marginTop:10 }}>La liste de livres audios est vide</Text>
          <Text style={{ fontSize: 17, padding: 25, letterSpacing: 1,textAlign:'center' }}>Explorez notre bibliothèque pour ajouter des éléments aux favoris</Text>
            </View> 
            :null}
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    overflow: 'hidden',
    width:'auto'
  },
  tabButton: {
    paddingVertical: 10,
    alignItems: 'center',
    padding:10,
    paddingLeft:15,
    paddingRight:15
  },
  tabButtonText: {
    color: '#666',
  },
  activeTabButton: {
    backgroundColor: '#ff914c',
    borderRadius:15
  },
  activeTabButtonText: {
    color: '#fff',
  },
  activeTabButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  activeTabButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default FavorisScreen;
