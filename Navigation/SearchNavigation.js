import { View, Text,ScrollView,TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const  SearchNavigation = () => {

    const [indexBtnClicked, setIndexBtnClicked] = useState(0);
    
    function handleClick(index){
        //alert(index);
        setIndexBtnClicked(index);
    
    };


    return (
        <View>
            <ScrollView style={{backgroundColor: '#ffff',borderBottomColor:'gray',borderBottomWidth:1}} horizontal={true} >

                    <TouchableOpacity  
                        
                        onPress={() => {handleClick(1)}}  style={[indexBtnClicked === 1 ? styles.selectItem:null, {paddingLeft:20,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:20,color:"white"}]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 1 ? styles.selectItemText:null,]}>Livres</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity  
                       
                        onPress={() => {handleClick(2)}} style={[indexBtnClicked === 2 ? styles.selectItem:null, {paddingLeft:20,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:20,color:"white"}]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 2 ? styles.selectItemText:null,]}>Livres audios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  
                        
                        onPress={() => {handleClick(3)}} style={[ {paddingLeft:20,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:20},indexBtnClicked === 3 ? styles.selectItem:null]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 3 ? styles.selectItemText:null,]}>Podcasts</Text>
                    </TouchableOpacity>
                    
            </ScrollView>
    </View>
  )
}


export default SearchNavigation;

const styles = StyleSheet.create({
    
    selectItem:{
        borderBottomWidth:2,
        borderBottomColor:"blue",
        color:'blue',
        fontWeight:'700'    
    },

    selectItemText:{
        color:'blue',
        fontWeight:'700'    
    }

  
  });