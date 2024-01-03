/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IndexScreen from './Screen/IndexScreen';
//import { store } from './features/store';
import { Provider } from 'react-redux';
import {
  getUserData,
  clearUserData,
  getDataDBasynStore,
  getLogged,
} from './utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSlice, { setIsRegister, setIsUpdate } from './features/user/authSlice';
import favoriteSlice from './features/favorite/favoriteSlice';
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
import subscriptionSlice, { billing, saveRegistration, setRegistration }  from './features/subcription/subscriptionSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import playerSlice from './features/player/playerSlice';
import moment from 'moment';
import { Modal } from 'react-native';
import SearchSlice from './features/search/SearchSlice';

const reducer = combineReducers({
  userAuth: authSlice,
  favorite: favoriteSlice,
  billing: subscriptionSlice,
  audio: playerSlice,
  search:SearchSlice
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
       //alert('dail')
        //setIsLogged(true);
        dispatch(saveUser(userData));
        dispatch(saveLogged(true));

        dispatch(billing());

      }
    })();
  }, []);



  React.useEffect(() => {

   const interval = setInterval(() => {

      (async () => {





       //userData.user.date_subcription;

       const userData = await getUserData();

       let url = 'https://mobile.maadsene.com/api/auth/getUser?id='+userData.user.id;

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

             //let today = new Date();
             let end_date_subcription  = new Date(data.user.end_date_subcription);
             let today = new Date();
             //alert(today);


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
         if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {
   
           //alert(e);
           //actions.logout();
         }
   
       }



       

       //console.log("ridd",today);

       //console.log("ridd11111111",end_date_subcription);
       //if()



       
       
     })(); 

     //alert("----useEffect---setInterval-----"+isSubscription);

   }, 300000);
   return () => clearInterval(interval);
 }, [isSubscription]);

  React.useEffect(() => {

     
     
    //SplashScreen.hide();
    RNBootSplash.hide({ fade: true,duration:1000 });


  }, []);

  return (
    <NavigationContainer>
     <GestureHandlerRootView style={{ flex: 1 }}>
     {/* <BottomSheetModalProvider> */}
      {/* {logged ? <MainNavigation /> : <AuthNavigation />} */}
      {logged ? <MainNavigation /> : <AuthNavigation />}


      {/* </BottomSheetModalProvider> */}
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