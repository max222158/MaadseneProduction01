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
import styles from '../../style/styleComponentLogin';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

export default function ResetPasswordScreen({ navigation, route }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [email, setEmail] = React.useState('');
    const [prenom, setPrenom] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [nom, setNom] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cpassword, setCpassword] = React.useState('');
    const [a_password, set_a_password] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const userDataSelect = useSelector(state => state.userAuth.userDetails);
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
                        email: userDataSelect.user.email
                    }),
                })
                    .then(response => response.json())
                    .then(json => {
                        alert("Votre mot de passe a été modifié avec succès!");
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
            style={styless.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
                
                    <StatusBar backgroundColor="gray" barStyle="dark-content" />
                    {
                        isLoading ?  <ActivityIndicator size={40} color="#60103b"/>:null

                    }
                    <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{marginLeft:20,marginTop:10}}>
                        <Ionicons name="ios-arrow-back-outline" size={30} color="gray" />
                    </TouchableOpacity>   
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ backgroundColor: 'white', marginTop: 0 }}>
                        <View style={{ padding: 15, marginTop: 50 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    marginTop: 5,
                                    letterSpacing: 1.5,
                                }}>
                                Changer mon mot de passe{' '}
                            </Text>
                        </View>
                        <View
                            style={{
                                padding: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <View style={{ flex: 1, width: '100%' }}>

                                <TextInput
                                    placeholder="Nouveau mot de passe"
                                    value={password}
                                    onChangeText={password  => setPassword(password)}
                                    style={styless.input}
                                />
                                <TextInput
                                    placeholder="Confirmer mot de passe"
                                    value={cpassword}
                                    onChangeText={cpassword  => setCpassword(cpassword)}
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
                                disabled={isLoading ? true : false}
                                onPress={() => { changePassword() }}>
                                <Text
                                    style={
                                        (styles.text_connexion,
                                            { fontSize: 18, color: 'white', letterSpacing: 1 })
                                    }>
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
        fontSize: 15,
        padding: 15,
        borderRadius: 15,
    },
    bgloading: {
        backgroundColor: 'white',
        width: 200,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        opacity: 1,
        marginTop: -45,
    },
});
