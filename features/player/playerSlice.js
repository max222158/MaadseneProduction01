import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
const initialState = {
  audio: [],
  miniplayer:false,
  image:'',
  minimize:true,
  idsong:0

}





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


export const playerSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {

    setAudio: (state, action) => {

      
      state.audio = action.payload;  


      
    },

    setPlayer: (state, action) => {

      
        state.miniplayer = action.payload;  
  
  
        
      },


      setImage: (state, action) => {

      
        state.image = action.payload;  
  
  
        
      },

      setMinimized: (state, action) => {

      
        state.minimize = action.payload;  
  
  
        
      },

      setIdSong: (state, action) => {

      
        state.idsong = action.payload;  
  
  
        
      },

        
  },

  extraReducers: {




  },
});
export const { setAudio,setPlayer,setImage,setMinimized,setIdSong} = playerSlice.actions;
export default playerSlice.reducer;

