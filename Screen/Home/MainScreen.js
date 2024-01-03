
import * as React from 'react';
//import TopBarNavigation from '../../Navigation/TopBarNavigation';
import {

  View,
  StatusBar,
  Image

} from 'react-native';
import { ScrollView, Text, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet } from 'react-native';

import LivreHome from '../../MenuTopBar/LivreHome';
import LivreAudio from '../../MenuTopBar/LivreAudioHome';
import PodcastHome from '../../MenuTopBar/PodcastHome';
import MagasineHome from '../../MenuTopBar/MagasineHome';
import JollofTechHome from '../../MenuTopBar/JollofTechHome';
import WebHome from '../../MenuTopBar/WebHome';
import DocumentHome from '../../MenuTopBar/DocumentHome';
import Home from '../../MenuTopBar/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withStyleAnimation } from 'react-native-reanimated/lib/types/lib/reanimated2/animation';
import { useDispatch, useSelector } from 'react-redux';
import { getDataDB, saveDataApp, setHomeData } from '../../features/user/authSlice';
import { getDataDBasynStore } from '../../utils/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeArt from '../../MenuTopBar/WeArt';
import WebView from 'react-native-webview';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import VideoHome from '../../MenuTopBar/VideoHome';
const Tab = createMaterialTopTabNavigator();

const MainScreen = ({ navigation }) => {

  const dataAppDBSelect = useSelector((state) => state.userAuth.dataAppDB);
  const is_register = useSelector((state) => state.billing.isRegister);

  const [loaderweb, setloaderweb] = React.useState(false);

  const [news, setNews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const fetchDataHome = async () => {
    setIsLoading(true);
    //setError(false);

    let url = 'https://mobile.maadsene.com/api/home'; //data.access_token.token;
    try {

      await fetchWithTimeout(url, {
        method: "GET",
        //mode: "no-cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
        },
        timeout: 30000
      })
        .then(response => response.json())
        .then(data => {

          //setNews(data.news);
          //alert(JSON.stringify(data));
          dispatch(setHomeData(data));

        });
    } catch (e) {
      console.log(e)
      if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {

        // alert(e);
        //actions.logout();
      }

      //setError(true);
      //setIsLoading(false);

    }

  }

  React.useEffect(() => {

    fetchDataHome();

  }, []);
  //alert("is_register"+typeof(is_register));
  //alert("is_registerval"+is_register)

  React.useEffect(() => {

    //dispatch(getDataDB());
    (async () => {
      //AsyncStorage.removeItem('dataAppDB');

      //alert("is_register"+is_register);
      const dataAppDB = await getDataDBasynStore();
      //console.log(dataAppDB);
      if (!!dataAppDB) {

        dispatch(saveDataApp(dataAppDB));


        console.log(" -----------  data  ------------- : ");


      }




    })();




    //alert('je suis dans main');

  }, []);


  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column' }}>
      <StatusBar
        backgroundColor="white"

        barStyle="dark-content"
      />
      {/* <View style={styles.loading}>

          <View style={styles.bgloading}>
            <Text style={{alignItems:'center',justifyContent:'center'}}>Chargement...</Text>

            <ActivityIndicator size="small" color="gray" />
          </View>
          
        </View> */}
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <Image source={require("../../assets/logo-app2.png")} style={{ marginLeft: 5 }} />
        <Text style={{ fontSize: 22, color: 'black', marginLeft: 8, paddingTop: 3,fontFamily:'LilitaOne-Regular' }}>MAADSENE</Text>
        {is_register == false ?
          <TouchableOpacity onPress={() => navigation.navigate('Subscription')} style={{ alignContent: 'center', marginLeft: 12, alignSelf: 'center', alignItems: 'center', backgroundColor: '#7a00ff', padding: 8, paddingLeft: 30, paddingRight: 30, borderRadius: 20 }}>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700', letterSpacing: 1 }}>S'abonner</Text>
          </TouchableOpacity> : null
        }

      </View>
      <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#5656582b', backgroundColor: 'white' }}>
        <Tab.Navigator
          initialRouteName="Tous"

          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarIndicatorStyle: {
              backgroundColor: '#ffff',
              height: 5,

              

            },

            tabBarStyle:{backgroundColor:'#60103b'},

            tabBarActiveTintColor: '#ffd984',
            tabBarInactiveTintColor: 'white',
            tabBarLabelStyle: { fontSize: 13, color: 'white', fontWeight: "500", letterSpacing: 1 },
            tabBarItemStyle: { width: 'auto', padding: 0.1,  },
            lazy: true,
            swipeEnabled: false,
            timingConfig: { duration: 0 },

          }
          }
          sceneAnimationEnabled={false}

        //animationEnabled: false}          
        >
          <Tab.Screen name="Tous" initial component={Home}

            
            options={{
              tabBarPressColor:'#ffff',
              
              tabBarIndicatorStyle: {
                backgroundColor: '#60103b',
                height: 4,
              },
              
              tabBarLabelStyle: { padding: 10, fontSize: 13,  fontWeight: "500", letterSpacing: 1, }


            }} />
          <Tab.Screen name="Livres" component={LivreHome}

            options={{

              tabBarIndicatorStyle: {
                backgroundColor: '#60103b',
                height: 4,
              },
              tabBarLabelStyle: { padding: 10, fontSize: 13,  fontWeight: "500", letterSpacing: 1 }
            }} />
          <Tab.Screen name="Livres Audios" component={LivreAudio}
            options={{
              lazy: false,
              tabBarLabelStyle: { padding: 10, fontSize: 12,  fontWeight: "500", letterSpacing: 1 }
            }} />

          {/* <Tab.Screen name="Magazines" component={MagasineHome} /> */}
          <Tab.Screen name="Podcasts"
            options={{
              lazy: false,
              tabBarLabelStyle: { padding: 10, fontSize: 13,  fontWeight: "500", letterSpacing: 1 }
            }}
            component={PodcastHome} />
          <Tab.Screen name="WeART" title="WE ART" component={WeArt}
            options={{
              lazy: false,
              tabBarLabelStyle: { padding: 10, fontSize: 13, fontWeight: "500", letterSpacing: 1 }
            }} />

          <Tab.Screen name="JollofTech" component={JollofTechHome}

            options={{
              tabBarLabelStyle: { padding: 10, fontSize: 13,  fontWeight: "500", letterSpacing: 1 }
            }}
          />


          {/*           <Tab.Screen name="Documents" component={DocumentHome} /> */}
        </Tab.Navigator>
      </View>
      {/*       {loaderweb?
      
      
      <WebView 
          source={{uri:"https://reader.lesastic.com"}}
          style={{width:'100%', height:0}}
      
      />:null
    } */}
    </SafeAreaView>
  );


}

const HomeScreenTop = () => {

  return (
    <View>
      <Text>Home</Text>
    </View>

  )

}

const SettingsScreenTop = ({ navigation }) => {

  React.useEffect(() => {

    alert('Settings top')
  });
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>

  )

}

export default MainScreen;
const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#0000004d',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgloading: {
    backgroundColor: 'white',
    width: 200,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center'
  }
});
