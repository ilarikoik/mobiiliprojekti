import React, { useState } from "react";
import { View, Text, Button, FlatList ,StyleSheet,ImageBackground,TouchableOpacity, ActivityIndicator} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { API_KEY } from "../../config";


export default function Card({navigation,movies}) {
const [movieId,setMovieId] = useState();
const POSTER = "https://image.tmdb.org/t/p/w500"
// const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`

const handleFavorite = () => {
    console.log('lisätty')
    // jos on jo DB nii alertti joku viesti

}
// eli lähetä api LeffaSivu komponentille id:llä? ja se näyttää siellä vaa sen tiedot sit ?
    const details = (itemId) => {
        setMovieId(itemId);
        // kun vastaanotetaan propsi pitää käyttää tätä annettua nimeä
        console.log(itemId)
        navigation.navigate('Details',{movieId: itemId})
    }
  return (
  <View style={styles.container}>
    <FlatList
    data={movies}
    keyExtractor={item => item.id.toString() }
    renderItem={({item}) => (
        <TouchableOpacity onLongPress={() => details(item.id)}>
        <ImageBackground
            source={{ uri: `${POSTER}${item.poster_path || item.backdrop_path}` }} 
            style={styles.item}
            imageStyle={styles.image}
            >
            <TouchableOpacity
          style={styles.favorite}
          onPress={handleFavorite}
          >
          <AntDesign name="star" size={26} color="gold" />
        </TouchableOpacity> 
        </ImageBackground>
    </TouchableOpacity>
    )}
    numColumns={2} // monta itemiä per rivi
    showsVerticalScrollIndicator={false} // näyttääkö scrollbaarin
    /> 
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#333",
      marginTop:10,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      paddingBottom:30,
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
        color:'white',
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
  