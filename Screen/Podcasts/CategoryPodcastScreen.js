import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator, Dimensions, ImageBackground
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { addToList, removeToList } from '../../features/favorite/favoriteSlice';
import { useDispatch } from 'react-redux';
import { BookItemAudio } from '../../Component_items/BookItemAudio';
import { PodcastItem } from '../../Component_items/PodcastItem';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import { Pagination } from 'react-native-pagination';
import { PodcastService } from '../../services/api/podcastService';
import { $CombinedState } from '@reduxjs/toolkit';


const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function CategoryPodcastScreen({ route, navigation }) {
    const userDataSelect = useSelector(state => state.userAuth.userDetails);
    const dispatch = useDispatch();
    const favorite = useSelector((state) => state.favorite.favorite);

    //alert(nom)
    const [item, setItem] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [empty, setEmpty] = React.useState(false);
    const [endOfList, setEndOfList] = React.useState(false);
    const [isLoadingMore, setIsLoadingMore] = React.useState(false);
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


    const getPodcast = async () => {
        //let userToken = userData.token;
        setEmpty(true);
        setIsLoading(true);
        setError(false);
        setIsLoadingMore(true);

        
        try {

            const data = await PodcastService.getPodcastPagination(page);
            if(page>1){

                setItem([...item , ...data.podcasts])

            }else{
                setItem(data.podcasts);
            }

            if(data.podcasts.length == 0){
                setEndOfList(true);
           
            }


        } catch (e) {


            setError(true);
            setIsLoading(false);
            setIsLoadingMore(false);
            //actions.logout();

        } finally {
            setIsLoading(false)
            setIsLoadingMore(false);
        }

    }
    React.useEffect(() => {

        getPodcast();
    }, []);

    React.useEffect(() => {
        if(page>1){

            getPodcast();

        }

    }, [page]);


    const renderLoader = () => {
        return (
          isLoadingMore ?
            <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" color="#aaa" />
            </View> :  !isLoading && !error && !endOfList ?
        <TouchableOpacity onPress={()=>{setPage(page+1); }}>
        <Text style={{fontSize:17,textAlign:'center',color:'red',marginBottom:20}}>Voir plus</Text>
        </TouchableOpacity>:<Text style={{alignSelf:'center',color:'green'}}> - Fin de liste - </Text>
        );
      };

    const loadMoreItem = () => {

        setPage(page + 1);
    };

    return (
        <View style={styles.bg}>


            <View style={styles.ScrollViewcateg}>

                {error ?
                    <TouchableOpacity onPress={() => { getPodcast() }} style={{
                        marginBottom: 20, marginTop: 10, alignSelf: 'center',
                        backgroundColor: 'orange', padding: 8, paddingLeft: 35, paddingRight: 35, borderRadius: 70
                    }}>

                        <Text style={{ color: "white" }}><Ionicons size={20} name="ios-refresh-sharp" color="white" /> Actualiser</Text>
                    </TouchableOpacity> : null}
                <FlatList

                    columnWrapperStyle={{ flex: 1 }}
                    data={item}
                    style={{ paddingBottom: 150 }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item,index }) => (
                        <View style={{ marginBottom: 80, marginLeft: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('detailsPodcast',{item:item})
                                }}>
                                <View style={[styles.mainView, {}]}>
                                    {/* Première vue superposée */}
                                    <View style={[styles.overlayView, { backgroundColor: item.color }]}></View>
                                    {/* Deuxième vue superposée */}
                                    <View style={[styles.overlayView1, { backgroundColor: item.color }]}>


                                    </View>
                                    {/* troisième vue superposée */}
                                    <View style={styles.overlayView2}>
                                        <ImageBackground source={{ uri: item.image }} resizeMode="cover"
                                            imageStyle={{ borderRadius: 10 }} style={{ flex: 1, borderRadius: 20 }}>
                                        </ImageBackground>
                                    </View>
                                    <View style={{ height: windowWidth / 2 - 20 + 5 }}></View>
                                    <Text numberOfLines={1} style={styles.text1}>{item.name}</Text>
                                    <Text numberOfLines={1} style={styles.text2}>{item.artist}</Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                    )}

                    ListFooterComponent={renderLoader}
                    numColumns={2}
                    contentContainerStyle={{ marginBottom: 100, paddingBottom: 60 }}
                />


            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:20
    },
    textCateg: {
        fontSize: 30,
        marginLeft: 19,
        marginTop: 18,
        marginBottom: 20,
    },
    ScrollViewcateg: {
        marginTop: 0
    },



    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text1: { fontWeight: "500", fontSize: 15, letterSpacing: 1, marginTop: 10 },
    text2: { paddingTop: 4, fontFamily: "Arial", fontSize: 14, color: "#868995", letterSpacing: 1},
    mainView: {
        position: 'relative', // ajustez la largeur selon vos besoins
        aspectRatio: 1 / 1,
        marginRight: 10,// ajustez la hauteur selon vos besoins
        width: windowWidth / 2 - 20,
    },
    overlayView: {
        position: 'absolute',
        top: 15,
        left: 15,
        width: windowWidth / 2 - 35,
        height: windowWidth / 2 - 35,
        borderRadius: 10,
        opacity: 0.4 // couleur semi-transparente pour l'overlay
    },
    overlayView1: {
        position: 'absolute',
        top: 6,
        left: 6,
        right: 10,
        width: windowWidth / 2 - 30,
        aspectRatio: 1 / 1,
        borderRadius: 10,
        opacity: 0.9 // couleur semi-transparente pour l'overlay
    },
    overlayView2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 10,
        width: windowWidth / 2 - 30,
        aspectRatio: 1 / 1,
        borderRadius: 10,

        // couleur semi-transparente pour l'overlay
    },
});