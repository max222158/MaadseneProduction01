import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShapeCircleComponent from '../../../Component_items/Commons/ShapeCircleComponent'
import ButtonWithIconComponent from '../../../Component_items/Commons/ButtonWithIconComponent '
import ReadButtonComponent from '../../../Component_items/Commons/ReadButtonComponent'

const heightWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;

const ModalSettingComponent = ({ settingsVisible, setVisibility, webView }) => {



    return (
        <View style={{ flex: 1, backgroundColor: '#00000069', position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', top: 0, zIndex: 9999 }}>
            <View style={{ width:widthWindow>450?400: '80%', height: 500, backgroundColor: '#ffff', borderRadius: 10 }}>
                <Text style={{ fontSize: 17, fontFamily: 'Poppins-Bold', textAlign: 'center', marginTop: 15 }}>Paramétres du lecteur</Text>
                <ScrollView>
                <View style={{ width: "100%", height: 3, backgroundColor: '#bbb' }}></View>
                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Thème</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', margin: 10 }}>
                    <ShapeCircleComponent borderRadius={200} height={50} 
                    width={50} color="black" 
                     />
                    <ShapeCircleComponent borderRadius={200} height={50} width={50} color="white" />
                    <ShapeCircleComponent borderRadius={200} height={50} width={50} color="#f3e075" />
                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>


                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Taille de la police</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', margin: 10 }}>

                    <ShapeCircleComponent borderRadius={200} height={40} width={40} color="white" iconName="remove" />
                    <ShapeCircleComponent borderRadius={200} height={40} width={40} color="#ffff" iconName="add-outline" />
                </View>

                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>


                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Pagination</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around', margin: 10 }}>

                    <ButtonWithIconComponent colorText="black" iconName="arrow-forward" textButton="Horizontale" />
                    <ButtonWithIconComponent colorText="black" iconName="arrow-down-sharp" textButton="Verticale" />
         
                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>

                
                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Famille police</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around', margin: 10 }}>

                    <ButtonWithIconComponent colorText="black" textButton="Defaut" />
                    <ButtonWithIconComponent colorText="black"  textButton="Arial" />
         
                </View>

                </ScrollView>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <ReadButtonComponent  color="green" colorText="white" isLoading={false} width={250} textButton="Sauvegarder"/>
                </View>
                
            </View>
            


        </View>
    )
}

export default ModalSettingComponent

const styles = StyleSheet.create({})
