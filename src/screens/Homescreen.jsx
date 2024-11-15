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
import fetchMovieGenres from "../apiCalls/fetchMovieGenres";
import fetchMoviesByGenre from "../apiCalls/fetchMoviesByGenre";
import PopUpMenu from "../components/PopUpMenu";
import { Menu, MenuProvider } from "react-native-popup-menu";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(`${BASE_URL}${API_KEY}`); // voi poistaa?
  const [page, setPage] = useState(2);
  const [genrePage, setGenrePage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [topPage, setTopPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [comingUpPressed, setComingUpPressed] = useState(false);
  const [Trendingpressed, setTrendingPressed] = useState(false);
  const [genresPressed, setGenresPressed] = useState(false);
  const [genreActivated, setGenreActivated] = useState(false);
  const [showGenres, setShowGenres] = useState([]);
  const [searchByGenre, setSearchByGenre] = useState();

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
      setComingUpPressed(true);
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
    setGenresPressed(false);
  };

  const moviesListTopRated = async () => {
    toggleThemes(); // laitetaan kaikki buttonit false
    setPressed((prevPressed) => !prevPressed); // muutetaan true jotta style näkyy
    console.log(pressed);
    setTitle("Parhaiten arvioidut elokuvat");
    let movies = await fetchTopRatedMovies(1);
    setTopPage(2);
    setMovies(movies);
  };

  const moviesListTrending = async () => {
    toggleThemes();
    setTrendingPressed((prevPressed) => !prevPressed);
    setTitle("Tällä hetkellä suositut elokuvat");
    let movies = await fetchTrendingMovies(1); // lataa aina ekan sivun ku ettii "suositut"
    setTrendingPage(2); // asetetaa valmiiks seuraava sivu ja sitte kun ladataa lisää sen jälkee nostetaa ku muute ei kerkee päivittyy tai jtn
    console.log(movies);
    setMovies(movies);
  };
  const moviesListComingUp = async () => {
    toggleThemes();
    setComingUpPressed((prevPressed) => !prevPressed);
    setTitle("Tulossa elokuviin");
    let movies = await fetchUpcomingMovies(1);
    setMovies(movies);
  };
  const genres = async () => {
    toggleThemes();
    setGenreActivated((prevPressed) => !prevPressed);
    getGenres(); // klikatessa tekee fetchin genreille
  };

  const getGenres = async () => {
    // fetch kaikki genret ja ne annetaan propsina PopUpMenulle
    try {
      const genret = await fetchMovieGenres();
      setShowGenres(genret);
    } catch (error) {
      console.log("ERRR" + error);
    } finally {
    }
  };

  const handleGenreSelect = async (genreId) => {
    // anneta propsina tää funktio ja se asettaa siellä klikatun ID tohon muuttujaa
    setGenresPressed(true); // pitää olla true (vihree border) että loadMore hakee oikein
    setSearchByGenre(genreId);
    setGenreActivated(false); // sulkee menun
    console.log("Selected genre ID:", genreId);
    getByGenre(genreId, genrePage);
  };

  const getByGenre = async (genreId, genrePage) => {
    let movies = await fetchMoviesByGenre(genreId, 1);
    setGenrePage(2);
    console.log("Fetched movies:", JSON.stringify(movies));
    setMovies(movies);
  };

  const handlePress = () => {
    setKeyword("");
    setTitle("Tulossa elokuviin");
    toggleThemes();
    setGenresPressed(false);
    Keyboard.dismiss();
  };

  const loadMore = async () => {
    let moreMovies = [];
    if (comingUpPressed) {
      setPage((prevPage) => prevPage + 1);
      moreMovies = await fetchUpcomingMovies(page);
    } else if (genresPressed) {
      moreMovies = await fetchMoviesByGenre(searchByGenre, genrePage);
      setGenrePage((prevPage) => prevPage + 1);
    } else if (Trendingpressed) {
      moreMovies = await fetchTrendingMovies(trendingPage);
      setTrendingPage((prevPage) => prevPage + 1);
    } else if (pressed) {
      moreMovies = await fetchTopRatedMovies(topPage);
      setTopPage((prevPage) => prevPage + 1);
    }
    setMovies((prevMovies) => [...prevMovies, ...moreMovies]);
    //togglessa määriteelty muuttujat ne aina muuttaa tilaa ku searchbuttoneita painetaa niin niidenperusteella lisää elokuvia hakuja?
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
              placeholderTextColor="gold"
              value={keyword}
              onChangeText={(text) => setKeyword(text)}
            />
            <Icon
              style={{ padding: 10 }}
              onPress={handlePress}
              name="close"
              size={22}
              color="gold"
            />
            <TouchableOpacity style={styles.searchIcon} onPress={searchMvoies}>
              <AntDesign name="search1" size={24} color="gold" />
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
            <TouchableOpacity
              onPress={genres}
              style={[
                styles.buttonfetch,
                genresPressed && styles.buttonfetchactived,
              ]}
            >
              <Text style={styles.buttonText}>Genret</Text>
            </TouchableOpacity>
          </View>
          {genreActivated && (
            <View style={styles.menucontainer}>
              <MenuProvider>
                <PopUpMenu
                  showGenres={showGenres}
                  setSelectedGenre={handleGenreSelect}
                />
              </MenuProvider>
            </View>
          )}
          {!loading ? (
            <Card movies={movies} navigation={navigation}></Card>
          ) : (
            <ActivityIndicator
              size={50}
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
    //backgroundColor: "#333",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    //borderColor: "gold",
    //borderWidth: 1,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },
  buttoncon: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#333",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 10,
  },
  buttonfetch: {
    borderRadius: 5,
    borderColor: "rgba(0, 0, 0, 0.3)",
    borderWidth: 1,
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
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
    borderColor: "gold",
    borderWidth: 1,
    backgroundColor: "#333",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    shadowColor: "gold",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },
  buttonText: {
    color: "#ccc",
  },
  search: {
    flex: 1,
    height: "100%",
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
    color: "rgba(0, 0, 0, 0.6)",
  },
  fetchMoreText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  menucontainer: {
    flex: 1,
    width: 500,
    marginTop: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
