import * as React from 'react';
import { Text, TouchableOpacity, View,Image } from 'react-native';
import { SafeAreaView, StyleSheet} from 'react-native';
import { text } from 'stream/consumers';


export default function SettingsScreen() {

      return (
/*         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Compte!</Text>

          <TouchableOpacity style={{ backgroundColor: "#bgf", marginTop: 28 }}
            onPress={() => { signOut() }}
          >
            <Text style={{ fontSize: 19 }}>Logout</Text>

          </TouchableOpacity>
          
        </View> */

          <SafeAreaView style={styles.container}>

          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Image 
                source={require('../src/assets/user.png')}
                style={styles.userImage}
              />
              <View style={{marginLeft: 20}}>
                <Text style={[styles.Text, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>Maxime Marone</Text>
                <Text style={styles.Text}>maxime1marone@gmail.com</Text>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
           
              <Text style={{color:"#777777", marginLeft: 20}}>Sénégal</Text>
            </View>
            <View style={styles.row}>
              
              <Text style={{color:"#777777", marginLeft: 20}}>+221 77 107 74 68</Text>
            </View>
            <View style={styles.row}>
              

            </View>
          </View>

          <View style={styles.infoBoxWrapper,{backgroundColor:"black"}}>
              <View style={styles.infoBox}>
                <Text style={styles.text_abon}>Abonnement : En cours</Text>
              </View>
          </View>

          <View style={styles.menuWrapper}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                
                <Text style={styles.menuItemText}>Mes favorites</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
                
                <Text style={styles.menuItemText}>Abonnement</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.menuItem}>
              
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menuItem}>
              
                <Text style={styles.menuItemText}>Déconnexion</Text>
              </View>
            </TouchableOpacity>
          </View>
          </SafeAreaView>

      
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
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
    height: 100,
    backgroundColor:"#6010b"
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#6010b"
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  userImage: {
    width:80,
    height:80

  },
  text_abon :{

    fontSize:24,
    color:'white'

  }
});