import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Watchlist({ navigation }) {
  // käytä card komponenttia ja anna parametrinä sille numColumns={showColumns} // monta itemiä per rivi eli tähä setShowColumns(1)
  // showsVerticalScrollIndicator={false}
  return (
    <View style={styles.container}>
      <Text style={styles.title}> katselu Screen</Text>
      <Text style={styles.title}>
        käytä card komponenttia ja anna parametrinä sille numColumns
      </Text>
      <Text style={styles.title}> - Näkyy kaikki katselulistalle lisätyt</Text>
      <Text style={styles.title}> - Voi poistaa katselulistalta</Text>
      <Text style={styles.title}> - Arvioida</Text>
      <Text style={styles.title}> - lajitella vanhimmat lisätyt</Text>
      <Text style={styles.title}> - lajitella uusimmat lisätyt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    paddingBottom: 30,
    backgroundColor: "red",
  },
  item: {
    height: 270,
    width: 160,
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    borderRadius: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  overview: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    overflow: "hidden",
  },
  favorite: {
    alignItems: "flex-end",
    padding: 5,
  },
});
