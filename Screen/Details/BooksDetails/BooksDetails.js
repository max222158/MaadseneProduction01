import * as React from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { addToList,removeToList } from '../../../features/favorite/favoriteSlice';
import { useSelector,useDispatch } from 'react-redux';

const BooksDetails = ({ navigation, route }) => {
    
    const dispatch = useDispatch();
    const favorite = useSelector((state)=> state.favorite.favorite);
    const is_register = useSelector((state)=> state.billing.isRegister);
    var { id, image, auteur, titre, categorie, resume , book,support,epub} = route.params;
    let item =  {
        id: id,
        auteur: auteur,
        image: image,
        titre: titre,
        categorie: categorie,
        resume: resume,
        book: book,
        epub: epub,
        support: support,
      };
   // alert(JSON.stringify(item));

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
    return (

           <View style = { styles.MainContainer }>
 
 
 
        <ScrollView style={styles.container} >
            <View style={styles.container1} >
                <View style={{backgroundColor:"#ffff",width:"100%",height:100,borderBottomRightRadius:50,borderBottomLeftRadius:50}}></View>
                <Image
                    source={{ uri: "https://maadsene.com/couverture/" + image }}
                    resizeMode="cover"
                    style={styles.imageDetails}
                    imageStyle={{borderWidth:5,borderColor:"red"}}

                />
             
                <View style={styles.textview}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Text style={styles.title}>{titre}</Text>
                        <Text style={styles.auteur}>Par {auteur}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',marginTop:7}}>
                        <TouchableOpacity style={{ alignItems: "center",flex:1/2 }} onPress={()=>navigation.navigate('Category', {
                      id: id,
                      nom: categorie,
                    })}><Text style={styles.categorie} numberOfLines={1}>{categorie}</Text></TouchableOpacity>

                        {isExist() ?

                    <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={
                        () => onTapRemoveTolist(item)}>
                        <Text style={styles.categorie} numberOfLines={1}>
                        <Ionicons name="ios-bookmark"size={18}color="#60103b"/> Favoris</Text>

                    </TouchableOpacity>

    
:
                    <TouchableOpacity style={{ alignItems: "center",flex:1/2 }}  onPress={() => 
                    onTapAddTolist(item)}>
                    <Text style={styles.categorie} numberOfLines={1}>
                    <Ionicons name="ios-bookmark-outline"size={18}color="black"/> Favoris</Text>

                    </TouchableOpacity>
              }

                    </View>
                    <Text style={styles.title_resume}>Résumé</Text>
                    <Text style={styles.resume}>{resume}</Text>
                </View>

            </View>
        </ScrollView>
               
        <View style={ styles.bottomView} >
 
                
                    {is_register?<TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15,marginBottom:15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
                        onPress={() =>
                            navigation.navigate('ReadBook',{path: book,idbook:id,image:image,imageUrl:false})
                        }
                    >


                        <Text style={{color:'white',fontWeight:"bold",fontSize:17}} >Lire le livre</Text>

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
export default BooksDetails;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,
        backgroundColor:"white"

    },
    container1: {
        alignItems: 'center'

    },
    imageDetails: {

        width: 220,
        height: 320,
        padding: 0,
        marginTop:-50,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderLeftWidth:10,
        borderColor:'gray',
        backgroundColor: '#eef4f8',



    },
    textview: { width: '100%' },
    title: { fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 20,marginBottom:10,letterSpacing: 1, },
    auteur: { fontSize: 14, paddingLeft: 20,letterSpacing: 1,color:'gray' },
    title_resume:{ fontSize: 17, paddingLeft: 20,paddingTop: 40, fontWeight: 'bold',letterSpacing: 1 },
    resume: { fontSize: 15, padding: 20,  paddingBottom: 100,letterSpacing: 1,lineHeight: 30, },
    categorie: { fontSize: 15, padding: 5, paddingLeft: 30, paddingRight: 30, borderWidth: 1, marginTop: 15, borderRadius: 20,letterSpacing: 1, }
,
    MainContainer:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },

    bottomView:{

      width: '100%', 
      height: 100, 
      backgroundColor: '#ffff', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      opacity:1,
      bottom: 0
    },

    textStyle:{

      color: '#fff',
      fontSize:22
    }
});
