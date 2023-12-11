import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ButtonWithArrow({navigation}) {
const [arrowAnimation] = useState(new Animated.Value(0));

const animateArrow = () => {
Animated.timing(arrowAnimation, {
toValue: 1,
duration: 2000,
useNativeDriver: true
}).start(() => {
arrowAnimation.setValue(0);
animateArrow();
});
};
useEffect(()=>{

    animateArrow();

},[])
const moveArrow = arrowAnimation.interpolate({
inputRange: [0, 0.5, 1],
outputRange: [0, -20, 0]
});

return (
    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Continue</Text>
    <Animated.View style={[styles.iconContainer, { transform: [{ translateX: moveArrow }] }]}>
    <Ionicons name="ios-arrow-forward" size={20} color="#60103b" />
    </Animated.View>
    </TouchableOpacity>
    );
    };
    
    const styles = {
    buttonContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#60103b',
    margin:10,
    bottom:0,
    position:'absolute',
    backgroundColor:'#60103b'
    },
    buttonText: {
    color: '#ffff',
    fontSize: 18,
    flex: 1,
    textAlign: 'center'
    },
    iconContainer: {
    backgroundColor: '#ffff',
    borderRadius: 50,
    padding: 5
    }
    };