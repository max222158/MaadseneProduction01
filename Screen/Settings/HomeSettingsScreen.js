
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainSettingsScreen from './MainSettingsScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import ResetUserDataScreen from './ResetUserDataScreen';
import { SafeAreaView, Button, Text, TouchableOpacity, View, ScrollView, StatusBar, FlatList, Pressable, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import DeleteAccountScreen from './DeleteAccountScreen';

const Stack = createNativeStackNavigator();

const HomeSettings = () => {



    return (


        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar backgroundColor="white" barStyle='dark-content' />

            <Stack.Navigator>
                <Stack.Screen
                    name="MainSettings"
                    component={MainSettingsScreen}
                    options={{
                        title: "Réglages",

                        headerStyle: {
                            backgroundColor: '#ffff',
                        },
                
                    }}

                />
                <Stack.Screen
                    name="ResetDataUser"
                    component={ResetUserDataScreen}

                />
                <Stack.Screen name="ResetPassword" options={{
                    title: "",

                    headerStyle: {
                        backgroundColor: '#ffff',
                    },
                    headerShown: false
                }} component={ResetPasswordScreen}



                />

                <Stack.Screen name="DeleteAccount" options={{
                    title: "Suppression du compte",

                    headerStyle: {
                        backgroundColor: '#ffff',
                    },
                }} component={DeleteAccountScreen}



                />

            </Stack.Navigator>
        </SafeAreaView>

    );


};


export default HomeSettings;