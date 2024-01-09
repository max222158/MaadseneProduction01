import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeData } from '../../features/user/authSlice';
import { useEffect } from 'react';

const NewsComponent = () => {


    const navigation = useNavigation();
    const [news,setNews] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const homeData = useSelector((state)=> state.userAuth.homeData);
    
    useEffect(()=>{

        //alert(JSON.stringify(homeData));
        if (homeData.news && homeData.news.length) {

           // alert(homeData.news.length);
            setIsLoading(false);

        }else{
           // alert("non lenght");
        }
    },[homeData])
    if(isLoading){

        return <ActivityIndicator size={32} color="blue" />

    }
    return (
        <View style={{ flex: 1, padding: 7, backgroundColor: "#87858512", paddingTop: 20, marginBottom: 15 }}>

            <View >
                <Text
                    style={{
                        fontSize: 18,
                        color: 'black',
                        
                        fontFamily:"Poppins-Bold",
                        fontWeight: "500", letterSpacing: 1
                    }}>
                    Nouveautés
                </Text>
            </View>
            <ScrollView horizontal={true} style={styles.scroll} >

                {/*                     <TouchableOpacity style={styles.container} onPress={() =>
                            navigation.navigate('ReadBook',{image:'essaieetportrait.jpg',path: "https://readium.maadsene.com/reader/?epub=epub_content%2Fpg67096",title:"",idbook:7777})
                        }>
                        <View style={[styles.boxShadow,{width:320,flexDirection:'row',marginTop:30,paddingBottom:15,paddingLeft:10,paddingRight:10}]}>
                            <Image source={{uri:'https://maadsene.com/couverture/essaieetportrait.jpg'}}  style={{ width: 120, height: 160 ,borderRadius:10,marginTop:-25}}/>
                            <View style={{width:180,marginLeft:10,paddingTop:15}}>
                                <Text style={{fontSize:15,fontWeight:'800',color:'black',letterSpacing:1,marginLeft:5}} letterSpacing={0.8} numberOfLines={1}>Essais et Portraits</Text>
                                <Text style={{fontSize:11,marginLeft:5,paddingTop:10}} numberOfLines={5} >Ces portraits n'auraient jamais été réunis en volume sans l'aimable insistance de quelques bibliophiles ; écrits pour des revues, au moment que l'on jugea propice pour les faire paraître — le plus souvent à la mort de l'artiste dont j'essayai de retracer la figure</Text>
                            </View>

                        </View>
                        

                    </TouchableOpacity> */}
                {homeData.news.map((news, index) => (
                    <TouchableOpacity key={index} style={styles.container} onPress={() =>
                        navigation.navigate('ReadBook', { image: news.image,
                         path: news.path, title: "", idbook: news.id })
                    }>
                        <View style={[styles.boxShadow, { borderWidth: 1, width: 320, flexDirection: 'row', marginTop: 30, paddingBottom: 15, paddingLeft: 1, paddingRight: 10 }]}>
                            <Image source={{ uri: news.uri }} style={{ width: 120, height: 160, borderRadius: 10, marginTop: -25 }} />
                            <View style={{ width: 180, marginLeft: 10, paddingTop: 15 }}>
                                
                            </View>

                        </View>


                    </TouchableOpacity>
                ))}
                {/*                     <TouchableOpacity style={styles.container} onPress={() =>
                            navigation.navigate('ReadBook',{image:'lescarrabedor.jpg',path: "https://readium.maadsene.com/reader/?epub=epub_content%2Fpg67094",title:"",idbook:7779})
                        }>
                        <View style={[styles.boxShadow,{borderWidth:1,width:320,flexDirection:'row',marginTop:30,paddingBottom:15,paddingLeft:10,paddingRight:10}]}>
                            <Image source={{uri:'https://maadsene.com/couverture/lescarrabedor.jpg'}}   style={{ width: 120, height: 160 ,borderRadius:10,marginTop:-25}}/>
                            <View style={{width:180,marginLeft:10,paddingTop:15,paddingRight:10}}>
                                <Text style={{fontSize:15,fontWeight:'800',color:'black',letterSpacing:1,marginLeft:5}} letterSpacing={0.8} numberOfLines={1}>Le scarabée d'or</Text>
                                <Text style={{fontSize:11,marginLeft:5,paddingTop:10}} numberOfLines={5} >Le Scarabée d'or est une nouvelle policière et d'aventures d'Edgar Allan Poe, parue en juin 1843 dans le journal de Philadelphie Dollar Newspaper</Text>
                            </View>

                        </View>
                        

                    </TouchableOpacity> */}


            </ScrollView>

            <View style={{ flex: 1, marginTop: 20 }}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        marginLeft: 0,

    },
    scroll: {
        marginBottom: 0,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 0
    },
    boxShadow: {
        backgroundColor: '#ffff',
        borderColor: '#faebd700',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
export default NewsComponent