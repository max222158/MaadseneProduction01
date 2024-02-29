import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
const initialState = {
  audio: [],
  miniplayer:false,
  image:'',
  minimize:true,
  idsong:0,
  title:'',
  artist:'',
  color:'#bbb',
  episode:0,
  audioStart:false,
  idPodcast:0,
  itemPodcast:{},
  songType:"Podcast",

  playerOff:true,
  playpause:-1,
  playpause1: -1,
  playpause2: 0,

}



export const playerSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {

    setAudio: (state, action) => {

      
      state.audio = action.payload;  


      
    },
    setAudioStart: (state, action) => {

      
      state.audioStart = action.payload;  


      
    },

    setPlayer: (state, action) => {

      
        state.miniplayer = action.payload;  
  
  
        
      },

      
    setItemPodcast: (state, action) => {

      
      state.itemPodcast = action.payload;  


      
    },

      setColor: (state, action) => {

      
        state.color = action.payload;  
  
  
        
      },
      setSongType: (state, action) => {

      
        state.songType = action.payload;  
  
  
        
      },
      setIdPodcast: (state, action) => {

      
        state.idPodcast = action.payload;  
  
  
        
      },

      setEpisode: (state, action) => {

      
        state.episode = action.payload;  
  
  
        
      },


      setImage: (state, action) => {

      
        state.image = action.payload;  
  
  
        
      },


      setPausePlay: (state, action) => {

      
        state.playpause = action.payload;  
  
  
        
      },

      setPausePlay1: (state, action) => {

      
        state.playpause1 = action.payload;  
  
  
        
      },
      setArtist: (state, action) => {

      
        state.artist = action.payload;  
  
  
        
      },
      setTitle: (state, action) => {

      
        state.title = action.payload;  
  
  
        
      },

      setMinimized: (state, action) => {

      
        state.minimize = action.payload;  
  
  
        
      },

      setIdSong: (state, action) => {

      
        state.idsong = action.payload;  
  
  
        
      },
      setPlayerOff: (state, action) => {

      
        state.playerOff = action.payload;  
  
  
        
      },

        
  },
});
export const { setAudio, setSongType,setPausePlay,setPausePlay1, setPlayerOff,setTitle,
   setColor,setItemPodcast, setIdPodcast, setAudioStart,  setPlayer,setImage,
   setMinimized,setIdSong,setArtist,setEpisode} = playerSlice.actions;
export default playerSlice.reducer;

