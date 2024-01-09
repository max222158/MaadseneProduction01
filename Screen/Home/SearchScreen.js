import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookItem3 from "../../Component_items/BookItem3";
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchWithTimeout from "../../utils/fetchWithTimeOut";
import { setSearchData } from "../../features/search/SearchSlice";
import LoaderComponent from "../../Components/LoaderComponent";

const { width, height } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [itemSearch, setItemSearch] = useState([]);
  const userDataSelect = useSelector((state) => state.userAuth.userDetails);


  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.userAuth.categoryState);
  //alert(JSON.stringify(categoryState));
  const [value, setValue] = useState("");
  const [dataFromUrl, setDataFromUrl] = useState([]);
  const [text, setText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataPodcasts, setFilteredDataPodcasts] = useState([]);
  const [filteredDataBooksAudio, setFilteredDataBooksAudio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [focus, SetFocus] = React.useState(false);
  const [error,setError] = React.useState(false);

  const [indexBtnClicked, setIndexBtnClicked] = useState(1);
    
  function handleClick(index){
      //alert(index);
      setIndexBtnClicked(index);
  
  };



  React.useEffect(() => {

    //search();
    setTimeout(()=>{

      setIsLoading(false);
    },1500)

  }, []);

  React.useEffect(() => {

      setCategory(categoryState);
      //alert("mollllllllll na cool na");
  
    //console.log("-------data categoris-------", category)

  }, [categoryState]);


/*   React.useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    

  },[]); */


  const searchFilterFunction = (value) => {
    // Check if searched text is not blank
    if (value) {
      SetFocus(true)
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = dataFromUrl.search.filter(function (item) {
        const itemData = item.titre? item.titre.toUpperCase(): ''.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);

      //filtered podcast

      const newData1 = dataFromUrl.podcastsearch.filter(function (item) {
        const podcastByName = item.name? item.name.toUpperCase(): ''.toUpperCase();
        const podcastByTitle = item.title? item.title.toUpperCase(): ''.toUpperCase();
        const textUpperPod = value.toUpperCase();
        const textUpperTitle = value.toUpperCase();
        return (podcastByName.indexOf(textUpperPod) > -1) || (podcastByTitle.indexOf(textUpperTitle) > -1) ;
      });
      setFilteredDataPodcasts(newData1);

      //filtered livre audio
      const newData2 = newData.filter(function (item) {

        return(item.support == "Livre audio");
        const bookAudioByType = item.support? "Livre audio": ''.toUpperCase();
        return console.log("-----book audio - - -- - - ",bookAudioByType);
        const textUpperPod = value.toUpperCase();
        return (bookAudioByType.indexOf(textUpperPod) > -1) ;
      });
      console.log("newData2",newData2);
      setFilteredDataBooksAudio(newData2);
      //console.log("----filterDAta--------", filteredDataPodcasts);

      setValue(value);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData([]);
      setValue(value);
      SetFocus(false)
    }
  };

  if(isLoading){

    return(
      <LoaderComponent/>
    );
  }
  if(error)
  {
    return(
    <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
    <TouchableOpacity onPress={()=>{search()}} style={{alignSelf:'center',backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:50}}>
      
      <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>
    </TouchableOpacity>
    </View>
    
    );
    
  }


  return (
    <SafeAreaView style={{ paddingLeft: 15, paddindRight: 10, backgroundColor: 'white', flex: 1,paddingBottom:20 }}>

    <TouchableOpacity style={styles.inputContainer1} onPress={()=>{navigation.navigate('search_page'); dispatch(setSearchData([]))}}>
      <Ionicons name="ios-search-outline" size={24} color="#999" />
      <Text
        style={styles.input1}
        
      >Taper ici un mot clé</Text>

      <TouchableOpacity style={[styles.searchBtn,{borderLeftWidth:1,borderColor:'gray',paddingLeft:5}]}>
        
      </TouchableOpacity>
    </TouchableOpacity>
      {

        focus ?
          <View>
            <View>
              <ScrollView style={{backgroundColor: '#ffff'}} horizontal={true} >

                    <TouchableOpacity  
                        onPress={() => {handleClick(1)}}  style={[indexBtnClicked === 1 ? styles.selectItem:null, {paddingLeft:10,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:10,color:"white"}]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 1 ? styles.selectItemText:null,]}>Livres</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity  
                        onPress={() => {handleClick(2)}} style={[indexBtnClicked === 2 ? styles.selectItem:null, {paddingLeft:10,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:10,color:"white"}]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 2 ? styles.selectItemText:null,]}>Livres audios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  
                        
                        onPress={() => {handleClick(3)}} style={[ {paddingLeft:10,paddingRight:10,paddingBottom:10,paddingTop:7,marginLeft:10,color:"white"},indexBtnClicked === 3 ? styles.selectItem:null]}>
                        <Text style={[{paddingTop: 4,fontFamily: "Arial",fontSize:15,letterSpacing: 1},indexBtnClicked === 3 ? styles.selectItemText:null,]}>Podcasts</Text>
                    </TouchableOpacity>
                    
            </ScrollView>
          </View>
          {
          indexBtnClicked === 1 ?
          <FlatList
          style={{ backgroundColor: "#ffff",paddingBottom:50,marginBottom:100 }}
          
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              {
                if(item.support == 'Livre'){

                
                  navigation.navigate('DetailsBook', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.resume,
                    book: item.epub_mobile,
                    epub: item.epub_mobile,
                    support: item.support,
                  })
                }
                if(item.support == 'Livre audio'){

                
                  navigation.navigate( 'DetailsBookAudio', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.description,
                    url: item.lien_livre,
                    support: item.support,
                  });
                }
                

              }                  

            }}>

              <View style={styles.bookContainer}>
              <Image style={styles.image} source={{ uri:  item.image }} />
              <View style={styles.dataContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.titre}
                </Text>
                <Text numberOfLines={4} style={styles.description}>
                  {item.resume}
                </Text>
                <Text style={styles.author}>{item.auteur}</Text>
              </View>
              </View>
            </TouchableOpacity>


          )}

          />:null
      

          }

