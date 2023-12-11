import * as React from 'react';
import {
    StatusBar,
    Button,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Alert,
    TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../style/styleComponentLogin';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../features/user/authSlice';
import { userDetails, userSelector } from '../features/user/authSlice';
const Stack = createNativeStackNavigator();

export default function NewPasswordScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [cpassword, setCpassword] = React.useState('');
    const dispatch = useDispatch();

    var { telephone,email} = route.params;


    React.useEffect(() => {
        
     }, []);

    const changePassword = async () => {
        if (password == cpassword) {
            console.log('dial');

            setIsLoading(true);
            try {
                await fetch('https://mobile.maadsene.com/api/P_forgetPasswordWithEmail', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: password,
                        email: email
                    }),
                })
                    .then(response => response.json())
                    .then(json => {
                        //alert(JSON.stringify(email+" "+password));
                        dispatch(signIn({email:email,password:password}))
                        setIsLoading(false);


                    });
            } catch (e) {
                console.log('e============', e);

                setIsLoading(false);
            }
        } else {
            alert('Les mots de passes ne correspondent pas!');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styless.container}
        >
        <StatusBar backgroundColor="white" barStyle="dark-content" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                    {isLoading ? <ActivityIndicator size={40} color="#60103b" /> : null}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: 'white', marginTop: 28 }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            {/* <Image source={require('../assets/logo-app2.png')} style={{width:100,height:50}}  /> */}
                            <Text style={{ fontSize: 30, fontWeight: '900', color: '#60103b' }}>
                                MAADSENE
                            </Text>
                        </View>
                        <View style={{ padding: 15, marginTop: 50 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    marginTop: 5,
                                    letterSpacing: 1.5,
                                }}
                            >
                                Nouveau mot de passe!
                            </Text>
                        </View>
                        <View
                            style={{
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <View style={{ flex: 1, width: '100%' }}>
                                <TextInput
                                    placeholder="Entrer le nouveau mot de passe"
                                    value={password}
                                    onChangeText={password => setPassword(password)}
                                    style={styless.input}
                                />

                                <TextInput
                                    placeholder="Confirmer le mot de passe"
                                    value={cpassword}
                                    onChangeText={cpassword => setCpassword(cpassword)}
                                    style={styless.input}
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
                                /* onPress={()=>{signInWithPhoneNumber(telephone)}} */
                                onPress={() => {changePassword() }}
                                disabled={isLoading ? true : false}
                            >
                                <Text style={{ fontSize: 19, color: 'white', letterSpacing: 1 }}>
                                    {isLoading ? 'Chargement...' : 'Valider'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
const styless = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
    },
    btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
    },
    input: {
        //borderColor: "#000000",
        //borderBottomWidth: 1,
        marginBottom: 20,
        backgroundColor: '#edeef2',
        fontSize: 16,
        padding: 18,
        borderRadius: 15,
    },
});
