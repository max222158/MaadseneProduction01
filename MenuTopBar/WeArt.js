import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchWithTimeout from '../utils/fetchWithTimeOut';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const WeArt = ({ navigation, route }) => {

  const userDataSelect = useSelector(state => state.userAuth.userDetails);

  const [isLoading,setIsLoading] = React.useState(true);
  const [art,setArt] = React.useState([]);
  const [error,setError] = React.useState(false);


  const getArt = async () =>{
    setIsLoading(true);
    setError(false);
      //let userToken = userData.token;
      let url =
        'https://mobile.maadsene.com/api/auth/getArt';

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
            console.log('Art FROM Art api', data);
            setArt(data.art);
            setIsLoading(false);
            //alert(data);
          });
      } catch (e) {
        
         // alert('dial' + e);
          //actions.logout();
          setIsLoading(false);
          setError(true);
        
      }
  }

  React.useEffect(() => {
        
    getArt();
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      <ScrollView style={{backgroundColor: '#ffff'}}>
      <TouchableOpacity onPress={()=>{}}>

      <View style={styles.GoProBox}>
            <ImageBackground source={require('../assets/art.jpg')} resizeMode='cover' style={styles.goProBgImage}>
            <View style={styles.overlayView}/>
            <Text style={styles.goProText}>Arts</Text>
            
            </ImageBackground>
        </View>
        </TouchableOpacity>




                      <View style={{paddingRight:10}}>
                      {error?
                      <TouchableOpacity onPress={()=>{getArt()}} style={{alignSelf:'center',backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:50,marginBottom:20}}>
                        
                        <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>
                      </TouchableOpacity>:null}
                            {isLoading?
                                <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
                                    <ActivityIndicator size={40} color="#691c43"/>
                                    
                                </View>:

                                    <FlatList
                                    columnWrapperStyle={{flex: 1}}
                                    data={art}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item}) => (
                                    <View >
                                    <TouchableOpacity
                                        onPress={() => {
                                          navigation.navigate('detailsWeArt', {

                                            id: item.id,image:item.image,title:item.titre,auteur:item.auteur,
                                            created_at:item.created_at,texte:item.texte,prix:item.prix


                                          });

                                        }}>
                                        <View style={{width:windowWidth/2-20,marginLeft:10,marginRight:10}}>
                                          

                                            <View style={styles.GoProBox1}>
                                                <ImageBackground source={{uri:"https://maadsene.com/Arts/"+item.image}}  resizeMode='cover' style={styles.goProBgImage}>
                                                
                                                
                                                
                                                </ImageBackground>
                                                
                                          </View>
                                          <Text style={styles.title} numberOfLines={1}>{item.titre}</Text>
                                          <Text style={styles.arstist} numberOfLines={1}>{item.auteur}</Text>


                                            </View>
                                    </TouchableOpacity>

                                    </View>
                                    )}
                                    numColumns={2}
                                    
                                    />
                                
                            }
                        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default WeArt;

const styles = StyleSheet.create({
  GoProBox: {
          width: '100%',
          height: 200,
          marginTop: 0,
          marginBottom:15,
          backgroundColor: '#eaf6f3',
          borderRadius: 0,
          alignSelf: 'center',
          overflow: 'hidden'
  
      },
    GoProBox1: {
        width: '100%',
        height: height/4,
        marginBottom: 3,
        backgroundColor: '#eaf6f3',
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden'

    },
  goProBgImage: {
          width: '100%', height: '100%',
  
  
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
  title:{fontSize:15,paddingLeft:0,marginBottom:2,color:"#60103b",fontWeight:"600"},

  arstist:{
    fontSize:14,paddingLeft:0,marginBottom:25,color:"#ggg",fontWeight:"500"
  }
  
  })