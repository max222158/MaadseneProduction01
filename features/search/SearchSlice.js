import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
const initialState = {
  searchData: [],
  searchDataBooks: [],
  searchDataBooksAudio: [],
  searchDataPodcasts: [],
  categoryaudio:[],
  page1:1,
  page2:1,
  isLoadingState:false,
  isLoading:false


}




export const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    setSearchData: (state, action) => {

      
      state.searchData = action.payload;  


      
    },
    setCategoryAudio: (state, action) => {

      
        state.categoryaudio = action.payload;  
  
  
        
      },
      addBookSearch:(state, action) => {

      
          
          state.searchData = [...state.searchData, ...action.payload];  
          //state.favorite = action.payload;
          //console.log("addtolisttttttttttttttttttttttttttt")
    
    
  
  
        
      },
      addAudioSearch:(state, action) => {

      
          
          state.categoryaudio = [...state.categoryaudio, ...action.payload];  
          //state.favorite = action.payload;
          //console.log("addtolisttttttttttttttttttttttttttt")
    
    
  
  
        
      },
      addPodcastSearch:(state, action) => {

      
          
        state.searchDataPodcasts = [...state.searchDataPodcasts, ...action.payload];  
        //state.favorite = action.payload;
        //console.log("addtolisttttttttttttttttttttttttttt")
  
  


      
    },

    addBooksAudioSearch:(state, action) => {

      
          
      state.searchDataBooksAudio = [...state.searchDataBooksAudio, ...action.payload];  
      //state.favorite = action.payload;
      //console.log("addtolisttttttttttttttttttttttttttt")




    
  },
  addBooksSearch:(state, action) => {

      
          
    state.searchDataBooks = [...state.searchDataBooks, ...action.payload];  
    //state.favorite = action.payload;
    //console.log("addtolisttttttttttttttttttttttttttt")




  
},
      setPage1:(state, action) => {
        state.page1 = action.payload; 
      },
      setPage2:(state, action) =>{
        state.page2 = action.payload; 
      },
      setIsSearching:(state, action) =>{
        state.isSearching = action.payload; 
      }
      ,
      setIsLoadingState:(state, action) =>{
        state.isLoadingState = action.payload; 
      }
        
  },

});
export const { setIsLoadingState,addBooksAudioSearch,addBooksSearch,addPodcastSearch,  setSearchData,setIsSearching, setCategoryAudio,addAudioSearch,addBookSearch,setPage1,setPage2} = SearchSlice.actions;
export default SearchSlice.reducer;

