import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
const initialState = {
  loading: false,
  favorite:[],
  test:{}

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

        
  },

  extraReducers: {


  },
});
export const { addToList,removeToList } = favoriteSlice.actions;
export default favoriteSlice.reducer;

