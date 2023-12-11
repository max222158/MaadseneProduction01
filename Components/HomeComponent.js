import * as React from 'react';
import { useState } from 'react';
import { Button, Text, TouchableOpacity, View, ScrollView, StatusBar, FlatList, Pressable, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
const Stack = createNativeStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookItem3 from '../Component_items/BookItem3';
import { BookItemAudio } from '../Component_items/BookItemAudio';
import { VideoItem } from '../Component_items/VideoItem';


export default function HomeComponent({ navigation }) {

  const menu_item = ['Livres','Livres Audios','Podcasts','Documents','Magasines','JollofTech'];

  const ListItemMenu = () => {
    const [selectedMenuIndex, setSelectedMenuIndex] = React.useState(0);
    return (
      <View style={style.categoryListContainer}>
        {menu_item.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedMenuIndex(index);
              
            }}>
            <Text
              style={[
                style.categoryListText,
                index == selectedMenuIndex && style.activeCategoryListText,
              ]}>
                
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true} barStyle="dark-content"
      />
      <View style={{ backgroundColor: "white", padding: 5, borderTopWidth: 1, borderTopColor: '#dee2e6' }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingLeft: 15, paddingBottom: 3 }}>
          <ListItemMenu />
        </ScrollView>

      </View>
      <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="Home1" component={HomeScreen1} options={{
            tabBarVisible: false, headerStyle: {
            backgroundColor: '#ffff',
          }, headerShadowVisible: false, headerShown: false
        }} />
        <Stack.Screen name="Home2" component={HomeScreen2} options={{
          tabBarVisible: false, headerStyle: {
            backgroundColor: '#ffff',
          }, headerShadowVisible: false, headerShown: false
        }} />

      </Stack.Navigator>



    </View>
  );
}
function HomeScreen1({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [booksAudio, setBooksAudio] = useState([]);
  const [booksVideo, setBooksVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BookItem1 = ({ item }) => {

      return (
  
          <View style={{ width: 160, marginLeft: 8 }} >
              <View style={{ flex: 2, width: 160 }}>
  
  
                  <TouchableOpacity onPress={()=>{navigation.navigate('SignUpScreen')}}>
                  <ImageBackground source={{ uri: "https://maadscribd.com/couverture/" + item.image }} resizeMode="cover" style={{ flex: 1, height: 220 }}>
  
                  </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingLeft: 10, paddingTop: 14, width: 160 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.titre}</Text>
                  <Text style={{ paddingTop: 4 }}>{item.auteur}</Text>
              </View>
  
          </View>
  
      );
  
  };
  React.useEffect(() => {



    setTimeout(async () => {
      let userToken = await AsyncStorage.getItem('userToken');
      let url = 'https://mobile.lesabeillessolidaires.com/api/auth/allBooks?token=' + userToken.slice(1, -1);
      //let url_audio = 'https://mobile.lesabeillessolidaires.com/api/auth/allBooks_audio?token=' + userToken.slice(1, -1);
      //return console.log(url);
      try {

        await fetch(url)
          .then(response => response.json())
          .then(data => {
            //console.log(data);
            setBooks(data.livre);
            setBooksAudio(data.podcast);
            setBooksVideo(data.videos);
            setIsLoading(false);
            //alert(data);
          });
      } catch (e) {
        console.log(e);
      }



    }, 10);
  }, []);
  return (

    


    <SafeAreaView style={{ backgroundColor: "#ffff" }}>
      <ScrollView style={{ backgroundColor: "#ffff" }}>
        <View style={{ flex: 1, padding: 7, backgroundColor: "#ffff" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2 }}>

              <Text style={{ fontSize: 17, color: "gray", fontWeight: '800' }}>Sélectionner pour vous</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>

              <Text style={{ fontSize: 17, color: "gray" }}>Plus + </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20, height: 300 }}>
            
            <ActivityIndicator size="large" color="blue" animating={isLoading}/>
            <FlatList

              data={books}
              keyExtractor={(item) => item.id.toString()}          
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{navigation.navigate('DetailsBook', {
                  id: item.id,
                  auteur: item.auteur,
                  image: item.image,
                  titre:item.titre,
                  categorie:item.categorie,
                  resume: item.resume,
                  book:item.lien_livre,
                  support:item.support


                })}}>
                  <BookItem3 item={item} />
                </TouchableOpacity>
                
            
            )}
              horizontal
            />
          </View>
        </View>

        <View style={{ flex: 1, padding: 7, backgroundColor: "#ffff", marginTop: 9 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2 }}>

              <Text style={{ fontSize: 17, color: "gray", fontWeight: '800' }}>Podcasts recommandés</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>

              <Text style={{ fontSize: 17, color: "gray" }}>Plus + </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
              data={booksAudio}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{navigation.navigate('DetailsBook', {
                  id: item.id,
                  auteur: item.auteur,
                  image: item.image,
                  titre:item.titre,
                  categorie:item.categorie,
                  resume: item.resume,
                  book:item.lien_livre,
                  support:item.support


                })}}>
                  <BookItemAudio item={item} />
                </TouchableOpacity>
                
            
            )}
              horizontal
            />
          </View>
        </View>
        <View style={{ flex: 1, padding: 7, backgroundColor: "#ffff", marginTop: 9 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2 }}>

              <Text style={{ fontSize: 17, color: "gray", fontWeight: '800' }}>Vidéos </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>

              <Text style={{ fontSize: 17, color: "gray" }}>Plus + </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
              data={booksVideo}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{navigation.navigate('DetailsBook', {
                  id: item.id,
                  auteur: item.auteur,
                  image: item.image,
                  titre:item.titre,
                  categorie:item.categorie,
                  resume: item.resume,
                  book:item.lien_livre,
                  support:item.support


                })}}>
                  <VideoItem item={item} />
                </TouchableOpacity>
                
            
            )}
              horizontal
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>


  );

}
function HomeScreen2({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text>Home Screen2</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home1')}


      />

      <TouchableOpacity style={{ backgroundColor: "#bgf", marginTop: 28 }}
        onPress={() => { signOut() }}
      >
        <Text style={{ fontSize: 19 }}>Logout</Text>

      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
categoryListText: {

  fontSize: 18, 
  paddingTop: 10,
  paddingBottom: 10,
  marginRight: 20,
  marginLeft: 0,
},

activeCategoryListText: {

  textAlign: "center",
  fontSize: 18,
  paddingTop: 10,
  paddingBottom: 10,
  marginRight: 20,
  marginLeft: 0,
  borderBottomWidth: 4,
  borderBottomColor: "#60103b",
  color: "#60103b"
},
categoryListContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingRight: 5,
}
});