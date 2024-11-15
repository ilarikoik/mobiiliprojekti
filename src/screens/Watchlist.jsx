import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import fetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import Card from "../components/Card";
import VerticalCard from "../components/VerticalCard";
import { getAllItems } from "../database/db";

export default function Watchlist({ navigation }) {
  const [newest, setNewest] = useState(true);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getUpcoming = async () => {
      let showMovies;
      showMovies = await getAllItems();
      setMovies(showMovies);
    };
    getUpcoming();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttoncon}>
        <TouchableOpacity
          style={[!newest ? styles.button : styles.buttonActivated]}
          onPress={() => console.log(movies)}
        >
          <Text style={styles.buttonText}>leffet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[!newest ? styles.button : styles.buttonActivated]}
          onPress={() => setNewest(true)}
        >
          <Text style={styles.buttonText}>uusimmat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[newest ? styles.button : styles.buttonActivated]}
          onPress={() => setNewest(false)}
        >
          <Text style={styles.buttonText}>vanhimmat</Text>
        </TouchableOpacity>
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
});
