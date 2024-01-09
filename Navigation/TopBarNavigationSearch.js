import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BooksComponent from '../Screen/Search/SearchComponent/BooksComponent';
import BooksAudioComponent from '../Screen/Search/SearchComponent/BooksAudioComponent';
import PodcastComponent from '../Screen/Search/SearchComponent/PodcastComponent';
import { useEffect, useState } from 'react';
import { SearchService } from '../services/api/searchService';

const Tab = createMaterialTopTabNavigator();

export function TopBarNavigationSearch() {


  return (
    <Tab.Navigator
    
      screenOptions={{
        tabBarActiveTintColor: '#d7006d',
        tabBarInactiveTintColor:'#636363',
        tabBarIndicatorStyle: {
          backgroundColor: '#d7006d',
          height: 5,

          

        },

         
            tabBarLabelStyle: { fontSize: 13,  fontWeight: "500", letterSpacing: 1 },
      }}
    >
      <Tab.Screen name="Livres" component={BooksComponent} />
      <Tab.Screen name="Livres Audio" component={BooksAudioComponent} />
      <Tab.Screen name="Podcasts"
        component={PodcastComponent}/>
    </Tab.Navigator>
  );
}