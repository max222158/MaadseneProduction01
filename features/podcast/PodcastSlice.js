import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {

  podcastStoredLocal: [],



}




export const PodcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {


    addPodcastStored: (state, action) => {



      state.podcastStoredLocal = [action.payload, ...state.podcastStoredLocal];
      //state.favorite = action.payload;
      //console.log("addtolisttttttttttttttttttttttttttt")





    },
    setPodcastStored: (state, action) => {

      state.podcastStoredLocal = action.payload;

    }

  },

});
export const {addPodcastStored, setPodcastStored } = PodcastSlice.actions;
export default PodcastSlice.reducer;

