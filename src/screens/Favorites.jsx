import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import fetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import Card from "../components/Card";
import VerticalCard from "../components/VerticalCard";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from "react-native-screens";
import { getAllFavorites, deleteItemFavorite } from "../database/favoritesdb";
import { useFocusEffect } from "@react-navigation/native";

export default function Favorites({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [effect, setEffect] = useState(0);
  const [movideId, setMovieId] = useState();

  const getFavorites = async () => {
    let mov = await getAllFavorites();
    setMovies(mov);
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, [])
  );

  useEffect(() => {
    getFavorites();
  }, [effect]);

  const [seacrchBy, setSearchBy] = useState([
    { id: 1, by: "Paras", isActive: true },
    { id: 2, by: "Huonoin", isActive: false },
    //{ id: 5, by: "Kommentoidut", isActive: false },
    { id: 3, by: "Uusin", isActive: false },
    { id: 4, by: "Vanhin", isActive: false },
  ]);

  const changeBy = (itemId) => {
    const updatedItems = seacrchBy.map((item) => {
      if (item.isActive && item.id !== itemId) {
        return { ...item, isActive: false };
      }
      if (item.id === itemId) {
        return { ...item, isActive: true };
      }
      return item;
    });
    setSearchBy(updatedItems);
    showByCategory(itemId);
  };

  const showByCategory = async (itemId) => {
    //setEffect((prevEffect) => prevEffect + 1);
    if (itemId === 1) {
      let update = movies.sort((a, b) => b.grade - a.grade);
      setMovies(update);
    } else if (itemId === 2) {
      let update = movies.sort((a, b) => a.grade - b.grade);
      setMovies(update);
    } else if (itemId === 3) {
      let update = movies.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMovies(update);
    } else if (itemId === 4) {
      let update = movies.sort((a, b) => new Date(a.date) - new Date(b.date));
      setMovies(update);
    } else if (itemId === 5) {
      let update = movies.filter((item) => typeof item.grade === "string");
      setMovies(update);
    }
  };

  const Flist = () => {
    return (
      <FlatList
        data={seacrchBy}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[!item.isActive ? styles.button : styles.buttonActivated]}
            onPress={() => {
              changeBy(item.id);
              showByCategory();
            }}
          >
            <Text style={styles.buttonText}>{item.by} </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const deleteMovie = (id) => {
    deleteItemFavorite(id);
    const update = movies.filter((item) => item.id !== id); // jotta useEffecti pyörähtää
    setMovies(update);
    //Alert.alert("POISTETTU");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttoncon}>
        <Flist />
      </View>
      <VerticalCard
        movies={movies}
        navigation={navigation}
        deleteMovie={deleteMovie}
      ></VerticalCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingBottom: 10,
  },
  buttoncon: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 100,
    height: 30,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
  },
  buttonActivated: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 100,
    height: 30,
    backgroundColor: "#333",
    shadowColor: "gold",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 7,
    borderWidth: 0.2,
    borderColor: "gold",
  },
  buttonText: {
    color: "gold",
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
});
