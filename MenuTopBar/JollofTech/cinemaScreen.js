import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fetchWithTimeout from '../../utils/fetchWithTimeOut';
const CinemaScreen = ({navigation}) => {

  const userDataSelect = useSelector(state => state.userAuth.userDetails);

  const [isLoading,setIsLoading] = React.useState(true);
  const [cinema,setCinema] = React.useState([]);
  const [error,setError] = React.useState(false);

  const getCinema = async ()=>{


      setError(false);
      setIsLoading(true);
      //let userToken = userData.token;
      let url =
        'https://mobile.maadsene.com/api/auth/getCinema';

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
            setCinema(data.cinema);
            setIsLoading(false);
            //alert(data);
          });
      } catch (e) {
        

          //actions.logout();
          setIsLoading(false);
          setError(true);
        
      }
  }
  React.useEffect(() => {
        
    getCinema();
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#ffff',flex:1}}>
      <ScrollView style={{backgroundColor: '#ffff'}}>
      <TouchableOpacity onPress={()=>{}}>

      <View style={styles.GoProBox}>
            <ImageBackground source={require('../../assets/cinema.jpg')} resizeMode='cover' style={styles.goProBgImage}>
            <View style={styles.overlayView}/>
            <Text style={styles.goProText}>Cinéma</Text>
            
            </ImageBackground>
        </View>
        </TouchableOpacity>




                      <View style={{paddingRight:10}}>
                      {error?
                      <TouchableOpacity onPress={()=>{getCinema()}} style={{marginBottom:20,alignSelf:'center',backgroundColor:'orange',padding:8,paddingLeft:35,paddingRight:35,borderRadius:50,marginTop:20}}>
                        
                        <Text style={{color:"white"}}><Ionicons  size={20} name="ios-refresh-sharp" color="white"/> Actualiser</Text>
                      </TouchableOpacity>:null}
                            {isLoading?
                                <View style={{alignContent:'center',justifyContent:'center',flex:1,alignItems:'center',backgroundColor:'white'}}>
                                    <ActivityIndicator size={40} color="#691c43"/>
                                    
                                </View>:

                                    <FlatList
                                    data={cinema}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item}) => (
                                    <View >
                                    <TouchableOpacity
                                      onPress={() => {
                                        navigation.navigate('ReadVideoCinema', {
                                          id: item.id,
                                          lien_video: item.video

                                          
                                        });
                                      }}>
                                        <View>
                                          

                                            <View style={styles.GoProBox1}>
                                                <ImageBackground source={{uri:item.image}}  resizeMode='cover' style={styles.goProBgImage}>
                                                
                                                
                                                
                                                </ImageBackground>
                                                
                                          </View>
                                          <Text style={styles.title}>{item.nom}</Text>
                                          <Text style={styles.description} numberOfLines={3} >{item.description}</Text>


                                            </View>
                                    </TouchableOpacity>


                                    </View>
                                    )}
                                    
                                    />
                                
                            }
                        </View>

      </ScrollView>

    </SafeAreaView>
  )
}

export default CinemaScreen;

const styles = StyleSheet.create({
  GoProBox: {
          width: '100%',
          height: 200,
          marginBottom: 15,
          backgroundColor: '#eaf6f3',
          borderRadius: 0,
          alignSelf: 'center',
          overflow: 'hidden'
  
      },
    GoProBox1: {
        width: '95%',
        height: 200,
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
  title:{fontSize:15,paddingLeft:20,marginBottom:5,color:"#60103b",fontWeight:"600"}
  ,description:{fontSize:14,paddingLeft:20,marginBottom:25,color:"gray"}
  
  })