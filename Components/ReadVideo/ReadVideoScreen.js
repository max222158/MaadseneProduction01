import * as React from 'react';
import { AuthContext } from '../../context/context';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { ScrollView, StatusBar, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
//react native creer un screen react-native-video-playerreact native creer un screen react-native-video-playerreact native creer un screen react-native-video-player
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';


export const ReadVideoScreen = ({ navigation,goBack , route }) => {

    var { lien_video, titre } = route.params;
    let path="dial";

    const [zoom,setZoom] = React.useState(100);
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(() => {



    }, []);


    //let injectedJS = `window.BOOK_PATH = "${path}"; window.LOCATIONS = ${locations};window.THEME = ${JSON.stringify(themeToStyles(theme))};`;
    
    return (


        <SafeAreaView style={{ flex: 1 , backgroundColor:"black"}}>
            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />

            <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:20,marginTop:10,zIndex:9999}}>
            <Ionicons name="ios-arrow-back-outline" size={30} color="#ffff" />
            </TouchableOpacity>
            <WebView
                    
                    //source={Platform.OS == 'ios' ? htmlPathIos : { uri: 'http://futurepress.github.io/epub.js/examples/highlights.html' }}
                    //source={{ uri: lien_video}}
                    source={{ uri: "https://maadsene.com/mobile-video?video="+lien_video}}
                    originWhitelist={['*']}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccessFromFileURLs={true}
                    allowFileAccess
                    style={{ backgroundColor: '#000',flex:1 }}
                    textZoom={zoom}
                    //injectedJavaScriptBeforeContentLoaded={injectionJS}
                />
{/*                     <WebView
                    
                        //source={Platform.OS == 'ios' ? htmlPathIos : { uri: 'http://futurepress.github.io/epub.js/examples/highlights.html' }}
                        source={{uri:"http://futurepress.github.io/epub.js/examples/continuous-scrolled.html"}}
                        originWhitelist={['*']}
                        allowUniversalAccessFromFileURLs={true}
                        allowFileAccessFromFileURLs={true}
                        allowFileAccess
                        style={{ backgroundColor: '#FFF',flex:1 }}
                        textZoom={zoom}
                    />
 */}
 

{/*             <Video source={{uri: lien_video}}   
            
				style={styles.backgroundVideo1} 
				controls={true}
				fullscreen={true}
				resizeMode="contain"
                //onLoad={setIsLoading(true)}
                onLoadStart={()=>{setIsLoading(true)}}
                onReadyForDisplay={() => setIsLoading(false)}
                bufferConfig={{
                    minBufferMs: 9000,
                    maxBufferMs: 20000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000
                  }}
					
			/>  */}
{/*             {isLoading?
            <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center',backgroundColor:"#00000000" }}>
                <ActivityIndicator color="#ffff" size={32} style={{ marginBottom: 10 }} />
                <Text style={{ color: '#ffff', fontWeight: '500', textAlign: 'center' }}>Chargement de la vidéo...</Text>
            </View>:null} */}
        </SafeAreaView>


    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    container1: {
        alignItems: 'center'

    },
    imageDetails: {

        width: windowWidth / 1.8,
        height: height / 2,
        padding: 0,
        marginTop: -50,
        borderRadius: 20,



    },
    textview: { width: '100%' },
    title: { fontSize: 20, fontWeight: 'bold', paddingLeft: 20, paddingTop: 20 },
    auteur: { fontSize: 19, paddingLeft: 20 },
    resume: { fontSize: 18, padding: 20, paddingTop: 40, paddingBottom: 40 },
    categorie: { fontSize: 20, padding: 5, paddingLeft: 30, paddingRight: 30, borderWidth: 1, marginLeft: 20, marginTop: 15, borderRadius: 30 }
    ,
    backgroundVideo: {
        width: "100%",
        height: 300,
        backgroundColor: "red"

    },
    backgroundVideo1: {
        flex: 1,
        backgroundColor: 'black'
    },

});



