import { StyleSheet, Text, View, Dimensions,FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ItemHorizontalImageText from '../../../Component_items/Commons/ItemHorizontalImageText'
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const PodcastComponent = () => {

  const podcastSearch = useSelector((state) => state.search.searchDataPodcasts);


  useEffect(()=>{
    //alert(JSON.stringify(podcastSearch.podcasts));

  },[podcastSearch])
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    {

    Object.keys(podcastSearch || []).length != 0 ?
        <FlatList

            /*  numColumns={numColumns()} */
            data={podcastSearch}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <ItemHorizontalImageText item={item} heightRatio={1} />
            )}
            contentContainerStyle={{}}
/* 
             ListFooterComponent={renderLoader}
                                
            onEndReached={loadMoreData}
            
            onEndReachedThreshold={0.1} */

            //onEndReached={loadMoreData}
            //onEndReachedThreshold={0.5}
        //ListFooterComponent={renderLoader}

        /> : <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins-Bold', marginTop: 0 }}>Aucun résultat</Text>
            <Text> .</Text>
        </View>}


</View>
  )
}

export default PodcastComponent

const styles = StyleSheet.create({})