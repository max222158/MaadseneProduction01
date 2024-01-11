import * as React from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { addToList,removeToList  } from '../../../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { setAudio, setIdSong, setImage, setPlayer } from '../../../features/player/playerSlice';
import fetchWithTimeout from '../../../utils/fetchWithTimeOut';
import { setIsUpdate } from '../../../features/user/authSlice';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const PodcastDetails = ({ navigation, route }) => {

    const userDataSelect = useSelector(state => state.userAuth.userDetails);
    const stateAudio = useSelector(state=>state.audio.audio);

    //alert(JSON.stringify(stateAudio));

    var { id, image, auteur, titre, categorie, resume, book,name,episode,support } = route.params;
    const [isLoading,setIsLoading] = React.useState(true);
    const [podcast,setPodcast] = React.useState([]);

    const [error, setError] = React.useState(false);

    const dispatch = useDispatch();
    const favorite = useSelector((state)=> state.favorite.favorite);
    const is_register = useSelector((state)=> state.billing.isRegister);
    const isExist = (movie) => {
        
        if(favorite.filter(item => item.id === id).length > 0){
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


      const getPodcastByName = async () => {
        setPodcast([]);
        setError(false);
        setIsLoading(true);
          //let userToken = userData.token;
          let url =
            'https://mobile.maadsene.com/api/auth/getPodcastByName?name='+name;
    
          try {
            
            await fetchWithTimeout(url, {
              method: 'GET',
              headers: {
                Accept: 'application/json, text/plain, */*',
                // "Content-Type": "application/json",
                Authorization: 'Bearer ' + userDataSelect.token,
              },
              timeout:15000
            })
              .then(response => response.json())
              .then(data => {
               
                setPodcast(data.podcast);
                setIsLoading(false);
                console.log(data.podcast);
                if(data.update == 1){

                    dispatch(setIsUpdate(true));
                  }
                //alert(data);
              });
          } catch (e) {
            
              //alert('dial' + e);
              setIsLoading(false);
              setError(true);
              //actions.logout();
            
          }

      }

    React.useEffect(() => {

        getPodcastByName();
      }, [id]);

    return (

        <View style={[styles.MainContainer,{marginTop:0,paddingTop:0}]}>


            <ScrollView style={styles.container} >
                
                <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.container1} >
                    <View style={{ backgroundColor: "#ffff", width: "100%", height: 100, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}></View>
                    <Image
                        source={{ uri:  image }}
                        resizeMode="cover"
                        style={styles.imageDetails}
                        imageStyle={{ borderWidth: 5, borderColor: "red" }}

                    />
                    <View style={styles.textview}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={1} style={styles.title}>{titre}</Text>
                            <Text style={styles.auteur}>Par {auteur}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 7 }}>
                            <TouchableOpacity style={{ alignItems: "center", flex: 1 / 2 }} onPress={() => {}}><Text style={styles.categorie} numberOfLines={1}>Podcast</Text></TouchableOpacity>
                            {isExist() ?

                                <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={() => onTapRemoveTolist({id, image, 'artist':auteur, titre, categorie, resume, book,name,episode,support})}>
                                    <Text style={styles.categorie} numberOfLines={1}>
                                    <Ionicons name="ios-bookmark" size={18}color="#60103b"/> Favoris</Text>

                                </TouchableOpacity>


                                :
                                <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={() => onTapAddTolist({id, image, 'artist':auteur, 'title':titre, categorie, 'description':resume, book,name,episode,support})}>
                                <Text style={styles.categorie} numberOfLines={1}>
                                <Ionicons name="ios-bookmark-outline" size={18}color="black"/> Favoris</Text>

                                </TouchableOpacity>
                                }                        
                        </View>
                        <Text style={styles.title_resume}>Description</Text>
                        <Text style={styles.resume} numberOfLines={7}>{resume}...</Text>

                        <Text numberOfLines={1} style={styles.title_episode}>Plus d'épisodes de {titre}</Text>
                        <View style={{paddingRight:10}}>
                            {isLoading?
                                <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
                                    <ActivityIndicator size={40} color="#691c43"/>
                                    
                                </View>:

                                    <FlatList
                                    data={podcast}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item}) => (
                                    <View >
                                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(setAudio(podcast));
                                            dispatch(setPlayer(true));
                                            dispatch(setImage(image));
                                            dispatch(setIdSong(item.id));

/*                                             id: item.id,
                                            auteur: item.auteur,
                                            image: item.image,
                                            titre: item.title,
                                            categorie: item.categorie,
                                            resume: item.description,
                                            book: item.url,
                                            support: item.support,
                                            name: item.name,
                                            lien: item.url,
                                            episode:item.episode,
                                            podcast:podcast */

                                        }}>
                                            <View>
                                            <View style={{  width: 160, marginLeft: 15, borderWidth: 0.5, borderColor: '#dddddd',borderRadius: 20 }}>
                                                <View style={{ flex: 2,width: 160,height:180,borderRadius: 20 }}>
                                                    
                                                    <ImageBackground source={{uri:item.image}} resizeMode="cover" imageStyle={{ borderRadius: 10}} style={{ flex: 1, width: null, height: '100%',borderRadius:20 }}>
                                                        <View style={{backgroundColor:"white",width:35,height:35,padding:5,justifyContent:"center",alignItems:"center",borderRadius:50,margin:7}}>
                                                            <Ionicons name="md-volume-high" size={18} color="black" />
                                                        </View>
                                                    </ImageBackground>
                                                </View>

                                            </View>
                                                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10,width: 160 }}>
                                                    <Text numberOfLines={1} style={styles.text1}>épisode {item.episode}</Text>
                                                    
                                                </View>
                                            </View>
                                    </TouchableOpacity>

                                    </View>
                                    )}
                                    horizontal
                                    />
                                
                            }
                        </View>
                        {error?
                      <TouchableOpacity onPress={()=>{getPodcastByName()}} style={{marginBottom:20,alignSelf:'center',backgroundColor:'orange',padding:8,borderRadius:50,marginTop:20}}>
                        
                        <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/></Text>
                      </TouchableOpacity>:null}

                        


                    </View>



                </View>
            </ScrollView>

            <View style={styles.bottomView} >

                

                
                

                <TouchableOpacity
                    style={{ backgroundColor: "#60103b", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                    onPress={() =>{
                            dispatch(setAudio(podcast));
                            dispatch(setPlayer(true));
                            dispatch(setImage(image));
                            dispatch(setIdSong(id));

/*                             navigation.navigate('ReadSound', {
                                id: id, image: image, auteur: auteur, titre: titre, categorie: categorie, resume: resume, lien: book,episode:episode,podcast:podcast
                            }) */
                        }
                    }
                    disabled={isLoading?true:false}
                >
                    {isLoading?
                            <ActivityIndicator size={20} color="white" />:
                            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, alignItems: "center", justifyContent: "center" }}><Ionicons name="caret-forward-circle" size={18} color="white" > Lire</Ionicons> </Text>
                    
                
                
                    }
                    

                    

                </TouchableOpacity>

            </View>

        </View>


    );
};
export default PodcastDetails;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,
        backgroundColor: "white"

    },
    container1: {
        alignItems: 'center'

    },
    iconContainer: {
        marginLeft: 10
      },
    imageDetails: {

        width: 220,
        height: 220,
        padding: 0,
        marginTop: -50,
        borderRadius: 20,
        borderLeftWidth: 10,
        borderColor: 'gray',
        backgroundColor: '#eef4f8',



    },
    textview: { width: '100%',paddingBottom: 200 },
    title: { fontSize: 19, fontWeight: 'bold', paddingLeft: 20, paddingTop: 10, marginBottom: 10, letterSpacing: 1, },
    title_episode:{ fontSize: 15, fontWeight: 'bold', paddingLeft: 20, paddingTop: 10, marginBottom: 20, color:"#60103b",letterSpacing: 1 },
    auteur: { fontSize: 16, paddingLeft: 20, letterSpacing: 1, color: 'gray' },
    title_resume: { fontSize: 19, paddingLeft: 20, paddingTop: 40, fontWeight: '700', letterSpacing: 0.5 },
    resume: { fontSize: 16, padding: 20,  letterSpacing: 1, lineHeight: 30, },
    categorie: { fontSize: 15, padding: 5, paddingLeft: 30, paddingRight: 30, borderWidth: 1, marginTop: 15, borderRadius: 20, letterSpacing: 1, }
    ,
    MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    bottomView: {

        width: '100%',
        height: 100,
        backgroundColor: '#ffff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        opacity: 1,
        bottom: 0
    },

    textStyle: {

        color: '#fff',
        fontSize: 22
    },
    containerpod: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1: {fontWeight: "500",fontSize:15,letterSpacing: 1,paddingLeft:10,color:'green'},
    text2: {paddingTop: 4,fontFamily: "Arial",fontSize:14,color:"#868995",letterSpacing: 1},
});
