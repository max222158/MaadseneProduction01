// CategoryButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const getRandomDarkColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 3; i++) { // Utiliser seulement les trois premières composantes de couleur (R, G, B)
    const randomNumber = Math.floor(Math.random() * 8); // Utiliser un nombre plus petit pour des couleurs sombres
    color += letters[randomNumber];
  }

  return color;
};


const CategoryButton = ({ category, navigation }) => (
    
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('Category', {
        id: category.id,
        nom: category.nom,
      })
    }
    style={{
      paddingLeft: 20,
      paddingRight: 15,
      paddingBottom: 13,
      paddingTop: 7,
      borderRadius: 20,
      marginRight: 10,
      marginLeft:10,
      backgroundColor: getRandomDarkColor(),
      color: 'white',
    }}
  >
    <Text style={{ color: 'white', paddingTop: 4, fontFamily: 'Arial', fontSize: 13, letterSpacing: 1 }}>
      {category.nom}
    </Text>
  </TouchableOpacity>
);

export default CategoryButton;
