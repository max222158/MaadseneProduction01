import { View, Text,StatusBar,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';


const HeaderComponent = ({mode:mode,onPressBack}) => {
    const audioType = useSelector((state) => state.audio.songType);
  return (
    <View style={{
        flexDirection: 'row', alignItems: 'center',
        borderBottomWidth: 0.1,  height: 50,
        borderBottomColor: '#eee', justifyContent: 'space-between',
        borderTopLeftRadius: 5, borderTopRightRadius: 5, marginTop: StatusBar.currentHeight + 10
    }}>

        <TouchableOpacity style={{ marginTop: 5, marginRight: 10, marginLeft: 10 }} onPress={onPressBack}>
            <Icon name="chevron-down-outline" color={mode == "clair" ? "black" : 'white'} size={20} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <Text style={{ fontSize: 20, fontFamily: 'LilitaOne-Regular', color:  'white', marginTop: 0,textAlign:'center' }} numberOfLines={2}>{audioType}</Text>



        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <View style={{marginRight:10}}> 


            </View>


        </View>






    </View>
  )
}

export default HeaderComponent