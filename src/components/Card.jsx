import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { API_KEY } from "../../config";
import { initialize, saveItem, getAllItems } from "../database/db";
import { saveItemFavorites } from "../database/favoritesdb";
import { TextInput } from "react-native-gesture-handler";
import DialogPopUp from "./Dialog";
import { SaveFilled } from "@ant-design/icons";

export default function Card({ navigation, movies }) {
  const [movieId, setMovieId] = useState();
  const POSTER = "https://image.tmdb.org/t/p/w500";
  const [grade, setGrade] = useState();

  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  //const fetchItems = async () => {
  //  try {
  //    const items = await getAllItems();
  //    console.log("Retrieved itemsasdasdasdsada:", items);
  //    return items;
  //  } catch (error) {
  //    console.error("Error fetching items:", error);
  //    return [];
  //  }
  //};

  const handleWatchlist = async (movie) => {
    await saveItem(
      movie.title,
      movie.poster_path,
      new Date().toISOString(),
      1,
      movie.id
    );
  };
  const handleFavorites = async (movie) => {
    Alert.prompt(
      "Arvioi elokuva 1-10",
      "Pilkku sallittu",
      [
        {
          text: "Myöhemmin",
          onPress: async () =>
            await saveItemFavorites(
              movie.title,
              movie.poster_path,
              new Date().toISOString(),
              1,
              movie.id,
              0
            ),
          style: "Myöhemmin",
        },
        {
          text: "OK",
          onPress: async (text) => {
            let replace = text.replace(",", ".");
            await saveItemFavorites(
              movie.title,
              movie.poster_path,
              new Date().toISOString(),
              1,
              movie.id,
              replace
            );
          },
        },
      ],
      "plain-text",
      null,
      "numeric"
    );
  };

  // eli lähetä api MovieDetails komponentille id:llä? ja se näyttää siellä vaa sen tiedot sit ?
  const details = (itemId) => {
    setMovieId(itemId);
    // kun vastaanotetaan propsi pitää käyttää tätä annettua nimeä
    navigation.navigate("Details", { movieId: itemId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => details(item.id)}
            style={styles.itemcontainer}
          >
            <ImageBackground
              source={{
                uri: `${POSTER}${item.poster_path || item.backdrop_path}`,
              }}
              style={styles.item}
              imageStyle={styles.image}
            >
              <TouchableOpacity
                style={styles.favorite}
                onPress={() => handleFavorites(item)}
              >
                <AntDesign name="star" size={26} color="gold" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favorite}
                onPress={() => handleWatchlist(item)}
              >
                <AntDesign
                  name="plus"
                  size={26}
                  color="gold"
                  style={{ backgroundColor: "#00000080" }}
                />
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
    marginTop: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    paddingTop: 10,
  },
  itemcontainer: {
    height: 280,
    width: 170,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  item: {
    height: 270,
    width: 160,
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  overview: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    overflow: "hidden",
  },
  favorite: {
    alignItems: "flex-end",
    padding: 5,
  },
});
