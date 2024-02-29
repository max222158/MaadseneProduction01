/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import IndexScreen from './Screen/IndexScreen';
//import { store } from './features/store';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

import {
  getUserData,
  clearUserData,
  getDataDBasynStore,
  getLogged,
  URL_BASE,
} from './utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice, { setIsRegister, setIsUpdate, setUrlWebview } from './features/user/authSlice';
import favoriteSlice, { setBooksStored } from './features/favorite/favoriteSlice';
import { saveUser, addToken, saveLogged } from './features/user/authSlice';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './Navigation/AuthNavigation';
import MainNavigation from './Navigation/MainNavigation';
import { combineReducers } from 'redux';
import RNBootSplash from 'react-native-bootsplash';
import thunk from 'redux-thunk';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 //import CodePush from 'react-native-code-push'; 
import subscriptionSlice, { billing, saveRegistration, setReamingDay, setRegistration }  from './features/subcription/subscriptionSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import playerSlice, { setAudioStart, setPlayerOff } from './features/player/playerSlice';
import moment from 'moment';
import { Modal } from 'react-native';
import SearchSlice from './features/search/SearchSlice';
import PodcastSlice, { setPodcastStored } from './features/podcast/PodcastSlice';
import TrackPlayer from 'react-native-track-player';
import { PodcastService } from './services/api/podcastService';
import { BooksService } from './services/api/booksService';
import { PlaybackService } from './service';

