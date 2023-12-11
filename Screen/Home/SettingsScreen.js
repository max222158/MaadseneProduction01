import * as React from 'react';
import { Text, TouchableOpacity, View,Image } from 'react-native';
import { SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import { text } from 'stream/consumers';
 import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../../features/user/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation(); 

  const userDataSelect = useSelector((state)=> state.userAuth.userDetails);
  //console.log(userDataSelect.user.email);
  const dispatch = useDispatch();
    const disconnect = () => {
     
           
            dispatch(logout());

    }

      return (
          <SafeAreaView style={styles.container}>

          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Image 
                source={require('../../src/assets/user.png')}
                style={styles.userImage}
              />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.Text, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>{userDataSelect.user.name}</Text>
                <Text style={styles.Text}>{userDataSelect.user.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
           
              <Text style={{color:"#777777", marginLeft: 20,fontSize:15}}>Sénégal</Text>
            </View>
            <View style={styles.row}>
              
              <Text style={{color:"#777777", marginLeft: 20,fontSize:15}}>{userDataSelect.user.phone}</Text>
            </View>
            <View style={styles.row}>
              

            </View>
          </View>

          {/* <View style={styles.infoBoxWrapper,{backgroundColor:"#60103a"}}>
              <View style={styles.infoBox}>
                <Text style={styles.text_abon}>Abonnement : En cours {userDataSelect.user.subcription}</Text>
              </View>
          </View> */}

          <ScrollView style={styles.menuWrapper}>
          <TouchableOpacity onPress={() => {navigation.navigate('Favoris')}}>
              <View style={styles.menuItem}>
                <View style={{backgroundColor:"#268502",width:35,height:35,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Ionicons
                      name="ios-bookmark"
                      size={28}
                      color="white"
                    />                
                </View>
                
                <Text style={styles.menuItemText} >Favoris </Text>
                {/* <Ionicons
                      name="chevron-forward"
                      size={28}
                      color="gray"
                      style={{alignContent:'flex-end'}}
                />                 */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Subscription')}}>
              <View style={styles.menuItem}>
                <View style={{backgroundColor:"#1a86be",width:35,height:35,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Ionicons
                      name="card-sharp"
                      size={28}
                      color="white"
                    />                
                </View>
                
                <Text style={styles.menuItemText}>Abonnement </Text>
                {/* <Ionicons
                      name="chevron-forward"
                      size={28}
                      color="gray"
                      style={{alignContent:'flex-end'}}
                />                 */}
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate('HomeSettings')}}>
              <View style={styles.menuItem}>
                <View style={{backgroundColor:"#861abe",width:35,height:35,borderRadius:10,alignItems:'center',justifyContent:'center'}}>
                    <Ionicons
                      name="md-settings-sharp"
                      size={28}
                      color="white"
                    />                
                </View>
                
                <Text style={styles.menuItemText}>Réglages </Text>
                {/* <Ionicons
                      name="chevron-forward"
                      size={28}
                      color="gray"
                      style={{alignContent:'flex-end'}}
                />                 */}
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={disconnect}
              style={{marginBottom:25}}

            >
              <View style={styles.button_deconn}>


              
                <Text style={styles.menuItemTextDeconn}>Déconnexion</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
          </SafeAreaView>

      
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafbfc'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  Text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  Text: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 200,
    
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#6010b",
    height:100
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    borderWidth:1,
    borderColor:'#ddd',
    marginTop:14,
    backgroundColor:'white'
  },
  button_deconn:{

    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft:10,
    marginTop:40,
    backgroundColor:'#ff6c04',
    marginLeft:20,
    marginRight:20,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'

  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 26,
    paddingTop:5,
    letterSpacing:1,
  },
  menuItemTextDeconn:{
    color: '#ffff',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
    paddingTop:5,
    letterSpacing:1,
    
  },
  userImage: {
    width:80,
    height:80

  },
  text_abon :{

    fontSize:30,
    color:'white'

  }
});