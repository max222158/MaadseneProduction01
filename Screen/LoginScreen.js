import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import styles1 from '../style/styleComponentLogin';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { signIn } from '../features/user/authSlice';
import { userDetails, userSelector } from '../features/user/authSlice';
import { Dimensions } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import NetInfo from "@react-native-community/netinfo";
import LoaderComponent from '../Components/LoaderComponent';
/* import { LoginManager, AccessToken } from 'react-native-fbsdk-next'; */


const LoginScreen = ({ navigation }) => {



  const [isLoading, setIsLoading] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { userDetails, loading } = useSelector(userSelector);
  const error = useSelector((state) => state.userAuth.error);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [netInfo, setNetInfo] = useState(true);
  
  const [value, setValue] = useState('');
  const [secureText, setSecureText] = useState(true);

  const connexion = () => {
    if(email == "" || password == ""){
      alert("Veuillez remplir tous les champs!");

    }else{
      let data = { email: email, password: password };
      dispatch(signIn(data));
    }
    
    //return console.log(data);

    
    // const user = useSelector((state) => state.userDetails);
  };
  React.useEffect(() => {
    console.log(userDetails);
    console.log('error...........' + error);
    let unmounted = false;

    //console.log("Running effect to fetch data");

    setTimeout(() => {
      //console.log("Data loaded for page");

      if (!unmounted) {
        //setData("Some data you loaded from a server somewhere...");
      }
    }, 3000);

    return () => {
      unmounted = true;
    };
  });

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

  const getUserProfile = async (accessToken) => {
/*     console.log("data------------------------------------");

    setTimeout(() => {
      setIsLoading(false);
      //alert("Logout out");
      LoginManager.logOut();
      
    }, 70000);
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
      );
      const data = await response.json();
      console.log("data------------------------------------",data);
      register(data.email,data.name," ");
    } catch (error) {
      
      setIsLoading(false);
      throw error;
    } */
  };
  
  
  

  React.useEffect(() => {



    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {

      setNetInfo(state.isConnected);
      console.log(state.isConnected);

    });



    return () => removeNetInfoSubscription();
  }, []);
  const register = (email, nom, prenom) => {
    console.log('dial');
    setIsEmail(false);
    setIsLoading(true);


    try {
      fetch('https://maadsenemobi.com/api/login-google', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: nom,
          prenom: prenom,
          
        }),
      }).then((response) => response.json())
        .then((json) => {
          console.log(json);

          if (json.status === "noEmail") {
            let data = {email: email, password:"email"};
            //return console.log(data);
            
            //alert("connexion"+JSON.stringify());
            dispatch(signIn(data));
            //setIsLoading(false);
          } else {
            //alert("Cet adresse email correspond déjà à un compte!");

            let data = {email: email, password:json.password};
            //return console.log(data);
            
            //alert("connexion");
            dispatch(signIn(data));
            //setIsLoading(false);
            setIsEmail(true);
          }

        });


    } catch (e) {
      console.log("e============", e);

      setIsLoading(false);
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
  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '767309040736-36bp4mqtcpiofmov2qlhr6ma5fokh45f.apps.googleusercontent.com',
      offlineAccess: true,
    });
    //signOut();


  }, []);

  const googleSignin = async () => {

    try {


      setTimeout(() => {
         setIsLoading(false);
         GoogleSignin.signOut();
        
      }, 80000);
      const { idToken } = await GoogleSignin.signIn();
      try{
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      console.log(auth().signInWithCredential(googleCredential))
      const user = auth().signInWithCredential(googleCredential);
      user.then(res => {
        console.log(res);
        if (res.additionalUserInfo.profile.email_verified == true) {

          register(res.additionalUserInfo.profile.email, res.user.displayName, res.additionalUserInfo.profile.name);
          
        }
      })
        .catch(error => { console.log(error); setIsLoading(false); });

    } catch (e) {
      setIsLoading(false);
      console.log(e)
    }
  }catch (e) {
    setIsLoading(false);
  }
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.header}>Se Connecter</Text>


      <View
        style={{
          padding: 15,

        }}>

        <View style={styles.containerIc}>
          <TouchableOpacity style={styles.iconContainer1}>
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
          <TouchableOpacity style={styles.iconContainer1}>
            <Ionicons name="ios-lock-closed-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={secureText}
            style={styles.inputIc}

          />
          <TouchableOpacity style={styles.iconContainer} onPress={() => setSecureText(!secureText)}>
            <Ionicons name={secureText ? "ios-eye-off" : "eye-outline"} size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {error ?
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              marginTop: 5,
              letterSpacing: 1.5,
              color: 'red'
            }}>
            <Ionicons name="information-circle" size={20} color='red' /> Idenfifiants incorrects!
          </Text> : null}
{/*         {
          isEmail ?

            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginTop: 5,
                letterSpacing: 1.5,
                color: 'red'
              }}>
              Cet adresse email correspond déjà à un compte!
            </Text> : null} */}

        <TouchableOpacity
          style={{
            backgroundColor: '#60103b',
            marginTop: 18,
            width: '100%',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
          }}
          disabled={loading ? true : false}
          onPress={() => {
            connexion();
          }}>
          <View style={
            (styles.text_connexion,
              { fontSize: 18, color: 'white', letterSpacing: 1, flex: 2 / 3, justifyContent: 'center', alignContent: 'flex-end', alignItems: 'flex-end' })
          }>
            <Text
              style={
                (styles.text_connexion,
                  { fontSize: 15, color: 'white', letterSpacing: 1 })
              }>
              {loading ? 'Chargement...' : 'Se connecter'}
            </Text>
          </View>
          {loading ?
            <View style={
              (styles.text_connexion,
                { fontSize: 18, color: 'white', letterSpacing: 1, flex: 1 / 3, justifyContent: 'center', alignContent: 'flex-end', alignItems: 'flex-end' })
            }>
              <ActivityIndicator size={25} color="white" />
            </View>
            : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#e4e4e4ad',
            marginTop: 18,
            width: '100%',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('Register')}>
          <Text
            style={
              (styles.text_connexion,
                { fontSize: 15, color: '#60103b', letterSpacing: 1 })
            }>
            S'inscrire
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingRight: 20,
          marginTop: 10,
        }}>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('PasswordForgetWithEmail') }}>
            <Text style={{ fontSize: 14, fontWeight: '500', letterSpacing: 1 }}>
              Mot de passe oublié
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.hrContainer}>
        <View style={styles.hrLine} />
        <Text style={styles.hrText}>OU</Text>
        <View style={styles.hrLine} />
      </View>
      <TouchableOpacity style={styles.buttonContainer}
        onPress={() => {
          setIsLoading(true);
          googleSignin();
        }} >
        <View style={styles.iconContainer}>
          <Ionicons name='logo-google' size={22} color='#D14836' />
        </View>
        <View style={styles.buttonTextContainer}

        >
          <Text style={styles.buttonText}>Se connecter avec Gmail</Text>
        </View>
      </TouchableOpacity>

{/*       <TouchableOpacity style={[styles.buttonContainer,{marginBottom:50}]} onPress={handleLogin}>
        <View style={styles.iconContainer}>
          <Ionicons name='logo-facebook' size={22} color='#3B5998' />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Se connecter avec Facebook</Text>
        </View>
      </TouchableOpacity> */}

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
    marginRight: 10
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
    paddingLeft: 0,
    color:'#000'
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
  }
});

export default LoginScreen;