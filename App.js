import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Homescreen'; 
import Watchlist from './screens/Watchlist';

const Drawer = createDrawerNavigator();

// teksti '#ccc', 
// tausta '#333'

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Leffat"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#333', 
            width: 240, 
          },
          drawerLabelStyle: {
            color: '#ccc', 
          },
          headerStyle: {
            backgroundColor: '#444', 
          },
          headerTintColor: '#ccc', 
        }}
      >
        <Drawer.Screen name="Leffat" component={HomeScreen} />
        <Drawer.Screen name="Katselulista" component={Watchlist} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
