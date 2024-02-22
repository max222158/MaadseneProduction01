import { View, Text,SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper';
import React from 'react'
import ReadButtonComponent from '../../Component_items/Commons/ReadButtonComponent';

const Payment = ({navigation}) => {
  return (
    <ScrollView style={{ flex: 1 , backgroundColor:'white',padding:20}}>

        <View>
            <Text style={{fontSize:16,fontWeight:'900',letterSpacing:1,color:'black'}}>Montant à payer</Text>
        </View>
        <View style={{backgroundColor:'#d3dbe7',padding:20,borderRadius:5,marginTop:15}}>
            <Text style={{fontSize:16,letterSpacing:1,color:'black'}}>Montant total dû</Text>
            <Text style={{fontSize:14,letterSpacing:1,color:'black',fontWeight:'800'}}>1 000 FCFA ou €1.6</Text>
        </View>
        <View>
            <Text style={{fontSize:16,fontWeight:'900',letterSpacing:1,color:'black',marginTop:20}}>Selectionner un moyen de paiement</Text>
        </View>
        <TouchableOpacity  style={[styles.btn_pay]} onPress={()=>{navigation.navigate('Paydunya')}}>
            <Text style={{fontSize:16,fontFamily:'Poppins-Bold',letterSpacing:1,color:'black',marginTop:2}}>Mobile Money</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/Orange-Money.png')} style={{marginRight:10,borderRadius:8,width:100,height:50}} />
                <Image source={require('../../assets/wave.jpg')} style={{marginRight:10,borderRadius:8,width:50,height:50}} />
                <Image source={require('../../assets/wizall.png')} style={{marginRight:10,borderRadius:8,width:50,height:50}} />
                <Image source={require('../../assets/free-money.png')} style={{marginRight:10,borderRadius:8,width:100,height:50}} />

            </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn_pay]} onPress={()=>{navigation.navigate('Paydunya')}}>
            <Text style={{fontSize:16,fontFamily:'Poppins-Bold',letterSpacing:1,color:'black',marginTop:2}}>Carte débit ou crédit</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/visa.png')} style={{marginRight:10,borderRadius:8}} />
                <Image source={require('../../assets/mastercard.jpg')} style={{marginRight:10,borderRadius:8}} />

            </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn_pay]} onPress={()=>{navigation.navigate('Paydunya')}}>
            <Text style={{fontSize:16,fontWeight:'500',fontFamily:'Poppins-Bold',  letterSpacing:1,color:'black',marginTop:2}}>Paypal</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/paypal-logo.png')}  style={{marginRight:10,borderRadius:8,height:40,resizeMode:'contain'}} />

            </View>
        </TouchableOpacity>
{/*         <View style={{marginTop:50}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Paydunya')}} style={{backgroundColor:'blue',borderRadius:7,padding:15,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18}}>Payer maintenant</Text>
            </TouchableOpacity>
        </View> */}
        <View style={{height:100}}></View>

        <ReadButtonComponent colorText="white" color="blue" height={50} onPress={()=>{navigation.navigate('Paydunya')}} textButton="Payer maintenant" />
        
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    btn_pay:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#efefef',
        marginTop:40,
        paddingBottom:5

    }
})
export default Payment;