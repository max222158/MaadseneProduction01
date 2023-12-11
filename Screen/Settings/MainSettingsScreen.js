import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const MainSettingsScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor:'white',flex:1,padding:10}}>
{/*         <TouchableOpacity onPress={()=>{navigation.navigate('ResetDataUser')}} style={{borderBottomColor:'gray',padding:15,borderBottomWidth:1}}>
            <Text style={{fontSize:17,fontWeight:'700'}}>Modifier les informations personnelles</Text>


        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>{navigation.navigate('ResetPassword')}} style={{borderBottomColor:'gray',padding:15,borderBottomWidth:1}}>
            <Text style={{fontSize:17,fontWeight:'700'}}>Modifier mon mot de passe</Text>


        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('DeleteAccount')}} style={{borderBottomColor:'gray',padding:15,borderBottomWidth:1}}>
            <Text style={{fontSize:17,fontWeight:'700',color:'red'}}>Supprimer mon compte</Text>


        </TouchableOpacity>
      
    </View>
  )
}

export default MainSettingsScreen