import * as React from 'react';
import { AuthContext } from '../../context/context';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { ScrollView, StatusBar, View, Image, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import Video from 'react-native-video';
//import VideoPlayer from 'react-native-video-controls';
//import {VideoPlayer} from 'react-native-video-player';
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { WebView } from 'react-native-webview';


export const ReadVideoScreen = ({ navigation: { goBack }, route }) => {

    var { lien_video, titre } = route.params;


    React.useEffect(() => {


    }, [])

    return (


        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                backgroundColor="black"
                barStyle="light-content"
            />

{/* 
            <VideoPlayer
                source={{ uri: "https://maadsene.com/livres_numeriques/" + lien_video }}

                onBack={() => { goBack() }}
            /> */}
            <WebView source={{ uri: lien_video }} style={{backgroundColor:'black'}} />


            {/* /* 			<Video source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}   
            
				style={styles.backgroundVideo1} 
				controls={true}
				fullscreen={true}
				resizeMode="contain"
					
			/> */ }
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




