import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import styless from '../style/styleComponentLogin';
import LoaderComponent from '../Components/LoaderComponent';
/* import { LoginManager, AccessToken } from 'react-native-fbsdk-next'; */

/* import LoaderComponent from '../Components/LoaderComponent'; */




const SignUpScreen = ({ navigation }) => {



  const [isLoading, setIsLoading] = useState(false);


  const register = (email, nom, prenom) => {
    console.log('dial');

    setIsLoading(true);
    try {
      fetch('https://mobile.maadsene.com/api/register-google', {
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

          if (json.status === "noEmail") {
            navigation.navigate("Verification", {
              nom: nom,
              prenom: prenom,
              email: email,
            });
            setIsLoading(false);
          } else {
            setIsEmail(true);
            setIsLoading(false);
          }

          /*         if(json.hasOwnProperty('errors')){
                    if(json.errors.email[0] === "The email has already been taken."){
          
                      alert("Cet adresse email correspond déjà à un compte!");
                    }
                    setIsLoading(false);
                  }else{
          
                    setIsLoading(false);
                    
                    navigation.navigate('Verification',{
                    
          /*             nom:nom,
                      prenom:prenom,
                      email:email,
                      password:password,
                      cpassword:cpassword 
              
              
              
                    }); 
          
                  } */



        });


    } catch (e) {
      console.log("e============", e);

      setIsLoading(false);
    }
  };
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [prenom, setPrenom] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [cpassword, setCpassword] = React.useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };
  const handleSubmit = () => {
    if (!validateEmail(email)) {
      alert("Adresse email invalide!");
      setIsLoading(false);
    } else {
      registerWithEmail();
    }
  };

  const registerWithEmail = () => {
    console.log('dial');

    try {
      fetch('https://mobile.maadsene.com/api/register', {
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
          rpassword: cpassword,
          phone: telephone
        }),
      }).then((response) => response.json())
        .then((json) => {
          if (json.hasOwnProperty('errors')) {
            if (json.errors.email[0] === "The email has already been taken.") {

              alert("Cet adresse email correspond déjà à un compte!");
            }
            setIsLoading(false);
          } else {

            

            try {
              fetch('https://mobile.maadsene.com/api/saveOtp', {
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
                  phone: telephone
                }),
              }).then((response) => response.json())
                .then((data) => {

                  //alert(JSON.stringify(data));

                  navigation.navigate('VerificationEmail', {

                    nom: nom,
                    prenom: prenom,
                    email: email,
                    telephone: telephone,
                    password: password,
                    cpassword: cpassword



                  });

                  setIsLoading(false);
                  console.log(json);



                });


            } catch (e) {
              console.log(e);
              setIsLoading(false);
            }




          }



        });


    } catch (e) {
      console.log("e============", e);

      setIsLoading(false);
    }
  };

  const onSub = () => {

    if (
      email != '' &&
      nom != '' &&
      password != '' &&
      telephone != ''
    ) {
      setIsLoading(true);
      handleSubmit();




      /*           navigation.navigate('Verification',{
              
                nom:nom,
                prenom:prenom,
                email:email,
                password:password,
                cpassword:cpassword
        
        
        
              });  */

    } else {
      alert('Veuillez remplir tous les champs!');
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();// Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  ////
  /////  FACEBOOK REGISTRATION ////////////////////
  /////

  const handleLogin = () => {
/*     setIsLoading(true);


    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          throw new Error('Login was cancelled');
        }
  
        AccessToken.getCurrentAccessToken().then(data => {
          console.log(data.accessToken.toString());
          getUserProfile(data.accessToken.toString());
        });
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      }); */
  };

  const getUserProfile = (accessToken) => {
/*     console.log("data------------------------------------");
    setTimeout(() => {
      setIsLoading(false);
      //alert("Logout out");
      LoginManager.logOut();
      
      
    }, 70000);
    return fetch(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    )
      .then(response => response.json())
      .then(data => {
        console.log("data------------------------------------register", data);
        //register(data.email, data.name, " ");
        register(data.email, data.name, "");
      })
      .catch(error => {
        setIsLoading(false);
        throw error;
      }); */
  };
  



  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '767309040736-36bp4mqtcpiofmov2qlhr6ma5fokh45f.apps.googleusercontent.com',
      offlineAccess: true,
    });
    //signOut();


  }, []);

  const googleSignin = async () => {
    setIsEmail(false);
    try {

      signOut();
      const { idToken } = await GoogleSignin.signIn();

      setTimeout(() => {
        setIsLoading(false);
        signOut();
        
      }, 70000);
      // Create a Google credential with the token



      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      console.log(auth().signInWithCredential(googleCredential))
      const user = auth().signInWithCredential(googleCredential);
      user.then(res => {
        console.log("res+++++++++++", res);
        if (res.additionalUserInfo.profile.email_verified == true) {
          
          register(res.additionalUserInfo.profile.email, res.additionalUserInfo.profile.name, res.additionalUserInfo.profile.name);
        } else {
          setIsLoading(false);
        }
      })

    } catch (e) {
      //alert("1235852");
      setIsLoading(false);
    }


  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={[styles.header, { marginTop: -10 }]}>Inscription</Text>
      {
        isEmail ?

          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              marginTop: 5,
              letterSpacing: 1.5,
              color: 'red'
            }}>
            <Ionicons name="information-circle" size={15} color='red' />Cet adresse email correspond déjà à un compte!
          </Text> : null}
      <TouchableOpacity style={styles.buttonContainer1}
        onPress={() => {
          setIsLoading(true);
          googleSignin();
        }} >
        <View style={styles.iconContainer}>
          <Ionicons name='logo-google' size={22} color='#D14836' />
        </View>
        <View style={styles.buttonTextContainer}

        >
          <Text style={styles.buttonText}>Inscription avec Gmail</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.hrContainer}>
        <View style={styles.hrLine} />
        <Text style={styles.hrText}>OU</Text>
        <View style={styles.hrLine} />
      </View>
      <View
        style={{
          padding: 15,
          paddingTop:0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>

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

        <View style={styles.containerIc}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="ios-person-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            placeholder="Prénom Nom"
            value={nom}
            onChangeText={nom => setNom(nom)}
            style={styles.inputIc}

          />
        </View>

        <View style={styles.containerIc}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="md-call-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            placeholder="Téléphone"
            value={telephone}
            onChangeText={telephone => setTelephone(telephone)}
            style={styles.inputIc}

          />
        </View>
        <View style={styles.containerIc}>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="ios-lock-closed-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={password => setPassword(password)}
            style={styles.inputIc}
            secureTextEntry={secureText}

          />
          <TouchableOpacity style={styles.iconContainer} onPress={() => setSecureText(!secureText)}>
            <Ionicons name={secureText ? "ios-eye-off" : "eye-outline"} size={24} color="#000" />
          </TouchableOpacity>
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
          disabled={isLoading ? true : false}
          onPress={() => {
            onSub();
          }}>
          <Text
            style={
              (styles.text_connexion,
                { fontSize: 15, color: 'white', letterSpacing: 1 })
            }>
            {isLoading ? 'Chargement...' : 'Valider'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#e4e4e4ad',
            marginTop: 18,
            width: '100%',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            marginBottom: 50
          }}

          onPress={() => navigation.navigate('Login')}>
          <Text
            style={
              (styles.text_connexion,
                { fontSize: 15, color: '#60103b', letterSpacing: 1 })
            }>
            J'ai un compte
          </Text>
        </TouchableOpacity>
      </View>
      {
        isLoading?<LoaderComponent loading={isLoading} /> : null
      }
    </ScrollView>
  );
};

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
    fontFamily: 'LilitaOne-Regular',

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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6666664f'
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6666664f'
  },
  iconContainer: {
    marginRight: 10
  },
  buttonTextContainer: {
    flex: 1,
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize:13
  },
  hrContainer: {
    flexDirection: 'row',
    marginVertical: 15
  },
  hrLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCC',

  },
  hrText: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    marginTop:-5
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
  },

  containerIc: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#000',
    margin: 10,
    marginTop:0,
    backgroundColor: '#edeef2',
  },
  iconContainer: {
    padding: 10
  },
  inputIc: {
    flex: 1,
    height: 40,
    padding: 10,
    paddingLeft: 0
  }
});

export default SignUpScreen;