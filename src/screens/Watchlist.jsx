import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Watchlist({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> katselu Screen</Text>
      <Text style={styles.title}> - Näkyy kaikki katselulistalle lisätyt</Text>
      <Text style={styles.title}> - Voi poistaa katselulistalta</Text>
      <Text style={styles.title}> - Arvioida</Text>
      <Text style={styles.title}> - lajitella vanhimmat lisätyt</Text>
      <Text style={styles.title}> - lajitella uusimmat lisätyt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingBottom:30,
    backgroundColor:'red',
  },
  item: {
      height:270,
      width:160,
      margin:10,
      borderRadius:5,
      overflow:'hidden',
  },
  image: {
      borderRadius: 5,
    },
  title: {
      textAlign:'center',
      fontWeight:'bold',
      fontSize:17,
  },
  overview: {
      color:'white',
      fontSize:17,
      fontWeight:'bold',
      overflow:'hidden',
    },
    favorite: {
      alignItems:'flex-end',
      padding:5,
    },
});