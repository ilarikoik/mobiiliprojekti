import React from 'react';
import { View, Text, Button,StyleSheet } from 'react-native';

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Täällä näkyy siis tykäty leffat </Text>
      <Text style={styles.title}>- alkunäkymä on joko just lisätyt </Text>
      <Text style={styles.title}>- voi selata arviointien perusteella </Text>
      <Text style={styles.title}>- voi poistaa tykätyistä </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
      paddingBottom:30,
      backgroundColor:'green',
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
  