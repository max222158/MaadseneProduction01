import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShapeCircleComponent from '../../../Component_items/Commons/ShapeCircleComponent'
import ButtonWithIconComponent from '../../../Component_items/Commons/ButtonWithIconComponent '
import ReadButtonComponent from '../../../Component_items/Commons/ReadButtonComponent'

const heightWindow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;

const ModalSettingComponent = ({ settingsVisible, closeSettingsModal, webView }) => {

    const handleCloseSettings = () => {
        // Appeler la fonction passée en tant que prop pour fermer le modal
        closeSettingsModal();
      };

    const handleTheme = (theme) => {
        webView.current.injectJavaScript(`document.getElementById('${theme}').click();true`);
    }

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
                    onPress={()=>handleTheme('theme-noir')} />
                    <ShapeCircleComponent borderRadius={200} height={50} width={50} color="white" onPress={()=>handleTheme('theme-blanc')}  />
                    <ShapeCircleComponent borderRadius={200} height={50} width={50} color="#f3e075" onPress={()=>handleTheme('theme-orange')}  />
                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>


                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Taille de la police</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center', margin: 10 }}>

                    <ShapeCircleComponent borderRadius={200} height={40} width={40} color="white" iconName="remove" onPress={()=>{webView.current.injectJavaScript(`document.getElementById('diminuer').click();true`)}} />
                    <ShapeCircleComponent borderRadius={200} height={40} width={40} color="#ffff" iconName="add-outline" onPress={()=>{webView.current.injectJavaScript(`document.getElementById('augmenter').click();true`)}}  />
                </View>

                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>


                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Pagination</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around', margin: 10 }}>

                    <ButtonWithIconComponent colorText="black" iconName="arrow-forward" textButton="Horizontale" 
                    onPress={()=>webView.current.injectJavaScript(`document.getElementById('scrollx').click();true`)} />
                    
                    <ButtonWithIconComponent colorText="black" iconName="arrow-down-sharp" textButton="Verticale" 
                    onPress={()=>webView.current.injectJavaScript(`document.getElementById('scrolly').click();true`)} />
         
                </View>
                <View style={{ width: "100%", height: 2, backgroundColor: '#bbb' }}></View>

                
                <Text style={{ fontSize: 15, fontFamily: 'Poppins', textAlign: 'center', marginTop: 15 }}>Famille police</Text>


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-around', margin: 10 }}>

                    <ButtonWithIconComponent colorText="black" textButton="Defaut" />
                    <ButtonWithIconComponent colorText="black"  textButton="Arial" />
         
                </View>

                </ScrollView>
                <View style={{justifyContent:"center",alignItems:"center"}}>
                    <ReadButtonComponent  onPress={handleCloseSettings} color="green" colorText="white" isLoading={false} width={250} height={40} textButton="Sauvegarder"/>
                </View>
                
            </View>
            


        </View>
    )
}

export default ModalSettingComponent

const styles = StyleSheet.create({})
