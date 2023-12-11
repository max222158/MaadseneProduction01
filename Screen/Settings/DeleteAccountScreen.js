import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { logout } from '../../features/user/authSlice';

const DeleteAccountScreen = () => {

  const [isLoading,setIsLoading] = React.useState(false);

    const userDataSelect = useSelector(state => state.userAuth.userDetails);
    const dispatch = useDispatch();
    const disconnect = () => {   
        dispatch(logout());            
    }

  const deleteUser = async() =>{
    //alert('fffffffffffff')


        setIsLoading(true);
        try {
    
    
          const response = await fetch(
            'https://mobile.maadsene.com/api/auth/deleteUser',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + userDataSelect.token,
              },
              body: JSON.stringify({'id':userDataSelect.user.id})
            }
          ).then(response => response.text()).then(data => {
            setIsLoading(false);
            disconnect();
            console.log(data);
        
        });

          //const data = await response.text();

          //console.log("delete user ",data);

          setIsLoading(false);



        }catch(e){

            console.log(e);
            setIsLoading(false);
            alert("Erreur lors de la suppression réessayez!")
        }
        

  }
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
            {
                isLoading ?  <ActivityIndicator size={40} color="#60103b"/>:null

            }
      <Text style={{fontSize:22,textAlign:'center'}}>La suppression du compte va supprimer vos informations personnelles et tout ce qui a un rapport avec l'application</Text>
      <TouchableOpacity disabled={isLoading?true:false} style={{width:'90%',padding:10,backgroundColor:'red',marginTop:25}} onPress={()=>{deleteUser()}}><Text style={{fontSize:22,textAlign:'center',color:'white'}}>Supprimer définitivement</Text></TouchableOpacity>
    </View>
  )
}

export default DeleteAccountScreen