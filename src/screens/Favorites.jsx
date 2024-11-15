import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import fetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import Card from "../components/Card";
import VerticalCard from "../components/VerticalCard";
import { FlatList } from "react-native-gesture-handler";
import { SearchBar } from "react-native-screens";

export default function Favorites({ navigation }) {
  // käytä card komponenttia ja anna parametrinä sille numColumns={showColumns} // monta itemiä per rivi eli tähä setShowColumns(1)
  // showsVerticalScrollIndicator={false}
  //    käytä card komponenttia ja anna parametrinä sille numColumns
  //   - Näkyy kaikki katselulistalle lisätyt
  //   - Voi poistaa katselulistalta
  //   - lajitella vanhimmat lisätyt
  //   - lajitella uusimmat lisätyt
  const [movies, setMovies] = useState([]);
  const [movideId, setMovieId] = useState();

  useEffect(() => {
    const getUpcoming = async () => {
      let showMovies;
      showMovies = await fetchUpcomingMovies(1);
      setMovies(showMovies);
    };
    getUpcoming();
  }, []);

  const [seacrchBy, setSearchBy] = useState([
    { id: 1, by: "Paras", isActive: true },
    { id: 2, by: "Huonoin", isActive: false },
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
  };

  // sit vaan lajitellaan sen perusteella mikä on active
  // map..if(item){movies.filter( a => b ... )}
  // setmovies(updatedmovies)

  const Flist = () => {
    return (
      <FlatList
        data={seacrchBy}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[!item.isActive ? styles.button : styles.buttonActivated]}
            onPress={() => changeBy(item.id)}
          >
            <Text style={styles.buttonText}>{item.by} </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttoncon}>
        <Flist />
      </View>
      <VerticalCard movies={movies} navigation={navigation}></VerticalCard>
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
