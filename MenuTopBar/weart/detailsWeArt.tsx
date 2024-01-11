import { View, Text, ScrollView, ActivityIndicator, ImageBackground, Button, StyleSheet, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, Image, TextInput } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/user/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import Carrousel from './CarrouselArt';
import { URL_BASE } from '../../utils/utils';

const height = Dimensions.get('window').height;
const { width } = Dimensions.get('window');
const itemWidth = width / 4;
const DetailsWeArt = ({ route, navigation }) => {

  const userDataSelect = useSelector(state => state.userAuth.userDetails);
  const dispatch = useDispatch();



  var { id, image, auteur, title, categorie, resume, book, name, episode, created_at, texte, prix } = route.params;
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [loading, setIsLoading] = React.useState(false);
  const [ordered, setOdered] = React.useState(false);
  const [imageArt, setImageArt] = React.useState([]);
  const [urlImage, setUrlImage] = React.useState([]);

  const [isLoading1, setIsLoading1] = React.useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = ['70%'];


  
const images = [
  {
    url: 'https://maadsene.com/Arts/art7.png',
  },
  {
    url: 'https://maadsene.com/Arts/art2.png',
  },
  {
    url: 'https://maadsene.com/Arts/art8.png',
  },
];

  // callbacks
  /*   const handleSheetChanges = useCallback((index) => {
      sheetRef.current?.snapToIndex(index);
      console.log('handleSheetChanges', index);
    }, []); */

  useEffect(() => {

    //bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    bottomSheetModalRef.current?.present();

  }, []);



  const handleCloseModalPress = useCallback(() => {
    //console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    bottomSheetModalRef.current?.close();

  }, []);


  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const getImageArt = async () => {


    try {
      setIsLoading1(true);

      //console.log(userDataSelect.user.name);


      fetch(
        URL_BASE+'artImage/id/' + id,
        {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

          }
        }
      ).then(response => response.json()).then(data => {

        // alert(JSON.stringify(data));
        setImageArt(data.image)
        setIsLoading1(false);
        
        const urls = data.image.map((image) => ({ url: image.image }));
        setUrlImage(urls);
        //setOdered(true);


      });

      //const data = await response.json();





    } catch (e) {

      console.log(e);
      setIsLoading1(false);
    }

  }

  const sellArt = async () => {

    try {
      setIsLoading(true);

      console.log(userDataSelect.user.name);


      const response = await fetch(
        'https://mobile.maadsene.com/api/auth/sellArt',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userDataSelect.token,
          },
          body: JSON.stringify({ 'id': id, 'buyer': userDataSelect.user.name, 'phone': phone, 'adress': adress, 'art': title, 'prix': prix })
        }
      ).then(response => response.json()).then(data => {

        console.log(data);
        setIsLoading(false);
        setOdered(true);


      });

      //const data = await response.json();





    } catch (e) {

      console.log(e);
      setIsLoading(false);
    }

  }


  useEffect(() => {

    getImageArt();

  }, []);
  return (

    <View style={styles.MainContainer}>


      <View style={{padding:5}}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>



          <ScrollView style={styles.container} >
            <View style={{ width: '100%' }} >


              <TouchableOpacity
                style={{ alignItems: 'center', width: '100%', padding: 10 }}
                onPress={() =>
                  navigation.navigate('detailsWeArtImage', { id:id,images:urlImage,index:0})
                }>
                <ImageBackground
                  borderRadius={10}
                  source={{ uri:  image }}
                  resizeMode='cover' style={{ width: '100%', aspectRatio: 1 / 0.6 }} >



                </ImageBackground>


              </TouchableOpacity>
              <ScrollView style={{ height: 100, padding: 10, paddingTop: 3 }} horizontal showsHorizontalScrollIndicator={false}>
                {isLoading1 ?
                  <View>
                    <ActivityIndicator size={32} color="black" />
                  </View> :
                  imageArt.map((image,index) => (

                    <TouchableOpacity onPress={()=>{
                      navigation.navigate('detailsWeArtImage', { id:id,images:urlImage,index:index})
                    
                      }}>



                      <Image source={{ uri: image.image }} style={{ backgroundColor: '#eef4f8', width: itemWidth, borderRadius: 10, aspectRatio: 1 / 0.6, marginRight: 10 }} resizeMode='cover' />

                    </TouchableOpacity>
                  ))

                }
              </ScrollView>


              <View style={[styles.textview, { paddingBottom: 100 }]}>
                <Text style={{ fontSize: 17, padding: 15, paddingBottom: 5, color: 'black', fontWeight: '900' }}>{title}</Text>
                <Text style={{ fontSize: 16, padding: 15, paddingTop: 0, paddingBottom: 5, color: 'gray', fontWeight: '600' }}>Par: {auteur}</Text>
                <Text style={{ fontSize: 15, padding: 14, paddingTop: 0, color: 'gray', fontWeight: '500' }}>Date: {created_at}</Text>
                <Text style={{ fontSize: 17, padding: 14, paddingTop: 0, color: 'green', fontWeight: '900' }}>{prix} FCFA</Text>

                <Text style={{ fontSize: 15, padding: 14, paddingTop: 20, color: '#000', fontWeight: '600', paddingBottom: 5 }}>Description</Text>
                <Text style={{ fontSize: 15, padding: 14, paddingTop: 5, color: 'gray', fontWeight: '500' }}>{texte}</Text>




              </View>

            </View>
          </ScrollView>
      <View style={styles.bottomView} >


        <TouchableOpacity
          style={{ backgroundColor: "#ff914c", marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
          onPress={() => { handlePresentModalPress() }}
        >



          <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Pré-achat</Text>

        </TouchableOpacity>




      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        {!ordered ?
          <ScrollView style={styles.contentContainer}>
            <Image
              style={styles.picArt}
              source={{ uri:  image }}
            />
            <Text style={{ fontSize: 15, padding: 15, paddingBottom: 5, color: 'black', fontWeight: '900', alignSelf: 'center' }}>{title}</Text>

            <TextInput
              placeholder="Téléphone"
              value={phone}
              onChangeText={phone => setPhone(phone)}
              style={styles.input}
            />
            <Text style={{ alignSelf: 'center' }}>Adresse</Text>

            <TextInput

              value={adress}
              onChangeText={adress => setAdress(adress)}
              style={[styles.input, { marginTop: 0 }]}
              numberOfLines={4}
            />
            <TouchableOpacity
              style={{ backgroundColor: !loading ? "#ff914c" : '#ff914c99', marginTop: 15, marginBottom: 15, width: 300, alignItems: 'center', alignSelf: 'center', padding: 15, borderRadius: 10 }}
              onPress={() => { sellArt() }}
              disabled={loading ? true : false}
            >


              <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Envoyer</Text>

            </TouchableOpacity>


          </ScrollView> :

          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>

            <Ionicons
              name="md-checkmark-done-circle-outline"
              size={38}
              color="green"
            />
            <Text style={{ color: 'green', fontSize: 19 }}>Requête envoyée avec succès!</Text>


            <TouchableOpacity
              style={{ backgroundColor: "gray", marginTop: 25, marginBottom: 15, width: 300, alignItems: 'center', padding: 15, borderRadius: 10 }}
              onPress={() => {  handleCloseModalPress(); }}
            >



              <Text style={{ color: 'white', fontWeight: "bold", fontSize: 17 }} >Fermer</Text>

            </TouchableOpacity>


          </View>}
      </BottomSheetModal>

    </View>


  );
};
export default DetailsWeArt;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height,
    backgroundColor: "white"

  },
  container1: {


  },
  imageDetails: {

    width: 220,
    height: 320,
    padding: 0,
    marginTop: -50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 10,
    borderColor: 'gray',
    backgroundColor: '#eef4f8',



  },
  textview: { width: '100%' },
  title: { fontSize: 16, fontWeight: 'bold', paddingLeft: 20, paddingTop: 20, marginBottom: 10, letterSpacing: 1, },
  auteur: { fontSize: 14, paddingLeft: 20, letterSpacing: 1, color: 'gray' },
  title_resume: { fontSize: 17, paddingLeft: 20, paddingTop: 40, fontWeight: 'bold', letterSpacing: 1 },
  resume: { fontSize: 15, padding: 20, paddingBottom: 100, letterSpacing: 1, lineHeight: 30, },
  categorie: { fontSize: 15, padding: 5, paddingLeft: 30, paddingRight: 30, borderWidth: 1, marginTop: 15, borderRadius: 20, letterSpacing: 1, }
  ,
  MainContainer:
  {
    flex: 1,

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

  GoProBox1: {
    width: '95%',
    height: height / 3.5,
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
  contentContainer: {

  },
  picArt: {

    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },
  input: {
    //borderColor: "#000000",
    //borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#bdb9b9',
    fontSize: 16,
    padding: 13,
    paddingLeft: 19,
    borderRadius: 15,
    alignSelf: 'center',
    width: 300
  },
});

