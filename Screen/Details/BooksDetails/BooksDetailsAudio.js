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
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const PodcastDetails = ({ navigation, route }) => {

    const userDataSelect = useSelector(state => state.userAuth.userDetails);
    const stateAudio = useSelector(state=>state.audio.audio);

    //alert(JSON.stringify(stateAudio));

    var { id, image, auteur, titre, categorie, resume, url,support } = route.params;
    let bookAudio = [{'id':id,'title':titre,'url':'https://maadsene.com/livres_numeriques/'+url,'artist':auteur,'image':image}];
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




    React.useEffect(() => {

      }, []);

    return (

        <View style={[styles.MainContainer,{marginTop:0,paddingTop:0}]}>



            <ScrollView style={styles.container} >
                                
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.container1} >
                    <View style={{ backgroundColor: "#ffff", width: "100%", height: 100, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}></View>
                    <Image
                        source={{ uri: "https://maadsene.com/couverture/" + image }}
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
                            <TouchableOpacity style={{ alignItems: "center", flex: 1 / 2 }} onPress={() => {}}><Text style={styles.categorie} numberOfLines={1}>Livre audio</Text></TouchableOpacity>
                            {isExist() ?

                                <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={() => onTapRemoveTolist({id, image, auteur, titre, categorie, resume, 'url':url,support})}>
                                    <Text style={styles.categorie} numberOfLines={1}>
                                    <Ionicons name="ios-bookmark" size={18}color="#60103b"/> Favoris</Text>

                                </TouchableOpacity>


                                :
                                <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={() => 
                                onTapAddTolist({id, image, auteur, 'title':titre, categorie, 'description':resume, 'lien_livre':url,support})}>
                                <Text style={styles.categorie} numberOfLines={1}>
                                <Ionicons name="ios-bookmark-outline" size={18}color="black"/> Favoris</Text>

                                </TouchableOpacity>
                                }                        
                        </View>
                        <Text style={styles.title_resume}>Description</Text>
                        <Text style={styles.resume} numberOfLines={7}>{resume}...</Text>




                        


                    </View>



                </View>
            </ScrollView>

            <View style={styles.bottomView} >



                {is_register? 
                <TouchableOpacity
                    style={{ backgroundColor: "#60103b", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                    onPress={() =>{
                            dispatch(setAudio(bookAudio));
                            dispatch(setPlayer(true));
                            dispatch(setImage(image));
                            dispatch(setIdSong(id));

/*                             navigation.navigate('ReadSound', {
                                id: id, image: image, auteur: auteur, titre: titre, categorie: categorie, resume: resume, lien: book,episode:episode,podcast:podcast
                            }) */
                        }
                    }
                    
                >
                        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18, alignItems: "center", justifyContent: "center" }}><Ionicons name="caret-forward-circle" size={18} color="white" > Lire</Ionicons> </Text>
                    

                    </TouchableOpacity>:
                    <TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15,marginBottom:15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                        onPress={() => {navigation.navigate('Subscription')}}
                    >


                        <Text style={{color:'white',fontWeight:"bold",fontSize:17}} >Abonnez-vous pour continuer</Text>

                    </TouchableOpacity>
                    
                    }
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

