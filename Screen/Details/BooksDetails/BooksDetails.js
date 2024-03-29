import * as React from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert } from 'react-native';
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { addToList, removeToList, setFavorite } from '../../../features/favorite/favoriteSlice';
import { useSelector, useDispatch } from 'react-redux';

const BooksDetails = ({ navigation, route }) => {

    const dispatch = useDispatch();
    let favorite = useSelector((state) => state.favorite.favorite);
    const is_register = useSelector((state) => state.billing.isRegister);
    var { item } = route.params;
    /*     let item =  {
            id: id,
            auteur: auteur,
            image: image,
            titre: titre,
            categorie: categorie,
            resume: resume,
            book: book,
            epub: epub,
            support: support,
          }; */
    // alert(JSON.stringify(item));

    const isExist = (movie) => {

        if (favorite.filter(item1 => item1.id === item.id).length > 0) {
            return true
        }

        return false
    }

    const onTapAddTolist = (movie) => {
        console.log(favorite);
    
        if(favorite.filter(item => item.support === movie.support).length>=30){
    /*       let newState = favorite.filter(item => item.support !== 'Livre');
          console.log(favorite.filter(item => item.support !== 'Livre').length);
          // Retirer le dernier élément du tableau filtré
          newState.pop(); */
    
    // Trouver l'index du dernier élément avec support "Livre"
          //const indexToRemove = favorite.map(item => item.support).lastIndexOf("Livre");
          let lastIndex = null;
    
          // Parcours du tableau en commençant par la fin
          for (let i = favorite.length - 1; i >= 0; i--) {
              // Vérification si le support est "Livre"
              if (favorite[i].support === movie.support) {
                  // Si c'est le cas, on sauvegarde l'index et on arrête la boucle
                  lastIndex = i;
                  break;
              }
          }
          //favorite.splice(lastIndex, 1);
          favorite = favorite.filter((item, i) => i !== lastIndex);
    
          // Affichage de l'index du dernier élément avec support "Livre"
          console.log("L'index du dernier élément avec support 'Livre' est :", lastIndex);
          //alert("--last== "+lastIndex + '--'+favorite.length);
    
          dispatch(setFavorite(favorite));
    
          
    
          // Supprimer l'élément correspondant à cet index s'il existe
    /*       if (indexToRemove !== -1) {
              favorite.splice(indexToRemove, 1);
          }
     */
        
         // alert(favorite.filter(item => item.support === movie.support).length);
          //dispatch(setFavorite(favoris_filtres));
          //console.log(newState);
    
    
        }
    
    
    
        dispatch(addToList(movie));
        //console.log("list favorite",favorite)
      }
    const onTapRemoveTolist = (movie) => {

        dispatch(removeToList(movie));
        //console.log("list favorite",favorite)
    }

    React.useEffect(()=>{

        //alert(JSON.stringify(item));

    },[]);
    return (

        <View style={styles.MainContainer}>



            <ScrollView style={styles.container} >
                <View style={styles.container1} >
                    <View style={{ backgroundColor: "#ffff", width: "100%", height: 100, borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}></View>
                    <Image
                        source={{ uri: item.image }}
                        resizeMode="cover"
                        style={styles.imageDetails}
                        imageStyle={{ borderWidth: 5, borderColor: "red" }}

                    />

                    <View style={styles.textview}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.title}>{item.titre}</Text>
                            <Text style={styles.auteur}>Par {item.auteur}</Text>
                        </View>
                        <View style={{
                            justifyContent: 'center', alignSelf: 'center', backgroundColor: '#eee',
                            width: windowWidth > 500 ? 400 : windowWidth - 50, flexDirection: 'row', marginTop: 10, borderWidth: 1, borderRadius: 5, borderColor: '#bbb'
                        }}>
                            <TouchableOpacity style={{ alignItems: "center", flex: 1 / 2, borderRightWidth: 1, borderRightColor: '#bbb' }} onPress={() => navigation.navigate('Category', {
                                id: item.id,
                                nom: item.categorie,
                            })}>
                                <Text style={styles.categorie} numberOfLines={1}>{item.categorie}</Text>
                            </TouchableOpacity>


                            {isExist() ?

                                <TouchableOpacity style={{ alignItems: "center", flex: 1 / 2, justifyContent: 'center' }} onPress={
                                    () => onTapRemoveTolist(item)}>
                                    <Ionicons name="ios-heart" size={20} color="#60103b" />

                                </TouchableOpacity>


                                :
                                <TouchableOpacity style={{ alignItems: "center", flex: 1 / 2 }} onPress={() =>
                                    onTapAddTolist(item)}>
                                    <Text style={styles.categorie} numberOfLines={1}>
                                        <Ionicons name="ios-heart-outline" size={20} color="black" style={{ marginTop: 0 }} /> </Text>

                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.title_resume}>Résumé</Text>
                        <Text style={styles.resume}>{item.resume}</Text>
                    </View>

                </View>
            </ScrollView>

            <View style={styles.bottomView} >


                {is_register || item.free == 1 ?

                    item.ready == 1 ? <TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                        onPress={() =>
                            navigation.navigate('ReadBook', { path: item.epub_mobile_new_reader, idbook: item.id,
                                 image: item.image, title:item.titre,titre:item.titre,auteur:item.auteur,free:item.free })
                        }
                    >


                        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Lire le livre</Text>

                    </TouchableOpacity> : <TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}

                    >


                        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Disponible pour bientôt </Text>

                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                        onPress={() => { navigation.navigate('Subscription') }}
                    >


                        <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Abonnez-vous pour continuer</Text>

                    </TouchableOpacity>

                }




            </View>

        </View>


    );
};
export default BooksDetails;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,
        backgroundColor: "white"

    },
    container1: {
        alignItems: 'center'

    },
    imageDetails: {

        width: 160,
        height: 230,
        padding: 0,
        marginTop: -50,
        borderRadius: 10,
        backgroundColor: '#eef4f8',



    },
    textview: { width: '100%' },
    title: { fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 20, marginBottom: 10, letterSpacing: 1, },
    auteur: { fontSize: 14, paddingLeft: 20, letterSpacing: 1, color: 'gray' },
    title_resume: { fontSize: 17, paddingLeft: 20, paddingTop: 40, fontWeight: 'bold', letterSpacing: 1 },
    resume: { fontSize: 15, padding: 20, paddingBottom: 100, letterSpacing: 1, lineHeight: 30, fontFamily: 'Poppins' },
    categorie: { fontSize: 15, padding: 15, paddingLeft: 30, paddingRight: 30, marginTop: 5, borderRadius: 20, letterSpacing: 1, }
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
    }
});
