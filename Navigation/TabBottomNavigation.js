import * as React from 'react';
import { KeyboardAvoidingView,Text, View, Button, TouchableOpacity, Image,Dimensions,ActivityIndicator, StatusBar } from 'react-native';
import { createBottomTabNavigator,BottomTabBar } from '@react-navigation/bottom-tabs';
import MainScreen from '../Screen/Home/MainScreen'
import FavorisScreen from '../Screen/Home/FavorisScreen'
import SearchScreen from '../Screen/Home/SearchScreen'
import SettingsScreen from '../Screen/Home/SettingsScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryScreen from '../Screen/Home/CategoryScreen'
import HomeSettings from '../Screen/Settings/HomeSettingsScreen';
import PlayerScreen from '../Screen/PlayerScreen/PlayerScreen'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PodcastDetails from '../Screen/Details/BooksDetails/PodcastDetails';
import LoaderComponent from '../Components/LoaderComponent';
import VideoScreen from '../Screen/Video/VideoScreen';
import MiniPlayer from '../Screen/PlayerScreen/MiniPlayer';
import { DetailsBookAudio } from '../Components/DetailsBookAudio/DetailsBookAudio';
import BooksAudioDetails from '../Screen/Details/BookAudioDetails';




const Tab = createBottomTabNavigator();

export default function TabBottomNavigation() {
  const stateAudio = useSelector(state=>state.audio.playerOff);
  
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
    
  },[]);


   if(isLoading){

    return(

      <LoaderComponent/>
    );
  } 
  return (
    <KeyboardAvoidingView
      behavior={height}
      enabled={true}
      style={{flex:1}}
    >

      <Tab.Navigator

        tabBar={(props)=>(

          <>
            {
              !stateAudio?<MiniPlayer />:null
            }
            <BottomTabBar {...props} />
          </>
        )}

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else            if
            (route.name === 'Vidéos') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Recherche') {
              iconName = focused ? 'ios-search-sharp' : 'ios-search-outline';
            } else if (route.name === 'Favoris') {
              iconName = focused ? 'ios-bookmark-sharp' : 'ios-bookmark-outline';
            } else if
              (route.name === 'Compte') {
              iconName = focused ? 'person' : 'person-outline';
            }



            // You can return any component that you like here!


            return <View><Ionicons name={iconName} size={size} color={color} /></View>;
          },
          tabBarActiveTintColor: '#60103b',
          tabBarInactiveTintColor: 'black',
          tabBarHideOnKeyboard:true,
          
        })}
      >
        <Tab.Screen name="Home" component={MainScreen} options={{

          title: "MaadSene",
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffff',
          }, headerShadowVisible: false, headerLeft: () => <HeaderLeft />,
        }} />
        <Tab.Screen name="Recherche" component={SearchScreen}
          options={{
            tabBarVisible: false, headerStyle: {
              backgroundColor: '#ffff',
            }, headerShadowVisible: false, headerShown: false,lazy:false
            

          }}

        />

        
<Tab.Screen name="Vidéos" component={VideoScreen}           
          options={{
            lazy:false
          }}
          />
        <Tab.Screen name="Favoris" component={FavorisScreen}           
          options={{
            lazy:false
          }}
          />

        <Tab.Screen name="Compte" component={SettingsScreen} />
        <Tab.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title:"Catégorie",
            tabBarButton: (props) => null, //like this
            //this is additional if you want to hide the whole bottom tab from the screen
          }}
        />
        <Tab.Screen
          name="HomeSettings"
          component={HomeSettings}
          options={{
            title:"",
            tabBarButton: (props) => null, //like this
            //this is additional if you want to hide the whole bottom tab from the screen
          }}
        />
      
          <Tab.Screen name="DetailsPodcast" options={{
            title: "Podcast",
            tabBarButton: (props) => null, 

            headerStyle: {
              backgroundColor: '#ffff',
            }
          }} component={PodcastDetails}



          />
          <Tab.Screen name="DetailsBookAudio" options={{
            title: "Livre audio",
            tabBarButton: (props) => null, 
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffff',
            },
            
          }} component={BooksAudioDetails}



          />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

export function HeaderLeft() {

  return (
    <View style={{ flex: 1, alignContent: "center", alignItems: "center" }}>
      <Image source={require('../assets/logo-app2.png')} style={{ resizeMode: "contain", flex: 1 }} />
    </View>
  );

}

export function Subcription () {

  return (
    <TouchableOpacity style={{ flex: 1, alignContent: "center", alignItems: "center",backgroundColor:'green' }}>
      <Text>S'abonner</Text>
    </TouchableOpacity>
  );

}