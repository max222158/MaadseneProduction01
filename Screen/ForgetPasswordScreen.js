import * as React from 'react';
import { StatusBar, Button, ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View, SafeAreaView, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../style/styleComponentLogin';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { signIn } from '../features/user/authSlice';
import { userDetails, userSelector } from '../features/user/authSlice';
import PhoneInput from 'react-native-phone-number-input';
const Stack = createNativeStackNavigator();


export default function ForgetPasswordScreen({ navigation, route }) {





    const [isLoading, setIsLoading] = React.useState(false);
    //const dispatch = useDispatch();
    React.useEffect(() => {





    }, []);

    const { userDetails, loading } = useSelector(
        userSelector
    );
    const [telephone, setTelephone] = React.useState("");
    // If null, no SMS has been sent
    const [confirm, setConfirm] = React.useState(null);
    const [errornum, setErrornum] = React.useState(false);
    const [errornumvalide, setErrornumValide] = React.useState(false);
    const [isStart, setIsStart] = React.useState(false);

    const [code, setCode] = React.useState('');

    


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
          console.log("ye"+e);
  
        }
        //register();
  
      }
  
    async function setIfphoneExist() {

            console.log('dial');
            setIsStart(true);
            setIsLoading(true);
            
            try {
              fetch('https://mobile.maadsene.com/api/forgetPassword', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                  telephone:telephone
                }),
              }).then((response) => response.json())
              .then((json) => {

                //alert(JSON.stringify(json));
                if(json.check == true){
                    signInWithPhoneNumber(telephone);
                    resendCode();
                }else{
                    alert("Ce numéro n'est associé à aucun compte!");
                }
                setIsLoading(false);
                setIsStart(false);
                
        
              });
        
          
            } catch (e) {
              console.log("e============",e);
        
              setIsLoading(false);
              setIsStart(false);
            }
          
    }
    async function confirmCode() {
        setIsLoading(true);
        try {
            await confirm.confirm(code);
            navigation.navigate('NewPassword',{telephone:telephone});
            console.log("my bouner connection");


            let data = { email: 1, password: 12345678 };
            //return console.log(data);
            setIsLoading(false);

            //dispatch(signIn(data));
            // const user = useSelector((state) => state.userDetails);

        } catch (error) {
            alert("Code invalide!");
            setIsLoading(false);
        }
    }
    function resendCode(){

        setTimeout(() => {
  
          setIsStart(false);
          
        }, 60000);
      }


    if (!confirm) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styless.container}
            >
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                        {
                            isLoading ? <ActivityIndicator size={40} color="#60103b" /> : null

                        }
                        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', marginTop: 28 }} >

                            <View style={{ alignItems: 'center' }}>
                                {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
                                <Text style={{ fontSize: 30, fontWeight: '900', color: '#60103b' }}>MAADSENE</Text>
                            </View>
                            <View style={{ padding: 15, marginTop: 50 }}>

                                <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 5, letterSpacing: 1.5 }}>Mot de passe oublié!</Text>
                            </View>
                            <View style={{ padding: 15, alignItems: "center", justifyContent: "center" }}>

                                <View style={{ flex: 1, width: "100%" }}>

                                <PhoneInput
                              containerStyle={{ flex:1 ,width:'100%'}}
                          
                              defaultValue=""
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
                                    {errornumvalide ? <Text style={{ color: 'red' }}>Ce numéro n'est pas valide!</Text> : null}
                                    

                                </View>


{/*                                 <TouchableOpacity
                                    style={{ backgroundColor: "#60103b", marginTop: 18, width: "100%", alignItems: 'center', padding: 10, borderRadius: 10 }}
                                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} 
                                    onPress={() => {signInWithPhoneNumber(telephone) }}

                                >

                                    <Text style={{ fontSize: 19, color: 'white', letterSpacing: 1 }}>Valider</Text>

                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={{backgroundColor:!isStart?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                                    onPress={() => {setIfphoneExist() }}  disabled={isStart?true:false}
                                    
                                >
                        
                                        <Text style={{fontSize:19,color:'white',letterSpacing:1}}>{!isStart?"Valider":"Renvoyer dans 60s"}</Text>
                        
                                </TouchableOpacity>

                            </View>
                        </ScrollView>


                    </SafeAreaView>


                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }


    if (confirm) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={styless.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    {
                            isLoading ? <ActivityIndicator size={40} color="#60103b" /> : null

                        }
                        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', marginTop: 28 }} >

                            <View style={{ alignItems: 'center' }}>
                                {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
                                <Text style={{ fontSize: 30, fontWeight: '900', color: '#60103b' }}>MAADSENE</Text>
                            </View>
                            <View style={{ padding: 15, marginTop: 50 }}>

                                <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 5, letterSpacing: 1.5 }}>Code de vérification</Text>
                            </View>
                            <View style={{ padding: 15, alignItems: "center", justifyContent: "center" }}>

                                <View style={{ flex: 1, width: "100 %" }}>

                                    <TextInput
                                        placeholder="Entrer le code reçu" value={code} onChangeText={text => setCode(text)} style={styless.input}
                                    />

                                </View>




                                <TouchableOpacity
                                    style={{backgroundColor:!isLoading?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                                    /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                                     onPress={() => confirmCode()} disabled={isLoading?true:false}
                                    
                                >
                                    <Text style={{ fontSize: 15, color: 'white', letterSpacing: 1 }}>Confirmer</Text>
                        
                               </TouchableOpacity>

                            </View>
                        </ScrollView>


                    </SafeAreaView>


                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
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
    input: {

        //borderColor: "#000000",
        //borderBottomWidth: 1,
        marginBottom: 20,
        backgroundColor: '#edeef2',
        fontSize: 16,
        padding: 18,
        borderRadius: 15

    },
});