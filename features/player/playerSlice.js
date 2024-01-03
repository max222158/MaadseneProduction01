import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
const initialState = {
  audio: [],
  miniplayer:false,
  image:'',
  minimize:true,
  idsong:0,
  artist:'',
  color:'#bbb'

}



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

      setColor: (state, action) => {

      
        state.color = action.payload;  
  
  
        
      },


      setImage: (state, action) => {

      
        state.image = action.payload;  
  
  
        
      },
      setArtist: (state, action) => {

      
        state.artist = action.payload;  
  
  
        
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
export const { setAudio,setColor,  setPlayer,setImage,setMinimized,setIdSong,setArtist} = playerSlice.actions;
export default playerSlice.reducer;

