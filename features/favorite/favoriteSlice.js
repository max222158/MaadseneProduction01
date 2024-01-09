import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
const initialState = {
  loading: false,
  favorite:[],
  test:{},
  lastPodcastRead:[]

}


export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {

    addToList: (state, action) => {
      
      state.favorite = [...state.favorite, action.payload];  
      //state.favorite = action.payload;
      //console.log("addtolisttttttttttttttttttttttttttt")

    },

    removeToList: (state, action) => {
          
      //state.favorite = action.payload;
      state.favorite = state.favorite.filter((movie) => movie.id !== action.payload.id)

    },
    addToPodcastRead: (state, action) => {
      
      state.lastPodcastRead = [ ...action.payload, ...state.lastPodcastRead];  
      //state.favorite = action.payload;
      //console.log("addtolisttttttttttttttttttttttttttt")

    },
        
  },


});
export const { addToList,removeToList,addToPodcastRead } = favoriteSlice.actions;
export default favoriteSlice.reducer;

