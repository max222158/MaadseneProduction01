import * as React from 'react';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet, FlatList } from 'react-native';
import { StatusBar, Button, ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View, SafeAreaView, Alert, TextInput } from 'react-native';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { VideoItem } from '../Component_items/VideoItem';
import BookItem3 from '../Component_items/BookItem3';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';
import { getDataDB, setBookState, setCategoryState, setHomeData, setIsUpdate } from '../features/user/authSlice';
import { addToList, removeToList } from '../features/favorite/favoriteSlice';
import HomecarouselComponent from '../Components/Home/homecarouselComponent';
import ScreenBrightness from 'react-native-screen-brightness';
import NewsComponent from '../Components/Home/NewsComponent';
import fetchWithTimeout from '../utils/fetchWithTimeOut';
import { set } from 'immer/dist/internal';
import CategoryButton from '../Components/CategoryButtonCompnent';
import { URL_BASE } from '../utils/utils';


const dataloader = [

  { id: 1 }, { id: 2 }, { id: 3 }

];
const Home = ({ navigation }) => {


  const [books, setBooks] = useState([]);

  const [free_books, setFree_books] = useState([]);

  const [booksAudio, setBooksAudio] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [booksVideo, setBooksVideo] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  //const userData = useSelector((state)=> state.auth.userData)
  const dispatch = useDispatch();
  const DataAppSelect = useSelector((state) => state.userAuth.dataAppDB);
  const userDataSelect = useSelector((state) => state.userAuth.userDetails);
  const versionapp = useSelector(state => state.userAuth.versionapp);

  const favorite = useSelector((state) => state.favorite.favorite);
  const is_register = useSelector((state) => state.billing.isRegister);
  //console.log("--------DataAppSelect--",favorite);
  //setBooks(DataAppSelect.livre);

  const fetchDataHome = async () => {
    setIsLoading(true);
    setError(false);
    let url = URL_BASE + 'allBooks1'; //data.access_token.token;
    try {

      await fetchWithTimeout(url, {
        method: "GET",
        //mode: "no-cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
          Authorization: "Bearer " + userDataSelect.token,
        },
        timeout: 30000
      })
        .then(response => response.json())
        .then(data => {

          //alert(JSON.stringify(data));
          setBooks(data.livre);
          setFree_books(data.free_books);
          setPodcast(data.podcast);
          setBooksVideo(data.videos);
          setCategory(data.category);
          setIsLoading(false);
          dispatch(setBookState(data.livre));
          dispatch(setCategoryState(data.category));
          //console.log("mollllllllll na cool na",data.livre);

          if (data.version > versionapp) {

            dispatch(setIsUpdate(true));
          }


        });
    } catch (e) {
      console.log(e)
      if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {

        // alert(e);
        //actions.logout();
      }
      setError(true);
      setIsLoading(false);

    }

  }
  const fetchDataNews = async () => {
    setIsLoading(true);
    //setError(false);

    let url = URL_BASE + 'home'; //data.access_token.token;
    try {

      await fetchWithTimeout(url, {
        method: "GET",
        //mode: "no-cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          // "Content-Type": "application/json",
        },
        timeout: 30000
      })
        .then(response => response.json())
        .then(data => {

          //setNews(data.news);
          //alert(JSON.stringify(data));
          dispatch(setHomeData(data));

        });
    } catch (e) {
      console.log(e)
      if (e == "SyntaxError: JSON Parse error: Unrecognized token '<'") {

        // alert(e);
        //actions.logout();
      }

      //setError(true);
      //setIsLoading(false);

    }

  }


  React.useEffect(() => {
    setIsLoading(true);
    fetchDataHome();
    /*     if(DataAppSelect.livre){
          setBooks(DataAppSelect.livre);
          setPodcast(DataAppSelect.podcast);
          setBooksVideo(DataAppSelect.videos);
          setCategory(DataAppSelect.category);
          //alert("mollllllllll na cool na");
          setIsLoading(false);
        } */

  }, []);

  React.useEffect(() => {
    LogBox.ignoreLogs(['Sending...']);


  }, []);

  const isExist = (movie) => {

    if (favorite.filter(item => item.id === movie.id).length > 0) {
      return true
    }

    return false
  }

  const onTapAddTolist = (movie) => {

    dispatch(addToList(movie));
    //console.log("list favorite",favorite)
  }
  const onTapRemoveTolist = (movie) => {

    dispatch(removeToList(movie));
    //console.log("list favorite",favorite)
  }

  /*   if(isLoading){
  
      return(
  
        <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
          <ActivityIndicator size={40} color="#691c43"/>
          <Text style={{fontSize:25}}>En cours...</Text>
        </View>
      );
    } */

  if (error) {
    return (
      <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => { fetchDataHome(); fetchDataNews() }} style={{ alignSelf: 'center', backgroundColor: 'orange', padding: 8, paddingLeft: 35, paddingRight: 35, borderRadius: 50 }}>

          <Text style={{ color: "white" }}><Ionicons size={20} name="ios-refresh-sharp" color="white" /> Actualiser</Text>
        </TouchableOpacity></View>)
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#ffff' }}>

        <View style={{ flex: 1, backgroundColor: '#ffff', paddingTop: 0 }}>
          {/* <HomecarouselComponent /> */}
          <View style={{ flex: 1, backgroundColor: "#3c020108", paddingTop: 20, marginBottom: 15 }}>

            <View >
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 15,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Nouveautés

              </Text>
              <NewsComponent />
            </View>
          </View>






          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 15,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Sélectionnés pour vous
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 15, color: 'black' }} onPress={() => { navigation.navigate('Livres') }}>Plus + </Text>

            </View>
          </View>
          <View style={{ flex: 1, marginTop: 10, backgroundColor: "#3c020108", paddingTop: 10 }}>

            {
              !isLoading ?

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={books}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DetailsBook', {
                            item: item

                          });
                        }}>
                        <BookItem3 item={item} />
                      </TouchableOpacity>
                      {isExist(item) ?
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapRemoveTolist(
                            item
                          )}
                        >
                          <Ionicons
                            name="ios-bookmark"
                            size={25}
                            color="#60103b"
                          />

                        </TouchableOpacity> :
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapAddTolist(
                            item
                          )}
                        >
                          <Ionicons
                            name="ios-bookmark-outline"
                            size={25}
                            color="black"
                          />
                        </TouchableOpacity>
                      }

                    </View>
                  )}
                  horizontal

                /> :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {dataloader.map((news, index) => (
                    <View style={[{ marginTop: 0, paddingBottom: 15, paddingLeft: 16, }]}>
                      <View style={{ width: 130, height: 170, borderRadius: 10, marginTop: 0, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 130, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 80, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>
                    </View>

                  ))}
                </ScrollView>

            }
          </View>
        </View>

        <View style={{ flex: 1, padding: 7, backgroundColor: '#ffff', paddingTop: 25 }}>
          {/* <HomecarouselComponent /> */}

          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 13,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Livres gratuits
              </Text>
            </View>

          </View>
          <View style={{ flex: 1, marginTop: 10, backgroundColor: "#3c020108", paddingTop: 10 }}>

            {
              !isLoading ?

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={free_books}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DetailsBook', {
                            item: item

                          });
                        }}>
                        <BookItem3 item={item} />
                      </TouchableOpacity>
                      {isExist(item) ?
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapRemoveTolist(
                            item
                          )}
                        >
                          <Ionicons
                            name="ios-bookmark"
                            size={25}
                            color="#60103b"
                          />

                        </TouchableOpacity> :
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapAddTolist(
                            item
                          )}
                        >
                          <Ionicons
                            name="ios-bookmark-outline"
                            size={25}
                            color="black"
                          />
                        </TouchableOpacity>
                      }

                    </View>
                  )}
                  horizontal

                /> :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                  {dataloader.map((news, index) => (
                    <View style={[{ marginTop: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, }]}>
                      <View style={{ width: 130, height: 170, borderRadius: 10, marginTop: 0, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 130, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 80, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>
                    </View>

                  ))}
                </ScrollView>

            }
          </View>
        </View>

        <View
          style={{ flex: 1, padding: 7, paddingTop: 0, backgroundColor: '#ffff', marginTop: 20 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 13,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Podcasts recommandés
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 15, color: 'gray' }} onPress={() => { navigation.navigate('Podcasts') }}>Plus + </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            {
              !isLoading ?

                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={podcast}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('detailsPodcast', {
                            item: item
                          });
                        }}>
                        <BookItemAudio item={item} />
                      </TouchableOpacity>
                      {isExist(item) ?
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapRemoveTolist(item)}
                        >
                          <Ionicons
                            name="ios-bookmark"
                            size={25}
                            color="#60103b"
                          />

                        </TouchableOpacity> :
                        <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }}
                          onPress={() => onTapAddTolist(item)}
                        >
                          <Ionicons
                            name="ios-bookmark-outline"
                            size={25}
                            color="black"
                          />
                        </TouchableOpacity>
                      }
                    </View>
                  )}
                  horizontal
                /> :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                  {dataloader.map((news, index) => (
                    <View style={[{ marginTop: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, }]}>
                      <View style={{ width: 150, height: 150, borderRadius: 10, marginTop: 0, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 130, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>
                      <View style={{ width: 80, height: 15, borderRadius: 0, marginTop: 10, backgroundColor: '#007bff1c' }}></View>

                    </View>

                  ))}
                </ScrollView>}
          </View>
        </View>
        <View
          style={{ flex: 1, padding: 7, backgroundColor: '#ffff', marginTop: 9 }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#e9ecef8c', paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 13,

                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Vidéos{' '}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 15, color: 'gray' }}> </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>

            {!isLoading ? <FlatList
              data={booksVideo}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ReadVideo', {
                        id: item.id,
                        auteur: item.auteur,
                        image: item.image,
                        titre: item.titre,
                        categorie: item.categorie,
                        resume: item.resume,
                        lien_video: item.video,
                        support: item.support,

                      });
                    }}>
                    <VideoItem item={item} />
                  </TouchableOpacity>
                  {/*                   {isExist(item) ?
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}}
                    onPress={() => onTapRemoveTolist(item)}
                  >
                    <Ionicons
                      name="ios-bookmark"
                      size={28}
                      color="#60103b"
                    />
                    
                  </TouchableOpacity>:
                  <TouchableOpacity style={{paddingLeft: 10, paddingTop: 5}} 
                    onPress={() => onTapAddTolist(item)}
                  >
                  <Ionicons
                    name="ios-bookmark-outline"
                    size={28}
                    color="black"
                  />
                </TouchableOpacity> 

              }*/}
                </View>
              )}
              horizontal
            /> :
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {dataloader.map((news, index) => (
                  <View style={[{ marginTop: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, }]}>
                    <View style={{ width: 130, height: 150, borderRadius: 10, marginTop: 0, backgroundColor: '#007bff1c' }}></View>

                  </View>

                ))}
              </ScrollView>}
          </View>
        </View>

        <View
          style={{ flex: 1, padding: 7, backgroundColor: '#ffff', marginTop: 3 }}>
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#e9ecef8c', paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 13,
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                Nos catégories{' '}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 15, color: 'gray' }}></Text>
            </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <ScrollView style={{ backgroundColor: '#ffff' }} horizontal={true} showsHorizontalScrollIndicator={false} >

              {category.map((category, index) => (
                <CategoryButton category={category} key={index} navigation={navigation} />
              ))}

            </ScrollView>

          </View>
          <View style={{ marginTop: 20, marginBottom: 100 }}>
            {is_register ? null :
              <View style={{ backgroundColor: '#d3dbe7', padding: 20, borderRadius: 0, marginTop: 15 }}>
                <Text style={{ fontSize: 16, letterSpacing: 1, color: 'black' }}>Abonnez-vous avec seulement </Text>
                <Text style={{ fontSize: 14, letterSpacing: 1, color: 'black', fontWeight: '800' }}>1 000 FCFA ou €1.6</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Subscription')} style={{ alignContent: 'center', marginLeft: 12, alignSelf: 'center',
                 alignItems: 'center', backgroundColor: '#7a00ff', padding: 8, marginTop:30,
                 paddingLeft: 30, paddingRight: 30, borderRadius: 20 }}>
                  <Text style={{ color: 'white', fontSize: 13, fontWeight: '500', letterSpacing: 1 }}>S'abonner maintenant</Text>
                </TouchableOpacity>
              </View>}
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );


}
export default Home;