{
          indexBtnClicked === 2 ?
          <FlatList
          style={{ backgroundColor: "#ffff",paddingBottom:50,marginBottom:100 }}

          data={filteredDataBooksAudio}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
              {

                if(item.support == 'Livre audio'){

                
                  navigation.navigate( 'DetailsBookAudio', {
                    id: item.id,
                    auteur: item.auteur,
                    image: item.image,
                    titre: item.titre,
                    categorie: item.categorie,
                    resume: item.description,
                    url: item.lien_livre,
                    support: item.support,
                  });
                }

              }                  

            }}>

              <View style={styles.bookContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.dataContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.titre}
                </Text>
                <Text numberOfLines={4} style={styles.description}>
                  {item.resume}
                </Text>
                <Text style={styles.author}>{item.auteur}</Text>
              </View>
              </View>
            </TouchableOpacity>


          )}

          />:null
      

          }
          
          {
          indexBtnClicked === 3 ?
          <FlatList
          style={{ backgroundColor: "#ffff", marginTop: 30,marginBottom:100 }}

          data={filteredDataPodcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity  
            onPress={() => {
              navigation.navigate( 'DetailsPodcast', {
                id: item.id,
                auteur: item.auteur,
                image: item.image,
                titre: item.title,
                categorie: item.categorie,
                resume: item.description,
                book: item.lien,
                support: item.support,
                name: item.name,
                episode:item.episode
              });
             }}
            >

              <View style={styles.bookContainer}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={styles.dataContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <Text numberOfLines={4} style={styles.description}>
                  {item.description}
                </Text>
                <Text style={styles.author}>{item.auteur}</Text>
              </View>
              </View>
            </TouchableOpacity>


          )}
          contentContainerStyle={{paddingBottom:60}}
          />:null
      

          }
       
          </View> :
          <View>
            <View style={{ marginTop: 20, borderBottomColor: "gray", borderBottomWidth: 0.5, padding: 15 }}>

              <Text style={{ fontSize: 15, color: 'black', letterSpacing: 1, fontWeight: "700" }}>Ceci pourrait vous intéresser</Text>
            </View>
            <FlatList
              style={{ backgroundColor: "#ffff", marginTop: 10 ,marginBottom:20,paddingBottom:100}}

              data={category}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Category', {
                      id: item.id,
                      nom: item.nom,
                    })
                  }}>
                  <View style={styles.categoryContainer}>
                    <Text numberOfLines={1} style={styles.title}>
                      {item.nom}
                    </Text>
                  </View>
                </TouchableOpacity>


              )}
              contentContainerStyle={{marginBottom: 100,paddingBottom:100}}
            />
          </View>




      }
      {/*           <ActivityIndicator size="large" color="blue" animating={isLoading}/> */}


    </SafeAreaView>
  );
}


export default SearchScreen;

const styles = StyleSheet.create({
  textFriends: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: '#ffff',
    paddingTop: 15

  },
  input: {
    height: 45,
    width: '90%',
    backgroundColor: '#c5c3c275',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 13,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2
  },
  image: {
    height: 150,
    width: 90,
  },
  dataContainer: {
    padding: 10,
    paddingTop: 5,
    width: width - 100,
  },
  title: {
    fontSize: 15,
    color: '#5f656b',
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  author: {
    fontSize: 16,
  },

  bookContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  selectItem:{
    borderBottomWidth:2,
    borderBottomColor:"#611039",
    color:'blue',
    fontWeight:'700'    
},

selectItemText:{
    color:'#611039',
    fontWeight:'700'    
}
,
inputContainer1: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#c5c3c275',
  borderRadius: 15,
  padding: 0,
  marginVertical: 5,
  marginRight:10,
  paddingRight:10,
  paddingLeft:10,
  marginTop:50,
  paddingBottom:5,
  paddingTop:5
},
input1: {
  flex: 1,
  padding: 10,

},
});