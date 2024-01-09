import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
import { WeArtService } from '../../services/api/weartService';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const AllArt = ({ navigation, route }) => {

  const userDataSelect = useSelector(state => state.userAuth.userDetails);

  const [isLoading, setIsLoading] = React.useState(true);

  
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [art, setArt] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [endOfList, setEndOfList] = React.useState(false);


  const getArt = async () => {

    if(page == 1){

        setIsLoading(true);

    }

    setError(false);
    setIsLoadingMore(true);
    //let userToken = userData.token;


    try {

      const data = await WeArtService.getArt(page);
      if(page>1){
        setArt([...art,...data.weart]);
        //alert(JSON.stringify(data.weart));
      }else{
        setArt(data.weart);
        //alert(JSON.stringify(data.weart));

      }
      
      if(data.weart.length == 0){
        setEndOfList(true);
    
    }





    } catch (e) {

      //alert('dial' + e);
      //actions.logout();
      setIsLoading(false);
      setError(true);
      setIsLoadingMore(false);

    }finally{
      setIsLoading(false);
      setIsLoadingMore(false);
      
    }
  }

  React.useEffect(() => {

    getArt();
  }, []);

  
  React.useEffect(() => {
    if(page>1){
        getArt();
    }

  }, [page]);


  const renderLoader = () => {
    return (
      isLoadingMore ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };


  return (
    <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#ffff' }}>




        <View style={{ paddingRight: 10 }}>
          {error ?
            <TouchableOpacity onPress={() => { getArt() }} style={{ alignSelf: 'center', backgroundColor: 'orange', padding: 8, paddingLeft: 35, paddingRight: 35, borderRadius: 50, marginBottom: 20 }}>

              <Text style={{ color: "white" }}><Ionicons size={20} name="ios-refresh-sharp" color="white" /> Actualiser</Text>
            </TouchableOpacity> : null}
          {isLoading ?
            <View style={{ alignContent: 'center', justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
              <ActivityIndicator size={40} color="#691c43" />

            </View> :
            <>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 13,
                  marginBottom: 10,
                  fontFamily: 'Poppins-Bold',
                  fontWeight: "500", letterSpacing: 0.5
                }}>
                

              </Text>

              <FlatList
                columnWrapperStyle={{ flex: 1 }}
                data={art}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('detailsWeArt', {

                          id: item.id, image: item.image, title: item.titre, auteur: item.auteur,
                          created_at: item.created_at, texte: item.texte, prix: item.prix


                        });

                      }}>
                      <View style={{ width: windowWidth / 2 - 20, marginLeft: 10, marginRight: 10 }}>


                        <View style={styles.GoProBox1}>
                          <ImageBackground source={{ uri:  item.image }} resizeMode='cover' style={[styles.goProBgImage1, { aspectRatio: 1 / 1 }]}>



                          </ImageBackground>

                        </View>
                        <Text style={styles.title} numberOfLines={1}>{item.titre}</Text>
                        <Text style={styles.arstist} numberOfLines={1}>{item.auteur}</Text>


                      </View>
                    </TouchableOpacity>

                  </View>
                )}
                numColumns={2}
                ListFooterComponent={renderLoader}

              />
            </>
          }
        </View>
        {!isLoading && !error  && !endOfList?
        <TouchableOpacity onPress={()=>{setPage(page+1); }}>
        <Text style={{fontSize:17,textAlign:'center',color:'red',marginBottom:20}}>Voir plus</Text>
        </TouchableOpacity>:null}
      </ScrollView>

    </SafeAreaView>
  )
}

export default AllArt;

const styles = StyleSheet.create({
  GoProBox: {
    width: '100%',
    height: 200,
    marginTop: 0,
    marginBottom: 15,
    backgroundColor: '#eaf6f3',
    borderRadius: 0,
    alignSelf: 'center',
    overflow: 'hidden'

  },
  GoProBox1: {
    width: '100%',
    marginBottom: 3,
    aspectRatio: 1 / 1,
    backgroundColor: '#eaf6f3',
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    width: windowWidth / 2 - 20,

  },
  goProBgImage: {
    width: '100%', height: '100%',


  },

  goProBgImage1: {
    width: '100%',


  },

  goProText: {
    textAlign: 'center',
    fontSize: 40,
    marginTop: 10,
    fontWeight: 'bold',
    padding: 10,
    color: 'white'

  },
  GoProButton: {
    height: 60,
    width: 200,
    backgroundColor: 'red',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    top: 50
  },


  overlayView: {
    height: "100%",
    width: "100%",
    position: 'absolute',
    backgroundColor: '#3490dc94',

  },
  overlayView1: {
    height: "100%",
    width: "100%",
    position: 'absolute',
    backgroundColor: '#611039a6',

  },
  title: { fontSize: 15, paddingLeft: 0, marginBottom: 2, color: "#60103b", fontWeight: "600" },

  arstist: {
    fontSize: 14, paddingLeft: 0, marginBottom: 25, color: "#ggg", fontWeight: "500"
  }

})