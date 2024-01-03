import { StyleSheet, Text, View, Dimensions,FlatList } from 'react-native'
import React from 'react'
import ItemHorizontalImageText from '../../../Component_items/Commons/ItemHorizontalImageText'
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const BooksAudioComponent = () => {

  const searchdatabook = useSelector((state) => state.search.searchDataBooksAudio);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
    {

    Object.keys(searchdatabook  || []).length != 0 ?
        <FlatList

            /*  numColumns={numColumns()} */
            data={searchdatabook}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <ItemHorizontalImageText item={item} heightRatio={1.5} />
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

export default BooksAudioComponent

const styles = StyleSheet.create({})