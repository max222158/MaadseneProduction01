import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { saveRegistration } from '../subcription/subscriptionSlice';
/* import { LoginManager } from 'react-native-fbsdk-next'; */
const initialState = {
  loading: false,
  userDetails: {},
  dataAppDB: {},
  logged: false,
  error: false,
  is_register:false,
  categoryState:[],
  book:[],
  isUpdate:false,
  versionapp:3,
  homeData:[],
  isEpubReader:true
}


//const postData = { email: 'lorem', password: 'ipsum' }
export const signIn = createAsyncThunk(
  //action type string
  'userAuth/signIn',
  // callback function

  async (dataAuth, thunkAPI) => {


    try {


      const response = await fetch(
        'https://maadsenemobi.com/api/login1',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataAuth)
        }
      )
      //const dispatch = useDispatch();
      const data = await response.json();


       // alert(JSON.stringify(data));
      //return console.log("datttttttaaaaaaaaaaaa",data.credential);
      if (data.hasOwnProperty('error')) {
        thunkAPI.dispatch(setError(true));
      }
      /* 		  if(data.error){
              
             alert("Identifiants incorrects!"); 
            } */
      //if(data.access_token.credential == "valide"){

      //const islogged = getState();

      //islogged.userAuth.logged = true;
      //console.log("logged === ",islogged.userAuth.logged);
      if (data.hasOwnProperty('credential')) {
        //return console.log("00000000000000000000000");

        if (data.credential == "valide") {

          //return console.log("00000000000000000000000");
          let today = new Date();
          let end_date_subcription  = new Date(data.user.end_date_subcription);
          

          if(today < end_date_subcription){

             console.log("bonnnnnnnnnnnnnnnnnnnn");
             AsyncStorage.setItem('userRegistration', JSON.stringify(true));
             thunkAPI.dispatch(saveRegistration(true));
   
           }else{
            AsyncStorage.setItem('userRegistration', JSON.stringify(false));
            thunkAPI.dispatch(saveRegistration(false));
             console.log("mauvaissssssssssss");
           }


           let url = 'https://maadsene.lesastic.com/api/getEpubReader';
 
           try {
       
             await fetch(url, {
               method: "GET",
               headers: {
                 Accept: "application/json, text/plain, */*",
                 // "Content-Type": "application/json",
               },
             })
               .then(response => response.json())
               .then(data => {
                 
                 //alert(JSON.stringify(data));
       
                 if(data.epub == 0)
                 {
                     thunkAPI.dispatch(setIsEpubReader(false));
    
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

/* 
          if(data.user.subcription == 1){

            AsyncStorage.setItem('userRegistration', JSON.stringify(true));
            thunkAPI.dispatch(saveRegistration(true));

         
          
          }else{
            
            AsyncStorage.setItem('userRegistration', JSON.stringify(false));
            thunkAPI.dispatch(saveRegistration(false));
   
          } */

          let data1 = JSON.stringify(data);
          AsyncStorage.setItem('userData', data1);



          //return console.log("------------getDataDB---------",data.access_token.token);



          thunkAPI.dispatch(loggedUser(true));

        }
      }
      return data;

    } catch (err) {
      //return console.log(err);
      if (err == "TypeError: Network request failed") {

        alert("mauvaise connexion!");

      }
      // You can choose to use the message attached to err or write a custom error
      return rejectWithValue('Opps there seems to be an error')
    }
  }
);

export const addToken = createAsyncThunk(
  'addtoken',
  async () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('userData').then(data => {
        resolve(JSON.parse(data));
      });
    });
  }
);

export const logout = createAsyncThunk(
  'logout',
  async () => {
/*     LoginManager.logOut();

    AsyncStorage.removeItem('userData');
    AsyncStorage.removeItem('dataAppDB'); */

  }
);



export async function getUserData() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('userData').then(data => {
      resolve(JSON.parse(data));
    });
  });
}





export const getDataDB = createAsyncThunk(
  'getDataDB',
  async (arg, { getState }) => {

    const userToken = getState();

    //console.log("------------getDataDB---------",userToken.userAuth.userDetails.access_token.token);


    let url = 'https://mobile.maadsene.com/api/auth/allBooks';

    try {

      await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + userToken.userAuth.userDetails.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          //alert(data);

          let data1 = JSON.stringify(data);
          AsyncStorage.setItem('dataAppDB', data1);
          return data;
        });
    } catch (e) {
      if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {

        //alert(e);
        //actions.logout();
      }

    }

  }
);

export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {

    saveUser: (state, action) => {

      state.userDetails = action.payload

    },
    saveDataApp: (state, action) => {

      state.dataAppDB = action.payload

    },

    loggedUser: (state, action) => {

      state.logged = action.payload;

    },
    saveLogged: (state, action) => {

      state.logged = action.payload

    },
    setError: (state, action) => {

      state.error = action.payload

    },
    setIsRegister: (state, action) => {

      state.is_register = action.payload

    },
    setBookState: (state, action) => {

      state.book = action.payload

    },

    setCategoryState: (state, action) => {

      state.categoryState = action.payload

    },
    setIsUpdate: (state,action)=>{
      state.isUpdate = action.payload;
    },
    setHomeData: (state, action) => {

      state.homeData = action.payload

    },
    setIsEpubReader: (state, action) => {

      state.isEpubReader = action.payload

    },
  },


  extraReducers: {
    [signIn.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false
      state.userDetails = action.payload;


    },
    [signIn.rejected]: (state) => {
      state.loading = false
    },
    [addToken.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [logout.fulfilled]: (state, action) => {
      state.userDetails = {};
      state.dataAppDB = {};
      state.logged = false;
      //AsyncStorage.getItem('dataAppDB');
    },
    [getDataDB.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataAppDB = { 'dataAppDB': 'data from api' };
    },
    [getDataDB.rejected]: (state) => {
  
    },
    [getDataDB.pending]: (state) => {
      state.loading = true;
      
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { setHomeData,setIsEpubReader, saveUser, saveDataApp, loggedUser, saveLogged, setError,setIsRegister,setBookState,setCategoryState,setIsUpdate } = userSlice.actions;
export const userDetails = (state) => state.userAuth.userDetails;
export const userSelector = state => state.userAuth
//export const loading = (state) => state.userAuth.loading;
export default userSlice.reducer;