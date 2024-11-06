// --legacy-peer-deps
import React, { useEffect, useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
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
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import fetchMovieGenres from "../apiCalls/fetchMovieGenres";
import { ScrollView } from "react-native-gesture-handler";

export default function PopUpMenu({ showGenres, setSelectedGenre }) {
  const [loading, setLoading] = useState(false);

  const testi = () => {
    console.log();
  };

  // genres.length > 0 ? jos ei oo kerenny ladata niin se palauttaa falsen ja se aiheuttaa --> "Error: Text strings must be rendered within a <Text> component."
  // eli muista fallaback teksti
  return (
    <View style={styles.container}>
      <MenuOptions style={styles.menucontainer}>
        <ScrollView>
          {showGenres.length > 0 ? (
            showGenres.map((item, id) => {
              return (
                <MenuOption
                  key={id}
                  style={styles.item}
                  onSelect={() => setSelectedGenre(item.id)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </MenuOption>
              );
            })
          ) : (
            <Text style={styles.itemText}>No genres available</Text>
          )}
        </ScrollView>
      </MenuOptions>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menucontainer: {
    borderRadius: 10,
    padding: 10,
    width: 350,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginTop: 5,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    justifyContent: "center",
    height: 40,
    width: 200,
    margin: 5,
    backgroundColor: "#FEBE10",
    borderRadius: 5,
    overflow: "hidden",
  },
  itemText: {
    color: "black",
  },
});
