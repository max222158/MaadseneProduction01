import { View, Text, ScrollView, ImageBackground,TouchableOpacity,StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const homecarouselComponent= () => {
    const navigation = useNavigation(); 
    return (
        <ScrollView horizontal={true} style={styles.scroll} >
            <TouchableOpacity style={styles.container}  onPress={() =>
                    navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/moby-dick.epub",title:""})
                }>
                <ImageBackground
                    source={require('../../assets/home/1650573334.png')}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 6 }}
                    style={{ width: 300, height: 162 }}></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container} onPress={() =>
                    navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/monnier_nans_le_berger.epub",title:"Nans le berger"})
                }>
                <ImageBackground
                    source={require('../../assets/home/nans.jpg')}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 6 }}
                    style={{ width: 260, height: 162 }}></ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}  onPress={() =>
                    navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/nemirovsky_les_vierges.epub",title:"Les vierges"})
            }>
                <ImageBackground
                    source={require('../../assets/home/grand_cap.jpg')}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 6 }}
                    style={{ width: 250, height: 162 }}></ImageBackground>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {

        marginLeft: 18,

    },
    scroll:{
        marginBottom:30
    }
});

export default homecarouselComponent;