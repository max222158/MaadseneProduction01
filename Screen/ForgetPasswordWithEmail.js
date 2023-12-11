import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, StyleSheet, ScrollView, ActivityIndicator, StatusBar } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ForgetPasswordWithEmail = ({navigation}) => {

    const [email, setEmail] = React.useState("");
    const [code, setCode] = React.useState("");
    const [isStart, setIsStart] = React.useState(false);
    const [otp, setOtp] = React.useState(false);
    const [loading, setIsLoading] = React.useState(false);

    const sendEmail = () => {
        console.log('dial');

        setIsLoading(true);

        try {
            fetch('https://mobile.maadsene.com/api/saveOtpForget', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            }).then((response) => response.json())
                .then((data) => {

                    //alert(JSON.stringify(data))
                    if(data.error == 1){
                         alert("Cet adresse mail ne correspond à aucun compte!");

                    }
                    if(data.status == 1){
                        setOtp(true);
                        //getCode();
                    }
                    setIsLoading(false);
                    console.log(json);



                });


        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }







    }

    const getCode = () =>{

        setIsLoading(true);
        console.log('dial');
    
         try {
  
          fetch('https://mobile.maadsene.com/api/getNewPasswordWithOtp', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              code:code
            }),
          }).then((response) => response.json())
          .then((json) => {

            //alert(JSON.stringify(json)); 
  
              if(json.status == 1){
                 
  
                  //let data = {email: email, password: password};
                  //return console.log(data);
                  
                  //alert("connexion");
                  //dispatch(signIn(data));
                  //alert(JSON.stringify(json)); 
                  navigation.navigate('NewPassword',{
                    telephone:'',
                    email:email
                  });
                  setIsLoading(false);

                 
  
                  
              }else{
                  //alert(JSON.stringify(json)); 
                  setIsLoading(false);
                  return alert("Ce code de validation est invalide!");
  
  
              }
  
              
  
  
            setIsLoading(false);
            console.log(json);
  
          });
    
      
        } catch (e) {
          console.log(e);
          setIsLoading(false);
        } 
      };

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
           
            
            <View style={{ alignItems: 'center' }}>
                {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
                <Text style={{ fontSize: 30, fontWeight: '900', color: '#60103b' }}>MAADSENE</Text>

            </View>
            {
            !otp?
            <View>
            <View style={{ padding: 10, marginTop: 50 }}>

                <Text style={{ fontSize: 13, fontWeight: "500", marginTop: 5, letterSpacing: 1.5, padding: 5 }}>
                    Entrer l'adresse mail de recupération de votre mot de passe <Text style={{ color: 'red' }}>{email}</Text>
                </Text>
            </View>
            <View style={styles.containerIc}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="mail-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.inputIc}

                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: '#60103b',
                    marginTop: 18,
                    width: '100%',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 10,
                }}
                disabled={loading ? true : false}
                onPress={() => {
                    sendEmail();
                }}>
                <Text
                    style={
                        (styles.text_connexion,
                            { fontSize: 15, color: 'white', letterSpacing: 1 })
                    }>
                    {loading ? 'Chargement...' : 'Valider'}
                </Text>
            </TouchableOpacity>
            </View>
            :

<View>
<View style={{padding:10,marginTop:50}}>
            
            <Text style={{fontSize:13,fontWeight:"500",marginTop:5,letterSpacing:1.5,padding:5}}>
                Un code de 
                vérification à été envoyé  <Text style={{color:'red'}}>{email}</Text>
            </Text> 
          </View>
          <View style={{padding:15,alignItems:"center",justifyContent:"center"}}>    
  
            



                   
                            <TextInput
                                placeholder="Saisir le code"
                                        value={code}
                                        keyboardType="number-pad"
                                        onChangeText={code => setCode(code)}
                                        style={[styles.input,{marginBottom:5,width:'100%',backgroundColor:'#edeef2',padding:10,borderRadius:15}]}
                                      />
                        


              <TouchableOpacity
                style={{backgroundColor:!loading?"#60103b":"#60103b85",marginTop:18,width:"100%",alignItems:'center',padding:10,borderRadius:10}}
                /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                onPress={()=>{getCode()}}   disabled={loading?true:false} 
                
              >
    
                    <Text style={{fontSize:15,color:'white',letterSpacing:1}}>{loading ? 'Chargement...' : 'Valider'}</Text>
    
              </TouchableOpacity>

          </View>
</View>
    
            }
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        padding: 20,

    },
    header: {
        fontSize: 26,
        marginBottom: 20,
        textAlign: 'center',
        color: '#60103b',
        letterSpacing: 1,
        fontFamily: 'LilitaOne-Regular'
    },
    buttonContainer: {
        backgroundColor: '#3B5998',
        paddingVertical: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    iconContainer: {
        marginRight: 10,
        paddingLeft: 10
    },
    buttonTextContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#6666664f'
    },
    containerIc: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 10,
        borderColor: '#000',
        margin: 10,
        backgroundColor: '#edeef2',
    },
    iconContainer1: {
        padding: 10,
        marginRight: 5
    },
    inputIc: {
        flex: 1,
        padding: 10,
        paddingLeft: 0
    },
    buttonTextContainer: {
        flex: 1,
        alignItems: 'center'
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold'
    },
    hrContainer: {
        flexDirection: 'row',
        marginVertical: 20
    },
    hrLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#CCC'
    },
    hrText: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginTop: -5
    },
    connectButtonContainer: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        marginBottom: 50
    },
    connectButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default ForgetPasswordWithEmail