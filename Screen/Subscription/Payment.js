import { View, Text,SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper';
import React from 'react'

const Payment = ({navigation}) => {
  return (
    <ScrollView style={{ flex: 1 , backgroundColor:'white',padding:20}}>

        <View>
            <Text style={{fontSize:16,fontWeight:'900',letterSpacing:1,color:'black'}}>Montant à payer</Text>
        </View>
        <View style={{backgroundColor:'#d3dbe7',padding:20,borderRadius:5,marginTop:15}}>
            <Text style={{fontSize:16,letterSpacing:1,color:'black'}}>Montant total dû</Text>
            <Text style={{fontSize:14,letterSpacing:1,color:'black',fontWeight:'800'}}>3 000 FCFA ou €4.56</Text>
        </View>
        <View>
            <Text style={{fontSize:16,fontWeight:'900',letterSpacing:1,color:'black',marginTop:20}}>Selectionner un moyen de paiement</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('Paydunya')}}>
            <Text style={{fontSize:16,fontWeight:'500',letterSpacing:1,color:'black',marginTop:20}}>Mobile Money</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/om.png')} style={{marginRight:10,borderRadius:8}} />
                <Image source={require('../../assets/wave.png')} style={{marginRight:10,borderRadius:8}} />
                <Image source={require('../../assets/wizall.png')} style={{marginRight:10,borderRadius:8}} />

            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('Paydunya')}}>
            <Text style={{fontSize:16,fontWeight:'500',letterSpacing:1,color:'black',marginTop:20}}>Carte débit ou crédit</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/visa.png')} style={{marginRight:10,borderRadius:8}} />
                <Image source={require('../../assets/mastercard.jpg')} style={{marginRight:10,borderRadius:8}} />

            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('Paypal')}}>
            <Text style={{fontSize:16,fontWeight:'500',letterSpacing:1,color:'black',marginTop:20}}>Paypal</Text>
            <View style={{flexDirection:'row',marginTop:10}}>
                <Image source={require('../../assets/paypal-logo.png')} style={{marginRight:10,borderRadius:8}} />

            </View>
        </TouchableOpacity>
{/*         <View style={{marginTop:50}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Paydunya')}} style={{backgroundColor:'blue',borderRadius:7,padding:15,alignContent:'center',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:18}}>Payer maintenant</Text>
            </TouchableOpacity>
        </View> */}
        
    </ScrollView>
  )
}

export default Payment;