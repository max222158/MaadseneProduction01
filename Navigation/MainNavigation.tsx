
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../Screen/Home/MainScreen'
import TabBottomNavigation from './TabBottomNavigation'
import BooksDetails from '../Screen/Details/BooksDetails/BooksDetails';
import PodcastDetails from '../Screen/Details/BooksDetails/PodcastDetails';

import ReadBookScreen from '../Components/ReadBook/ReadBookScreen';
import Reader from '../src/screens/Reader/index'
import { ReadSoundComponent } from '../Components/ReadSound/ReadSoundComponent';
import { ReadVideoScreen } from '../Components/ReadVideo/ReadVideoScreen';
import { SafeAreaView, Button, Text, TouchableOpacity, View, ScrollView, StatusBar, Dimensions, FlatList, Pressable, StyleSheet, ImageBackground, ActivityIndicator, Modal, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import Subcription from '../Screen/Home/Subcription';
import { ReadBookAudio } from '../Components/ReadBookAudio/ReadBookAudio';
import KaduScreen from '../MenuTopBar/JollofTech/kaduScreen';
import CinemaScreen from '../MenuTopBar/JollofTech/cinemaScreen';
import DetailsWeArt from '../MenuTopBar/weart/detailsWeArt';
import {
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import PlayerScreen from '../Screen/PlayerScreen/PlayerScreen';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ReadVideoCinema } from '../Components/ReadVideo/ReadVideoCinema';
import CarrouselArt from '../MenuTopBar/weart/CarrouselArt';
import PodcastDetailsScreen from '../Screen/Details/PodcastDetailsScreen';
import PlayerAudio from '../Screen/PlayerScreen/PlayerAudio';
import Search from '../Screen/Search/Search';



const Stack = createNativeStackNavigator();
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - (windowHeight + StatusBar.currentHeight);
const MainNavigation = () => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const stateAudio = useSelector(state => state.audio.miniplayer);
  const isUpdate = useSelector(state => state.userAuth.isUpdate);
  //alert("---------------"+JSON.stringify(stateAudio));
  // variables
  const snapPoints = ['70%'];
  const [isVisible, setIsVisible] = React.useState(true);
  React.useEffect(() => {

    bottomSheetModalRef.current?.present();


  }, []);

  return (

    <SafeAreaProvider>

      <SafeAreaView style={{ flex: 1 }}>

        <StatusBar backgroundColor="white" barStyle='dark-content' />
        {/*         {stateAudio?
        <PlayerScreen marginB={navbarHeight}/>:null} */}
        <PlayerAudio />
        <Stack.Navigator>

          <Stack.Screen
            name="Main"
            component={TabBottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DetailsBook" options={{
            title: "Details du livre",

            headerStyle: {
              backgroundColor: '#ffff',
            }, headerShadowVisible: false
          }} component={BooksDetails}



          />
          {/*           <Stack.Screen name="DetailsPodcast" options={{
            title: "Podcast",

            headerStyle: {
              backgroundColor: '#ffff',
            }, headerShadowVisible: false
          }} component={PodcastDetails}



          /> */}
          <Stack.Screen
            name="ReadBook"
            options={{
              lazy: false,
              title: '',
              headerStyle: {
                backgroundColor: '#ffff'
              },
              headerShadowVisible: false,
              headerShown: false
            }}
            component={Reader}

          />
          <Stack.Screen
            name="ReadSound"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#ffff',
              },
              headerShadowVisible: false,
              headerShown: false
            }}

            component={ReadSoundComponent}
          />
          <Stack.Screen
            name="ReadBookAudio"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#ffff',
              },
              headerShadowVisible: false,
              headerShown: false
            }}

            component={ReadBookAudio}
          />
          <Stack.Screen
            name="ReadVideo"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'black',



              },

              headerShadowVisible: false,
              headerShown: false
            }}
            component={ReadVideoScreen}
          />
          <Stack.Screen
            name="ReadVideoCinema"
            options={{
              title: '',
              headerStyle: {
                backgroundColor: 'black',



              },

              headerShadowVisible: false,
              headerShown: false
            }}
            component={ReadVideoCinema}
          />
          <Stack.Screen
            name="Subscription"
            options={{
              title: 'Abonnement',
              headerStyle: {

              },

            }}
            component={Subcription}
          />
          <Stack.Screen
            name="kadu"
            options={{
              title: 'Kadu',
              headerStyle: {

              },

            }}
            component={KaduScreen}
          />
          <Stack.Screen
            name="cinema"
            options={{
              title: 'Cinéma',
              headerStyle: {

              },

            }}
            component={CinemaScreen}
          />

          <Stack.Screen
            name="detailsWeArt"
            options={{
              title: 'Détails',
              headerStyle: {

              },
              headerShadowVisible: false,
              headerShown: false

            }}
            component={DetailsWeArt}
          />

          <Stack.Screen
            name="detailsWeArtImage"
            options={{
              title: 'Images',
              headerStyle: {

              },
              headerShadowVisible: false,
              headerShown: false


            }}
            component={CarrouselArt}
          />

          <Stack.Screen
            name="detailsPodcast"
            options={{

              headerStyle: {

              },
              headerShadowVisible: false,
              headerShown: false


            }}
            component={PodcastDetailsScreen}
          />

          <Stack.Screen
            name="search_page"
            options={{
              title:"Recherche",

              headerStyle: {
                

              },
              /*               headerShadowVisible: false,
                            headerShown: false */


            }}
            component={Search}
          />

        </Stack.Navigator>
        <Modal visible={isUpdate} transparent={true} >

          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#00000059' }}>
            <View style={{ width: 300, backgroundColor: '#ffff', alignSelf: 'center', borderRadius: 10, alignItems: 'center' }}>
              <View style={{ backgroundColor: '#2584ff', width: '100%', borderTopEndRadius: 10, borderTopLeftRadius: 10, alignItems: 'center', paddingBottom: 10 }}>
                <Text style={{ marginTop: 15, color: 'white', fontSize: 19, fontWeight: '600' }}>Nouvelle mise à jour</Text>
              </View>
              <Text style={{ marginTop: 15, marginBottom: 10, color: '#2d3136', fontSize: 17, padding: 20, letterSpacing: 1.5 }}>Une nouvelle version de MAADSENE est disponible dans playstore</Text>

              <TouchableOpacity onPress={() => {

                const GOOGLE_PACKAGE_NAME = 'com.maadseneapp';

                Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);


              }} style={{ padding: 10, backgroundColor: '#2584ff', borderRadius: 30, paddingLeft: 30, paddingRight: 30, marginBottom: 30 }}>

                <Text style={{ color: '#ffff', fontSize: 18 }}>Télécharger</Text>
              </TouchableOpacity>

            </View>


          </View>


        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>

  );


};


export default MainNavigation;