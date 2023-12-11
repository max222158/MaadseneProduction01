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
        fetch('https://mobile.maadsene.com/api/registerWithPhone', {
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
            phone:telephone
          }),
        }).then((response) => response.json())
        .then((json) => {

          try{

          if(json.hasOwnProperty('errors') || json.hasOwnProperty('message')){
            if(json.errors.phone[0] === "The phone has already been taken."){
  
              //alert("Cet email existe déjà!");
              setErrornum(true);
            }

            if(message){

                setErrornumValide(true);
            }

            setIsLoading(false);
            
          }else{
            registerCOnfirmation();
            //signInWithPhoneNumber(telephone);
          }
        }catch(e){
          setIsLoading(false);

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
        fetch('https://mobile.maadsene.com/api/registerWithPhoneConfirm', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nom,
            email: email,
            password: password,
            phone:telephone
          }),
        }).then((response) => response.json())
        .then((json) => {

          let data = {email: email, password: password};
          //return console.log(data);
          
          //alert("connexion");
          dispatch(signIn(data));
          
          //setIsLoading(false);
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

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isStart, setIsStart] = useState(false);

    const [code, setCode] = React.useState('');
    

        // Handle the button press
    async function signInWithPhoneNumber(phoneNumber) {
      setIsLoading(true);
      try{

        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        setIsLoading(false);


      }catch(e){

        //alert("errrrorrrrrrrr")

        setIsLoading(false);
        //setError(e);
        //alert("ye"+e);

      }
      //register();

    }

    async function confirmCode() {
      setIsLoading(true);
      try {

        registerCOnfirmation();
  

          setIsLoading(false);
          // const user = useSelector((state) => state.userDetails);
      
      } catch (error) {
       // alert(error);
        setIsLoading(false);
      }
    }

    function resendCode(){

      setTimeout(() => {

        setIsLoading(false);
        
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
            {
                isLoading ?  <ActivityIndicator size={40} color="#60103b"/>:null

            }
            <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white',marginTop:28}} >
              
            <View style={{alignItems:'center'}}>  
              {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
              <Text style={{fontSize:30,fontWeight:'900',color:'#60103b'}}>MAADSENE</Text>
              
            </View>
              <View style={{padding:15,marginTop:50}}>
            
                <Text style={{fontSize:14,fontWeight:"600",marginTop:5,letterSpacing:1.2}}>Saisissez votre numéro de téléphone</Text> 
              </View>
              <View style={{padding:15,alignItems:"center",justifyContent:"center"}}>    
      
                <View style={{flex:1,width:"100%"}}>
  

                  <PhoneInput
                              containerStyle={{ flex:1 ,width:'100%',fontSize:15}}
                          
                              defaultValue={value}
                              defaultCode="SN"
                              layout="first"

                              onChangeFormattedText={(telephone) => {
                                
                                setTelephone(telephone);
                                //alert(telephone);
                              }}
                              
                              placeholder="Téléphone"
                              autoFocus
                              textInputStyle={{padding:0}}
                    />
                            
                            <View style={{flex: 1, width: '100%'}}>
                                          <TextInput
                                            placeholder="Saisissez votre mot de passe"
                                            value={password}
                                            onChangeText={password => setPassword(password)}
                                            secureTextEntry
                                            style={[styless.input,{marginBottom:5,marginTop:20}]}
                                          />
                                        </View>

                  {errornumvalide? <Text style={{color:'red'}}>Ce numéro n'est pas valide!</Text>:null}
                  {errornum ? <Text style={{color:'red'}}>Ce numéro est déjà utilisé par un compte!</Text>:null}
  
                </View>
  
  
                  <TouchableOpacity
                    style={{backgroundColor:!isLoading?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                    onPress={()=>{register()}}  disabled={isLoading?true:false}
                    
                  >
        
                        <Text style={{fontSize:15,color:'white',letterSpacing:1}}>{!isLoading?"Valider":"En cours..."}</Text>
        
                  </TouchableOpacity>
  
              </View>
            </ScrollView>
    
       
          </SafeAreaView>
    
       
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
      }
    

    if(confirm){
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styless.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{backgroundColor:'white',flex:1}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white',marginTop:28}} >
          {
                isLoading ?  <ActivityIndicator size={40} color="#60103b"/>:null

          }
          <View style={{alignItems:'center'}}>  
            {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
            <Text style={{fontSize:30,fontWeight:'900',color:'#60103b'}}>MAADSENE</Text>
          </View>
            <View style={{padding:15,marginTop:50}}>
          
              <Text style={{fontSize:20,fontWeight:"600",marginTop:5,letterSpacing:1.5}}>Code de vérification</Text> 
            </View>
            <View style={{padding:15,alignItems:"center",justifyContent:"center"}}>    
    
              <View style={{flex:1,width:"100 %"}}>

                <TextInput
                  placeholder="Entrer le code reçu"  value={code} onChangeText={text => setCode(text)} style={styless.input}
                />

              </View>

              <View style={{flex: 1, width: '100%'}}>
              <TextInput
                placeholder="Mot de passe"
                value={password}
                onChangeText={password => setPassword(password)}
                secureTextEntry
                style={[styless.input,{marginBottom:5}]}
              />
            </View>


                

                <TouchableOpacity
                    style={{backgroundColor:!isLoading?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                    onPress={() => confirmCode()}  disabled={isLoading?true:false}
                    
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
      fontSize:16,
      padding:18,
      borderRadius:15
  
    },
  });