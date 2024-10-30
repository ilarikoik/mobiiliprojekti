import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/Card";
import Fetch from "../components/Fetch";
import { API_KEY, BASE_URL, SEARCH_URL, APIANDKEY } from "../../config";
import Icon from "react-native-vector-icons/AntDesign";
import FetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import fetchMovieByName from "../apiCalls/FetchMovieByName";
import fetchTopRatedMovies from "../apiCalls/fetchTopRatedMovies";
import fetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import fetchTrendingMovies from "../apiCalls/trendingMovies";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(`${BASE_URL}${API_KEY}`); // voi poistaa?
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [comingUpPressed, setComingUpPressed] = useState(false);
  const [Trendingpressed, setTrendingPressed] = useState(false);
  // const page usestate (1) ja aina fetchmore butonia klikatessa page =+1

  // muista await ja async aina näissä !
  const searchMvoies = async () => {
    if (keyword.length > 0) {
      toggleThemes();
      setLoading(true);
      const movie = await fetchMovieByName(keyword);
      setMovies(movie);
      setTitle(`Elokuvat haulla: ${keyword}`);
      setLoading(false);
      Keyboard.dismiss();
    }
    // haettaessa tyhjää palauttaa UpComingMovies
    if (keyword.length === 0) {
      setLoading(true);
      const trendingMovies = await FetchUpcomingMovies();
      setMovies(trendingMovies);
      setLoading(false);
    }
  };

  // tulevat leffat, jos hakusana poisetetaan niin hakee myös silloin tulevat
  useEffect(() => {
    const getUpcoming = async () => {
      setLoading(true);
      let showMovies;
      showMovies = await FetchUpcomingMovies(1);
      setMovies(showMovies);
      setLoading(false);
    };
    getUpcoming();
    setTitle("Tulossa");
  }, [keyword.length === 0, handlePress]);

  // buttonia painaessa kutsutaan tätä ja sen jälkeen vaihdetaan sen boolean missä sitä on kutsuttu
  // style seuraa sitä mikä on true
  const toggleThemes = () => {
    setComingUpPressed(false);
    setTrendingPressed(false);
    setPressed(false);
  };

  const moviesListTopRated = async () => {
    toggleThemes(); // laitetaan kaikki buttonit false
    setPressed((prevPressed) => !prevPressed); // muutetaan true jotta style näkyy
    console.log(pressed);
    setTitle("Parhaiten arvioidut elokuvat");
    let movies = await fetchTopRatedMovies();
    setMovies(movies);
  };

  const moviesListTrending = async () => {
    toggleThemes();
    setTrendingPressed((prevPressed) => !prevPressed);
    setTitle("Tällä hetkellä suositut elokuvat");
    let movies = await fetchTrendingMovies();
    setMovies(movies);
  };
  const moviesListComingUp = async () => {
    toggleThemes();
    setComingUpPressed((prevPressed) => !prevPressed);
    setTitle("Tulossa elokuviin");
    let movies = await fetchUpcomingMovies(1);
    setMovies(movies);
  };

  const handlePress = () => {
    setKeyword("");
    setTitle("Tulossa elokuviin");
    Keyboard.dismiss();
  };

  const loadMore = async () => {
    setPage((prevPage) => prevPage + 1);
    let moreMovies = await fetchUpcomingMovies(page);
    console.log(moreMovies);
    setMovies((prevMovies) => [...prevMovies, ...moreMovies]);
    // ...prevMovies eli mitä siellä listassa atm on , ...moreMovies on uus array ja "..."toiminto purkaa arrayn ja lisää jokasen itmemin listaan vähänkuin loop
  };
  // jos hajoo niin koska scrollview ja flatlist samassa? vissii ei kannata olla
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h1text}>{title}</Text>

          <View style={styles.searchcontainer}>
            <TextInput
              style={styles.search}
              placeholder="Hae elokuvia"
              placeholderTextColor="#ccc"
              value={keyword}
              onChangeText={(text) => setKeyword(text)}
            />
            <Icon
              style={{ padding: 10 }}
              onPress={handlePress}
              name="close"
              size={22}
              color="#ccc"
            />
            <TouchableOpacity style={styles.searchIcon} onPress={searchMvoies}>
              <AntDesign name="search1" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttoncon}>
            <TouchableOpacity
              onPress={moviesListComingUp}
              style={[
                styles.buttonfetch,
                comingUpPressed && styles.buttonfetchactived,
              ]} // jos boolean true nii fetchactivated
            >
              <Text style={styles.buttonText}>Tulossa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={moviesListTrending}
              style={[
                styles.buttonfetch,
                Trendingpressed && styles.buttonfetchactived,
              ]} // jos boolean true nii fetchactivated
            >
              <Text style={styles.buttonText}>Suositut</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={moviesListTopRated}
              style={[styles.buttonfetch, pressed && styles.buttonfetchactived]} // jos boolean true nii fetchactivated
            >
              <Text style={styles.buttonText}>Parhaimmat</Text>
            </TouchableOpacity>
          </View>

          {!loading ? (
            <Card movies={movies} navigation={navigation}></Card>
          ) : (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{ marginTop: 100 }}
            />
          )}
          <TouchableOpacity
            onPress={loadMore}
            style={styles.buttonfetchmore} // jos boolean true nii fetchactivated
          >
            <Text style={styles.fetchMoreText}>Lisää elokuvia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#333",
    paddingBottom: 50,
  },
  searchcontainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
  },
  buttoncon: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#333",
    justifyContent: "space-around",
    marginTop: 15,
  },
  buttonfetch: {
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonfetchmore: {
    borderRadius: 5,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "gold",
    color: "#ccc",
    width: 300,
    height: 40,
    justifyContent: "center",
  },
  buttonfetchactived: {
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 1,
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#ccc",
  },
  search: {
    flex: 1,
    height: "100%",
    backgroundColor: "#333",
    margin: 10,
    color: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  h1text: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
  },
  fetchMoreText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
