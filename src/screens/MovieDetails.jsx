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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Takaisin</Text>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.moviecontainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <ImageBackground
            source={{
              uri: `${POSTER}${movie.poster_path || movie.backdrop_path}`,
            }}
            style={styles.item}
            imageStyle={styles.image}
          />
        </View>
          <Text style={styles.desc}>{movie.overview}</Text>
          <Text style={styles.desc}>Genres: {genres}</Text>
          <Text style={styles.desc}>
            country: {movie.origin_country} - show on map {"-->"}
          </Text>
          <Text style={styles.desc}>
            avg vote: {movie.vote_average.toFixed(1)} - vote count: {movie.vote_count}
          </Text>
          <Text style={styles.desc}>Release date: {movie.release_date}</Text>
          <TouchableOpacity style={styles.theatherbutton}>
          <Text style={styles.buttonText}>Lähimmät teatterit !</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333",
  },
  moviecontainer: {
    width: "95%",
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
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  theatherbutton: {
    borderRadius: 10,
    backgroundColor: "#ccc",
    padding:10,
    opacity: 0.7,
    width:300,
    alignSelf:'center',
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
    height: 50,
    justifyContent: "center",

  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
