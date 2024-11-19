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
import { getAllItems, deleteItem } from "../database/db";
import { useFocusEffect } from "@react-navigation/native";

export default function Watchlist({ navigation }) {
  const [newest, setNewest] = useState(true);
  const [oldest, setOldest] = useState(false);

  const [movies, setMovies] = useState([]);

  //useEffect(() => {
  //  const getUpcoming = async () => {
  //    let showMovies;
  //    showMovies = await getAllItems();
  //    setMovies(showMovies);
  //  };
  //  getUpcoming();
  //}, []);

  const getUpcoming = async () => {
    const showMovies = await getAllItems();
    setMovies(showMovies);
  };

  // useFocus päivittää aina kun screeni avataan jotta saadaan listalle lisätyt näykvii heti
  // This will fetch the latest movies whenever the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getUpcoming();
      setNewest(true);
    }, [])
  );

  const sortOldest = async () => {
    const showMovies = await getAllItems();
    setNewest(false);
    const oldest = showMovies.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setMovies(oldest);
  };
  const sortNewest = async () => {
    const showMovies = await getAllItems();
    setNewest(true);
    const oldest = showMovies.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setMovies(oldest);
  };

  const deleteMovie = (id) => {
    deleteItem(id);
    const update = movies.filter((item) => item.id !== id); // jotta useEffecti pyörähtää
    setMovies(update);
    //Alert.alert("POISTETTU");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttoncon}>
        <TouchableOpacity
          style={[!newest ? styles.button : styles.buttonActivated]}
          onPress={sortNewest}
        >
          <Text style={styles.buttonText}>uusimmat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[newest ? styles.button : styles.buttonActivated]}
          onPress={sortOldest}
        >
          <Text style={styles.buttonText}>vanhimmat</Text>
        </TouchableOpacity>
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
});
