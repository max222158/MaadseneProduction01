import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeData } from '../../features/user/authSlice';
import { useEffect } from 'react';
const dataloader =[

    {id:1},{id:2},{id:3}

];
const NewsComponent = () => {


    const navigation = useNavigation();
    const [news,setNews] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const homeData = useSelector((state)=> state.userAuth.homeData);

    useEffect(()=>{

        //alert(JSON.stringify(homeData));
        if (homeData.news && homeData.news.length) {

           //alert(JSON.stringify(homeData.news));
            setIsLoading(false);

        }else{
           // alert("non lenght");
        }
    },[homeData])
    if(isLoading){

        return (
            <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false}>
            {dataloader.map((news, index) => (
                        <View style={[{ marginTop: 0, paddingBottom: 15, paddingLeft: 10, paddingRight: 10, }]}>
                        <View  style={{ width: 120, height: 160, borderRadius: 10, marginTop: 0,backgroundColor:'#007bff1c' }}></View>

                    </View>

            ))}
            </ScrollView>
        )

    }
    return (

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
                    <TouchableOpacity key={index} style={styles.container} onPress={() =>{
                        if(news.support === "Livre"){
                        navigation.navigate('ReadBook', { image: news.image,
                         path: news.path, title: "", idbook: news.id })
                        }
                        if(news.support === "Livre audio"){
                            navigation.navigate( 'DetailsBookAudio', {
                               item:item});
                        }

                    }}>

                <ImageBackground
                  borderRadius={10}
                  style={{ width: 130, height: 170, borderRadius: 10, marginTop: 0,marginRight:10,marginBottom:10,backgroundColor: '#007bff1c' }}
                  resizeMode='cover'
                  source={{ uri: news.uri }}
                  //style={{ width: imageWidth-5, marginTop: 15,aspectRatio: 1 / 1.5, backgroundColor: '#007bff1c',borderRadius:15 }}
                >
                {news.support == "Livre audio"?
                                      <View style={{flexWrap: 'wrap'}}>
                                      <Text style={{alignSelf: 'flex-start',backgroundColor:"red",color:"white",margin:3,fontSize:11,borderRadius:5,paddingLeft:3,paddingRight:3}}>Livre audio</Text>
                                    </View>:null

                }

                  {/* <Ionicons name='ios-heart' size={32} color="red" on /> */}
                
                </ImageBackground>



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

    )
}
const styles = StyleSheet.create({
    container: {

        marginLeft: 0,

    },
    scroll: {
        marginBottom: 0,
        marginTop: 2,
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