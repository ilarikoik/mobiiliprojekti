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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { API_KEY } from "../../config";
import { deleteItem } from "../database/db";
import { saveItemFavorites } from "../database/favoritesdb";
import { addFavorite } from "../utils/addfavorite";

export default function VerticalCard({ navigation, movies, deleteMovie }) {
  const [movieId, setMovieId] = useState();
  const [addMovie, setAddMovie] = useState();
  const POSTER = "https://image.tmdb.org/t/p/w500";

  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    setMovieList(movies);
  }, [movies]);

  const handleFavorite = () => {
    console.log("lisätty");
    // jos on jo DB nii alertti joku viesti
    Alert.alert("Lisätty suosikkeihin!");
  };

  // lähetä movieDetailssiin leffan id ja siellä haetaan sillä kaikki tiedot
  const details = (itemId) => {
    setMovieId(itemId);
    console.log(navigation);
    console.log(itemId + "\n\n\n\n\n\n");
    // kun vastaanotetaan propsi pitää käyttää tätä annettua nimeä
    navigation.navigate("Details", { movieId: itemId });
  };

  //const deleteMovie = (id) => {
  //  deleteItem(id);
  //  const update = movieList.filter((item) => item.id !== id); // jotta useEffecti pyörähtää
  //  setMovieList(update);
  //  //Alert.alert("POISTETTU");
  //};

  const addFavo = async (item) => {
    await addFavorite(item);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={movieList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => details(item.movieId)}
            style={styles.itemcontainer}
          >
            <View style={styles.infocon}>
              <ImageBackground
                source={{
                  uri: `${POSTER}${item.img}`,
                }}
                style={styles.item}
                imageStyle={styles.image}
              ></ImageBackground>
              <View style={styles.titlecon}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.grade}>
                  {item.grade !== undefined && (
                    <Text>{item.grade === 0 ? "Ei arvioitu" : item.grade}</Text>
                  )}
                </Text>
              </View>
              <View style={styles.iconcon}>
                <TouchableOpacity
                  style={styles.favoritenadwatchlistbutton}
                  onPress={() => deleteMovie(item.id)}
                >
                  <AntDesign
                    name="delete"
                    size={20}
                    color="red"
                    style={{ paddingRight: 10 }}
                  />
                </TouchableOpacity>
                {/* item.katselulista ? (
                  <TouchableOpacity
                    style={styles.favoritenadwatchlistbutton}
                    onPress={() => addFavo(item)}
                  >
                    <AntDesign
                      name="star"
                      size={16}
                      color="gold"
                      style={{ paddingRight: 10 }}
                    />
                  </TouchableOpacity>
                ) : null */}
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={1}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    marginTop: 5,
    paddingBottom: 30,
    paddingTop: 10,
    alignItems: "center",
  },
  itemcontainer: {
    height: 100,
    width: 350,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },
  infocon: {
    flexDirection: "row",
    height: "100%",
    width: 300,
  },
  item: {
    height: "90%",
    width: 100,
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    borderRadius: 5,
  },
  titlecon: {
    flexDirection: "column",
    height: "100%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  iconcon: {
    height: "100%",
    width: 50,
    padding: 5,
  },
  favoritenadwatchlistbutton: {
    margin: 2,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  grade: {
    color: "white",
    marginTop: 3,
    fontSize: 17,
  },
  overview: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  favorite: {
    alignItems: "flex-end",
    padding: 5,
  },
  icon: {
    width: 30,
    height: 90,
    backgroundColor: "blue",
  },
});

//<TouchableOpacity
//  style={styles.favorite}
//  onPress={handleFavorite}
//>
//  <AntDesign name="star" size={26} color="gold" />
//</TouchableOpacity>
//<TouchableOpacity
//  style={styles.favorite}
//  onPress={() => Alert.alert("lisätty katselulistalle")}
//>
//  <AntDesign
//    name="plus"
//    size={26}
//    color="white"
//    style={{ backgroundColor: "#00000080" }}
//  />
//</TouchableOpacity>
