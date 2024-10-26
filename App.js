import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Homescreen'; 
import Watchlist from './src/screens/Watchlist';
import MovieDetails from './src/screens/MovieDetails';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Leffa" component={HomeScreen} />
      <Stack.Screen name="Details" component={MovieDetails} />
    </Stack.Navigator>
  );
};

// teksti '#ccc', 
// tausta '#333'

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Leffa"
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
        {/* burgeri menu / "päämenu" , stackilla kuljetaan ohjelman sisällä eri sivuille */}
        {/* stacknavigaton ton komponentiks koska Leffa/Kotisivu sisällä kuljetaan näille stackin antamille sivuille */}
        {/* jos haluun Teatterissa esim mennä toiselle sivulle niin sille voi tehdä oman stäkin tai lisätä alkuperäseen stäkkiin*/}
        {/* omat stäkit jos on monimutkane navigointi muute samaa vaa  */}
        <Drawer.Screen name="Leffa" component={StackNavigator} />
        <Drawer.Screen name="Katselulista" component={Watchlist} />
        {/* <Drawer.Screen name="Details" component={MovieDetails} /> */}
        <Drawer.Screen name="Teatterit" component={Watchlist} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
