import { View, Text, Image } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, ImageBackground,TouchableOpacity,StyleSheet } from 'react-native';

const NewsComponent = () => {
    const navigation = useNavigation(); 
    return (
        <View style={{flex: 1, padding: 7, backgroundColor: '#ffff',paddingTop:20}}>
        
            <View >
              <Text
                style={{
                  fontSize: 19,
                  color: 'black',
                  paddingLeft: 13,
                  fontWeight: "500",letterSpacing: 1
                }}>
                Nouveautés
              </Text>
            </View>
                    <ScrollView horizontal={true} style={styles.scroll} >

                    <TouchableOpacity style={styles.container} onPress={() =>
                            navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/pg67096.epub",title:"",idbook:7777})
                        }>
                        <Image source={require('../../assets/home/essaieetportrait.png')} style={{ width: 160, height: 240 }}/>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.container}  onPress={() =>
                            navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/pg12603.epub",title:"",idbook:7778})
                    }>
                        <Image source={require('../../assets/home/latetedemartin.png')} style={{ width: 160, height: 240 }}/>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container}  onPress={() =>
                            navigation.navigate('ReadBook',{path: "https://maadsene.s3.amazonaws.com/pg67094.epub",title:"",Image:"" ,idbook:7779})
                    }>
                        <Image source={require('../../assets/home/lescarrabedor.png')} style={{ width: 160, height: 240 }}/>

                    </TouchableOpacity>
                </ScrollView>
          
          <View style={{flex: 1, marginTop: 20}}>

          </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        marginLeft: 8,

    },
    scroll:{
        marginBottom:30,
        marginTop:10
    }
});
export default NewsComponent