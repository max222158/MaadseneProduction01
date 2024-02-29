import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { useSelector,useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isRegister: false,
  remaining_day:0,

}



export const billing = createAsyncThunk(
    //action type string
    'billing1',
    // callback function
  
    async (valo,thunkAPI) => {

        try {
            
            const value = await AsyncStorage.getItem('userRegistration');

            const val = JSON.parse(value);


            //let val = Boolean(value);
            //alert(" typeof"+val);
            thunkAPI.dispatch(setRegistration(val));
            
    
        } catch (error) {
            // Error retrieving data
        } 
        


    }


);


/* export const saveRegistration = createAsyncThunk(
    //action type string
    'saveRegister',
    // callback function
  
    async (thunkAPI,value) => {

        //thunkAPI.dispatch(setRegistration(value));
        console.log("value************",value);
/       AsyncStorage.setItem('userRegistration',value );

        thunkAPI.dispatch(setRegistration(value)); 
        


    }


); */


export const subscriptionSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {

    setRegistration: (state, action) => {

      
      state.isRegister = action.payload;  


      
    },

     saveRegistration:(state,action)=>{

        console.log("stateee------ ",state.isRegister);

        state.isRegister = action.payload;  

        AsyncStorage.setItem('userRegistration', JSON.stringify(action.payload));


    } ,
    setReamingDay:(state,action)=>{


      state.remaining_day = action.payload; 
    }
        
  },

  extraReducers: {
    [billing.pending]: (state) => {


    },
    [billing.fulfilled]: (state, action) => {

      state.userDetails = action.payload;


    },
    [billing.rejected]: (state) => {
      state.loading = false
    },



  },
});
export const { setRegistration,saveRegistration,setReamingDay} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

