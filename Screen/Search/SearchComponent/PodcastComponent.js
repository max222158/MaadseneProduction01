import { StyleSheet, Text, View, Dimensions,FlatList , ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemHorizontalImageText from '../../../Component_items/Commons/ItemHorizontalImageText'
import { useDispatch, useSelector } from 'react-redux';
import { addPodcastSearch } from '../../../features/search/SearchSlice';
import { SearchService } from '../../../services/api/searchService';

const { width } = Dimensions.get('window');

const PodcastComponent = () => {

  const podcastSearch = useSelector((state) => state.search.searchDataPodcasts);

  const searchdatabook = useSelector((state) => state.search.searchDataBooks);
  const word_search = useSelector((state) => state.search.wordSearch);
  const isLoadingState = useSelector((state) => state.search.isLoadingState);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingMore, setIsLoadingMore] = React.useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [page, setPage] = useState(1); 
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const dispatch = useDispatch();

  const loadMoreData = () => {
    //alert("page---"+page2);

    if(allDataLoaded == false){

        setPage(page+1);

    } 
    
  };

  const getPaginateData = async() =>{

    if(isLoadingMore == true){
      try{

        const data = await   SearchService.gePaginationSearchData(word_search,"podcasts",page);
  
        dispatch(addPodcastSearch(data.data));
//  
  //      console.log(data.data);
        if(data.data.length == 0){
          setIsLoadingMore(false);
          setAllDataLoaded(true);
        }
  
  
      }catch(e){
  
      }finally{
  
      }

    }







  }

  useEffect(()=>{

    //alert(page)

    if(page>1){

      getPaginateData();
    
    }


  },[page])

  useEffect(()=>{

    //alert(isLoadingState)



  },[isLoadingState])

  const renderLoader = () => {
    return (
      isLoadingMore ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    {!isLoadingState?

    Object.keys(podcastSearch  || []).length != 0 ?
        <FlatList

            /*  numColumns={numColumns()} */
            data={podcastSearch}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <ItemHorizontalImageText route="detailsPodcast" item={item} heightRatio={1} />
            )}
            contentContainerStyle={{}}
/* 
             ListFooterComponent={renderLoader}
                                
            onEndReached={loadMoreData}
            
            onEndReachedThreshold={0.1} */

            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderLoader}

        /> : <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold', marginTop: 0 }}>Aucun résultat</Text>
            <Text> .</Text>
        </View>
      :<View></View> 
      
      }


</View>
  )
}

export default PodcastComponent

const styles = StyleSheet.create({})