import * as React from 'react';
import { AuthContext } from '../../context/context';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { ScrollView, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const DetailsBookScreen = ({ navigation, route }) => {



    var { id, image, auteur, titre, categorie, resume , book,support} = route.params;

    return (
        <SafeAreaView>

            <ScrollView style={styles.container} >
                <View style={styles.container1} >
                    <View style={{backgroundColor:"#ab0d56a6",width:"100%",height:100,borderBottomRightRadius:50,borderBottomLeftRadius:50}}></View>
                    <ImageBackground source={{ uri: "https://maadscribd.com/couverture/" + image }}>

                    
                    <Image
                        source={{ uri: "https://maadscribd.com/couverture/" + image }}
                        resizeMode="cover"
                        style={styles.imageDetails}

                    />
                    </ImageBackground>
                    <View style={styles.textview}>
                        <Text style={styles.title}>{titre}</Text>
                        <Text style={styles.auteur}>Par {auteur}</Text>
                        <TouchableOpacity style={{ alignItems: "baseline" }} onPress={()=>navigation.navigate('Category')}><Text style={styles.categorie}>{categorie}</Text></TouchableOpacity>
                        <Text style={styles.resume}>{resume}</Text>
                    </View>
                    {support =="Livre" ? 
                        <TouchableOpacity
                            style={{ backgroundColor: "#60103b", marginTop: 15,marginBottom:15, width: 300, alignItems: 'center', padding: 5, borderRadius: 40 }}
                            onPress={() =>
                                navigation.navigate('ReadBook',{lien:book})
                            }
                        >


                            <Text style={{color:'white',fontSize:20}}>Lire le livre</Text>

                        </TouchableOpacity>
                    : null}

                    {support =="Livre audio" ? 
                    
                        <TouchableOpacity
                            style={{ backgroundColor: "#60103b", marginTop: 15,marginBottom:15, width: 200, alignItems: 'center', padding: 5, borderRadius: 40 }}
                            onPress={() =>
                                navigation.navigate('ReadBookAudio',{
                                    id:id, image:image, auteur:auteur, titre:titre, categorie:categorie,resume:resume,lien:book
                                })
                            }
                        >


                            <Text style={{color:'white',fontSize:20,alignItems:"center",justifyContent:"center"}}><Ionicons name="caret-forward-circle" size={25} color="white" > Lire</Ionicons> </Text>

                        </TouchableOpacity>                
                    : null}

                {support =="Vidéo" ? 
                    
                    <TouchableOpacity
                        style={{ backgroundColor: "#60103b", marginTop: 15,marginBottom:15, width: 200, alignItems: 'center', padding: 5, borderRadius: 40 }}
                        onPress={() =>
                            navigation.navigate('ReadVideo',{
                                id:id, image:image, auteur:auteur, titre:titre, categorie:categorie,resume:resume,lien:book
                            })
                        }
                    >


                        <Text style={{color:'white',fontSize:20,alignItems:"center",justifyContent:"center"}}><Ionicons name="caret-forward-circle" size={25} color="white" > Lire Vidéo</Ionicons> </Text>

                    </TouchableOpacity>                
                : null}
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
});