const reducer = combineReducers({
  userAuth: authSlice,
  favorite: favoriteSlice,
  billing: subscriptionSlice,
  audio: playerSlice,
  search:SearchSlice,
  podcast:PodcastSlice
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorite'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
let persistor = persistStore(store);

const App = () => {

//  TrackPlayer.registerPlaybackService(() => PlaybackService);

  function calculateDaysDifference(startDate, endDate) {
    // Convertir les chaînes de date en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculer la différence en millisecondes
    const timeDifference = end - start;
  
    // Convertir la différence en jours
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    // Retourner le résultat arrondi
    return Math.round(daysDifference);
  }

  
  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const isSubscription = useSelector(state => state.billing.isRegister);
  const logged = useSelector(state => state.userAuth.logged);
  //alert("685522255144"+isSubscription);
 
  console.log('islogged ==========  : ', logged);

  
  const dispatch = useDispatch();

  React.useEffect(() => {
    //clearUserData('userData');
    //console.log("user data indkqex screen",userDataSelect);
    (async () => {
      const dataAppDB = await getDataDBasynStore();
      const userData = await getUserData();

      //console.log("------dataappdb---------- : ",dataAppDB);
      //dispatch(setRegistration(true)); 
      if (!!userData) {

        //setIsLogged(true);
        dispatch(saveUser(userData));
        dispatch(saveLogged(true));

        dispatch(billing());

      }
      await TrackPlayer.setupPlayer();
    })();


    (async () => {





      //userData.user.date_subcription;

      const userData = await getUserData();

      let url = 'https://mobile.maadsene.com/api/auth/getUser?id='+userData.user.id;
      //console.log(userData.user.id);

      try {
  
        await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/json",
            Authorization: "Bearer " + userData.token,
          },
        })
          .then(response => response.json())
          .then(data => {
   
  
            //alert(data.url_base);
            dispatch(setUrlWebview(data.url_base));

            //console.log(data.user.subcription);

            /*let dateactu = moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD hh:mm:ss a');

            return alert(dateactu)*/
            if(data.update == 1)
            {
                dispatch(setIsUpdate(true));

            }

            //console.log(data);

            //let today = new Date();
            let end_date_subcription  = new Date(data.user.end_date_subcription);
            let today = new Date();
            //alert(today);
            //alert(calculateDaysDifference(new Date, end_date_subcription))

            if(calculateDaysDifference(new Date, end_date_subcription)<0 ){
             dispatch(setReamingDay(0));
            }else{
             dispatch(setReamingDay(calculateDaysDifference(new Date, end_date_subcription)));
            }

            if(today < end_date_subcription){

               console.log("bonnnnnnnnnnnnnnnnnnnn");
              dispatch(saveRegistration(true));
     
             }else{
               dispatch(saveRegistration(false));
               console.log("mauvaissssssssssss");
             }

            //AsyncStorage.setItem('dataAppDB', data1);
            return data;
          });
      } catch (e) {
       //console.log(e);
      
        if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {
  
          //
          //actions.logout();
        }
  
      }



      

      //console.log("ridd",today);

      //console.log("ridd11111111",end_date_subcription);
      //if()



      
      
    })(); 
  }, []);



  React.useEffect(() => {

   const interval = setInterval(() => {

      (async () => {





       //userData.user.date_subcription;

       const userData = await getUserData();

       let url = 'https://mobile.maadsene.com/api/auth/getUser?id='+userData.user.id;
       //console.log(userData.user.id);

       try {
   
         await fetch(url, {
           method: "GET",
           headers: {
             Accept: "application/json, text/plain, */*",
             // "Content-Type": "application/json",
             Authorization: "Bearer " + userData.token,
           },
         })
           .then(response => response.json())
           .then(data => {
    
   
             //let data1 = JSON.stringify(data);

             //console.log(data.user.subcription);

             /*let dateactu = moment()
             .utcOffset('+05:30')
             .format('YYYY-MM-DD hh:mm:ss a');

             return alert(dateactu)*/
             if(data.update == 1)
             {
                 dispatch(setIsUpdate(true));

             }

             //console.log(data);

             //let today = new Date();
             let end_date_subcription  = new Date(data.user.end_date_subcription);
             let today = new Date();
             //alert(today);
             //alert(calculateDaysDifference(new Date, end_date_subcription))

             if(calculateDaysDifference(new Date, end_date_subcription)<0 ){
              dispatch(setReamingDay(0));
             }else{
              dispatch(setReamingDay(calculateDaysDifference(new Date, end_date_subcription)));
             }

             if(today < end_date_subcription){

                console.log("bonnnnnnnnnnnnnnnnnnnn");
               dispatch(saveRegistration(true));
      
              }else{
                dispatch(saveRegistration(false));
                console.log("mauvaissssssssssss");
              }

             //AsyncStorage.setItem('dataAppDB', data1);
             return data;
           });
       } catch (e) {
        //console.log(e);
       
         if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {
   
           //
           //actions.logout();
         }
   
       }



       

       //console.log("ridd",today);

       //console.log("ridd11111111",end_date_subcription);
       //if()



       
       
     })(); 

     //alert("----useEffect---setInterval-----"+isSubscription);

   }, 120000);
   return () => clearInterval(interval);
 }, [isSubscription]);

  React.useEffect(() => {

     
     
    //SplashScreen.hide();
    RNBootSplash.hide({ fade: true,duration:1000 });


  }, []);

  React.useEffect(() => {

     dispatch(setAudioStart(false));
     dispatch(setPlayerOff(true));
          

         
    const fetchPodcastLocal = async () => {
      const data = await  PodcastService.getPodcastToLocal('podcast_local'); // Remplacez 'votreClePodcast' par la clé appropriée
      //PodcastService.storePodcastToLocal('favorites',[]);

      if(data == null){

        dispatch(setPodcastStored([]));

      }else{
        dispatch(setPodcastStored(data));

      }
      
    };
    const fetchBooksLocal = async () => {
      const data = await  BooksService.getBooksToLocal('local_books'); // Remplacez 'votreClePodcast' par la clé appropriée
      //PodcastService.storePodcastToLocal('favorites',[]);

      if(data == null){

        dispatch(setBooksStored([]));

      }else{
        dispatch(setBooksStored(data));

      }
      
    };

    fetchPodcastLocal();
    fetchBooksLocal();
  }, []);


  async function requestUserPermission() {
    try{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }catch(e){


  }
  }

  const getToken = async() =>{
    const token = await messaging().getToken()
    console.log("Token = ",token);
  }
  useEffect(()=>{
    requestUserPermission()
    getToken()
  },[])
  return (
    <NavigationContainer>
     <GestureHandlerRootView style={{ flex: 1 }}>
     <BottomSheetModalProvider> 
      {/* {logged ? <MainNavigation /> : <AuthNavigation />} */}
      {logged ? <MainNavigation /> : <AuthNavigation />}


     </BottomSheetModalProvider> 
      </GestureHandlerRootView>
      
    </NavigationContainer>
  );
}


export default function App1(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <App />
      </PersistGate>
    </Provider>
  );
};