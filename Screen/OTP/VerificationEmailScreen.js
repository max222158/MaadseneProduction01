import * as React from 'react';
import {useState,useRef} from 'react';
import { StatusBar,Button,ActivityIndicator,ImageBackground,ScrollView,Text, TouchableOpacity, View ,SafeAreaView, Alert,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../../style/styleComponentLogin';
import {  KeyboardAvoidingView,  Platform, TouchableWithoutFeedback,  Keyboard,StyleSheet  } from 'react-native';
import auth from '@react-native-firebase/auth';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from '../../features/user/authSlice';
import { userDetails,userSelector } from '../../features/user/authSlice';
const Stack = createNativeStackNavigator();
import PhoneInput from "react-native-phone-number-input";


export default function VerificationScreen({ navigation, route }) {

    var { nom,prenom,email} = route.params;
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();


    const register =  () => {
      setIsLoading(true);
      console.log('dial');
      setErrornum(false);
      setErrornumValide(false);
      setIsStart(true);
      resendCode();
  
       try {

        fetch('https://mobile.maadsene.com/api/registerWithOtp', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nom,
            last_name: prenom,
            email: email,
            password: password,
            phone:telephone,
            code:code
          }),
        }).then((response) => response.json())
        .then((json) => {

            if(json.status == 1){
               

                let data = {email: email, password: password};
                //return console.log(data);
                
                //alert("connexion");
                dispatch(signIn(data));
                setIsStart(false);
                /* return alert(JSON.stringify(json)); */

                
            }else{
                setIsStart(false);
                return alert("Ce code de validation est invalide!");


            }

            


    
          console.log(json);

        });
  
    
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      } 
    };

    const registerCOnfirmation =  () => {
      setIsLoading(true);
      console.log('dial');
      setErrornum(false);
      setErrornumValide(false);


      
  
      try {
        fetch('https://mobile.maadsene.com/api/mailto', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,

          }),
        }).then((response) => response.json())
        .then((json) => {

          let data = {email: email, password: password};
          //return console.log(data);
          
          //alert("connexion");
          //dispatch(signIn(data));
          
          setIsLoading(false);
          console.log(json);



        });
  
    
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    const [isLoading, setIsLoading] = React.useState(false);
    //const dispatch = useDispatch();
    React.useEffect(()=>{



      console.log(nom,prenom,email,password);

    },[]);

    const { userDetails,loading } = useSelector(
      userSelector
    );
    const [telephone, setTelephone] = React.useState("");
    // If null, no SMS has been sent
    const [confirm, setConfirm] = React.useState(null);
    const [errornum, setErrornum] = React.useState(false);
    const [errornumvalide, setErrornumValide] = React.useState(false);
    const [error, setError] = React.useState("");


    const [isStart, setIsStart] = useState(false);

    const [code, setCode] = React.useState('');



    function resendCode(){

      setTimeout(() => {

        setIsStart(false);
        
      }, 60000);
    }


    if(!confirm){
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styless.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={{backgroundColor:'white',flex:1}}>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
{/*             {
                isLoading ?  <ActivityIndicator size={40} color="#60103b"/>:null

            } */}
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white',marginTop:28}} >
              
            <View style={{alignItems:'center'}}>  
              {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
              <Text style={{fontSize:30,fontWeight:'900',color:'#60103b'}}>MAADSENE</Text>
              
            </View>
              <View style={{padding:10,marginTop:50}}>
            
                <Text style={{fontSize:13,fontWeight:"500",marginTop:5,letterSpacing:1.5,padding:5}}>
                    Un code de 
                    vérification à été envoyé  <Text style={{color:'red'}}>{email}</Text>
                </Text> 
              </View>
              <View style={{padding:15,alignItems:"center",justifyContent:"center"}}>    
      
                <View style={{flex:1,width:"100%"}}>
  


                            
                            <View style={{flex: 1, width: '100%'}}>
                                          <TextInput
                                            placeholder="Saisir le code"
                                            value={code}
                                            keyboardType="number-pad"
                                            onChangeText={code => setCode(code)}
                                            style={[styless.input,{marginBottom:5}]}
                                          />
                                        </View> 

                  {errornumvalide? <Text style={{color:'red'}}>Ce numéro n'est pas valide!</Text>:null}
                  {errornum ? <Text style={{color:'red'}}>Ce numéro est déjà utilisé par un compte!</Text>:null}
  
                </View>
  
  
                  <TouchableOpacity
                    style={{backgroundColor:!isStart?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                    onPress={()=>{register()}}   disabled={isStart?true:false} 
                    
                  >
        
                        <Text style={{fontSize:15,color:'white',letterSpacing:1}}>Valider</Text>
        
                  </TouchableOpacity>
  
              </View>
            </ScrollView>
    
       
          </SafeAreaView>
    
       
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
      }
    


  };

  const options = {
    container: {
      backgroundColor: '#000',
      padding: 2,
      borderRadius: 5,
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      marginLeft: 7,
      alignItems:'center',
      justifyContent:'center'
    }
  };
  const styless = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    },
    input:{
      
      //borderColor: "#000000",
      //borderBottomWidth: 1,
      marginBottom: 20,
      backgroundColor:'#edeef2',
      fontSize:15,
      padding:10,
      paddingLeft:18,
      borderRadius:15
  
    },
  });