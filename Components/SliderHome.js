import * as React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import ButtonWithArrow from './ButtonContinue';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#76355647', '#DDBEFE', '#A5BBFF', '#763556a6'];
const DATA = [

  {
    "key": "3571747",
    "title": "Livres numériques",
    "description": "Lisez partout, tout le temps, avec MAADSENE en ligne.",
    "image": require('../assets/login/background.png')
  },
  {
    "key": "3571680",
    "title": "Podcasts",
    "description": "Découvrez l'univers sonore des histoires les plus captivantes avec nos podcasts",
    "image": require('../assets/login/imgpodcast.jpg')
  },
  {
    "key": "3571603",
    "title": "Vidéos",
    "description": "Regardez, écoutez, apprenez : découvrez le monde en ligne.",
    "image": require('../assets/login/imgvideo.jpg')
  }
];
const Indicator = ({scrollX}) =>{

/*     const scale = scrollX.interpolate({
        inputRange: DATA.map((_,i)=>i*width),
        outputRange:DATA.map((bg)=>bg)
    });
 */
    return <View style={{position:'absolute',bottom:100,flexDirection:'row'}}>
        {
            DATA.map((_,i)=>{
                const inputRange = [(i-1)*width,i*width,(i+1)*width];
                const scale = scrollX.interpolate({
                    inputRange  ,
                    outputRange: [0.8,1.4,0.8] ,
                    extrapolate:'clamp'
                });

                const opacity = scrollX.interpolate({
                    inputRange  ,
                    outputRange: [0.6,0.9,0.6] ,
                    extrapolate:'clamp'
                });

                return <Animated.View

                key={`indicator-${i}`}
                style={{
                    height:10,
                    width:10,borderRadius:5,
                    backgroundColor:'#333',
                    margin:10,
                    opacity,
                    transform:[
                        {
                            scale,
                        }
                    ]
                
                }}
                />
            }
            )
        }

    </View>
}

const Backdrop = ({scrollX}) =>{

    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_,i)=>i*width),
        outputRange:bgs.map((bg)=>bg)
    });
    //const [color,setColor] = useState("");
    return (
        <Animated.View
            style={[StyleSheet.absoluteFillObject,{
                backgroundColor
            }]}
        
        >

            <StatusBar barStyle="dark-content" backgroundColor={JSON.stringify(backgroundColor)} />
        </Animated.View>
    )
}
Square = ({scrollX}) =>{
    const YOLO = Animated.modulo(Animated.divide(
        Animated.modulo(scrollX,width),
        new Animated.Value(width)),1
    );
    const rotate =YOLO.interpolate({
        inputRange:[0, 0.5, 1]
        ,outputRange:['-35deg','0deg','-35deg']
    });
    const translateX =YOLO.interpolate({
        inputRange:[0, 0.5, 1]
        ,outputRange:[0,-height,0]
    })

    return <Animated.View
        style={{
            width:height,
            height:300,
            backgroundColor:'#fff',
            borderRadius:86,
            position:'absolute',
            top:-height* 0.65,
            left:-height*0.3,
            transform:[
                {
                    rotate,
                },
                {
                    translateX
                }
            ]
        
        }}



    />

}
export default function SliderHome({navigation}) {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [color,setColor] = useState("#76355647");
  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <Animated.FlatList 
            data={DATA}
            keyExtractor={(item)=>item.key}
            horizontal
            scrollEventThrottle={32}
            onScroll={Animated.event(
                [{nativeEvent:{contentOffset:{x:scrollX}}}],
                {useNativeDriver:false}
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:100}}
            renderItem={({item}) =>{

                return(

                <View style={{width,alignItems:'center',padding:20}}>
                    
                    <View style={{flex:0.7,padding:10}}>

                    <Image 
                        source={item.image}
                        style={{
                            width:width-50,
                            height:'100%',
                            resizeMode:'contain',
                            borderRadius:20,
                            
                        }}
                    />

                    
                    </View>
                    <View style={{flex:0.3}}>
                        <Text
                            style={{fontSize:24,marginBottom:10,color:'#611039',fontFamily: 'Righteous-Regular'}}
                        >
                            {item.title}

                        </Text>
                        <Text style={{fontWeight:'300', color:'gray',fontSize:20}}>{item.description}</Text>
                        
                    </View>
                </View>
                );
            } 


            }
            pagingEnabled
            
        
        />
        <Indicator scrollX={scrollX} />
        <ButtonWithArrow  navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:  1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});