import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import fetchMovieById from "../apiCalls/fetchMovieById";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function MovieDetails({ navigation, route }) {
  const { movieId } = route.params; // sama nimi ku lähetettäessä
  const [movie, setMovie] = useState();
  const POSTER = "https://image.tmdb.org/t/p/w500";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getById = async () => {
      setLoading(true);
      const movie = await fetchMovieById(movieId);
      setMovie(movie);
      setLoading(false);
    };
    getById();
  }, [movieId]);

  if (!movie) {
    return <Text>No movie details available.</Text>;
  }
  const genres = movie.genres
    ? movie.genres.map((item) => item.name).join(", ")
    : null;

  const toMaps = () => {
    navigation.navigate("Maps", { fromDetails: "jep" });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backbuttonText}>Takaisin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoritenadwatchlistbutton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="plus"
            size={24}
            color="white"
            style={{ paddingRight: 10 }}
          />
          <Text style={styles.buttonwatclistText}>Lisää katselulistalle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.favoritenadwatchlistbutton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="star"
            size={24}
            color="gold"
            style={{ paddingRight: 10 }}
          />
          <Text style={styles.buttonwatclistText}>Lisää suosikkeihin</Text>
        </TouchableOpacity>
        <View style={styles.moviecontainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.postercon}>
            <ImageBackground
              source={{
                uri: `${POSTER}${movie.poster_path || movie.backdrop_path}`,
              }}
              style={styles.item}
              imageStyle={styles.image}
            />
          </View>
          <View style={styles.movieinfocontainer}>
            <Text style={styles.desc}>{movie.overview}</Text>
            <Text style={styles.infos}>Genres: {genres}</Text>
            <Text style={styles.infos}>
              Country: {movie.origin_country} - Show on map {"-->"}
            </Text>
            <Text style={styles.infos}>
              Avg vote: {movie.vote_average.toFixed(1)} & Vote count:{" "}
              {movie.vote_count}
            </Text>
            <Text style={styles.infos}>Release date: {movie.release_date}</Text>
          </View>
          <TouchableOpacity onPress={toMaps} style={styles.theatherbutton}>
            <Text style={styles.buttonText}>Lähimmät teatterit !</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#333",
  },
  moviecontainer: {
    //width: "100%",
    width: 400,
    borderRadius: 10,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
    marginBottom: 10,
  },
  desc: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 10,
    marginBottom: 15,
    fontWeight: "bold",
  },
  infos: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 10,
    marginBottom: 15,
  },
  theatherbutton: {
    borderRadius: 10,
    backgroundColor: "black",
    padding: 10,
    width: 300,
    alignSelf: "center",
    shadowColor: "gold",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  postercon: {
    height: 420,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  item: {
    height: 400,
    width: 300,
    margin: 10,
    overflow: "hidden",
  },
  image: {
    alignSelf: "center",
    borderRadius: 20,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#FEBE10",
    height: 40,
    justifyContent: "center",
  },
  favoritenadwatchlistbutton: {
    flexDirection: "row",
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "rgba(76, 187, 23, 0.6)",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  backbuttonText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "gold",
  },
  buttonwatclistText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  movieinfocontainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    padding: 5,
  },
});
