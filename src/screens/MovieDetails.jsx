import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";

export default function MovieDetails({ navigation, route }) {
  const { movieUrl } = route.params;
  console.log(movieUrl);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const POSTER = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        setLoading(true);
        const res = await fetch(movieUrl);
        const response = await res.json();
        console.log(movie);
        setMovie(response);
      } catch (error) {
        console.log("------" + error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieById();
    console.log("toimiii");
  }, [movieUrl]);

  if (!movie) {
    return <Text>No movie details available.</Text>;
  }
  const genres = movie.genres
    ? movie.genres.map((item) => item.name).join(", ")
    : null;
  return (
    <View style={styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
          <Text style={styles.desc}>{movie.overview}</Text>
          <Text style={styles.desc}>Genres: {genres}</Text>
          <Text style={styles.desc}>country: {movie.origin_country} - show on map {'-->'}</Text>
          <Text style={styles.desc}>
            avg vote: {movie.vote_average} - vote count: {movie.vote_count}
          </Text>
          <Text style={styles.desc}>Release date: {movie.release_date}</Text>
        </View>
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
    height: "100%",
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
  },
  item: {
    height: 350,
    width: 300,
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain", // Ensures the image fits within the bounds
    alignSelf: "center",
    borderRadius: 5,
  },
});
