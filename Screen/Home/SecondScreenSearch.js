import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookItem3 from "../../Component_items/BookItem3";
 import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('window');

  const SecondSearchScreen = ({navigation}) => {
      const [itemSearch, setItemSearch] = useState([]);
      const userDataSelect = useSelector((state)=> state.userAuth.userDetails);

      const [data, setData] = useState([]);
      const [text, setText ] = useState("");
      const [filteredData, setFilteredData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      
      React.useEffect(() => {



        setTimeout(async () => {
          //let userConnect = await AsyncStorage.getItem('userData');

          
          //let userToken = JSON.parse(userConnect);   //.access_token.token;
          let url = 'https://mobile.maadsene.com/api/auth/allBooks?token=' + userDataSelect.access_token.token;        //return console.log(url);
          try {
    
            await fetch(url)
              .then(response => response.json())
              .then(data => {
                //console.log(data);
                setItemSearch(data.livre);
                //alert(data);
                setIsLoading(false);
    
              });
          } catch (e) {
            console.log(e);
          }
    
        }, 10);
      }, []);
  

      React.useEffect(() => {

          console.log("valerie = "+text);
          let val1 = [];
          if(text){  

            itemSearch.filter((val)=>{
              
              if(text == ""){
                return val;
              }
              else if(val.titre.toLowerCase().includes(text.toLowerCase())){
                 
                val1.push(val);
                //return console.log(val1);
                //console.log(val);
                
              }
              
            })
            //console.log("vallllllllllllllllllllllllllllllllllll");
            //console.log(val1);
            setItemSearch(val1);
        } else {
            //set Books(data);
        }  
      },[text]);
  
      const searchFilterFunction = (text) => {
        setText(text);

      }
  
      return (
        <SafeAreaView>
          <View style={styles.header}>
            <TextInput
              placeholder="Recherche..."
              placeholderTextColor="gray"
              value={text}
              onChangeText={(value)=>{searchFilterFunction(value)}}
              style={styles.input}
            />
          </View>
          <ActivityIndicator size="large" color="blue" animating={isLoading}/>
          <FlatList
          style={{backgroundColor:"#ffff"}}

            data={itemSearch}
            keyExtractor={(item) => item.id.toString()}          
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{navigation.navigate('DetailsBook', {
                id: item.id,
                auteur: item.auteur,
                image: item.image,
                titre:item.titre,
                categorie:item.categorie,
                resume: item.resume,
                book:item.lien_livre


              })}}>
                <View style={styles.bookContainer}>
                <Image style={styles.image} source={{ uri: "https://maadsene.com/couverture/" + item.image }} />
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
                  
                  />
        </SafeAreaView>
      );
      }
  
  export default SecondSearchScreen;
  
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
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      },
      input: {
        height: 45,
        width: '90%',
        backgroundColor: '#c5c3c275',
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
      },
      bookContainer: {
        flexDirection: 'row',
        padding: 5,
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
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
      },
      description: {
        fontSize: 16,
        color: 'gray',
      },
      author: {
        fontSize: 16,
      },

  });