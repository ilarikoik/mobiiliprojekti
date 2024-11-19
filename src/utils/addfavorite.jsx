import { Alert } from "react-native";
import { saveItemFavorites, getAllFavorites } from "../database/favoritesdb";
import { useState } from "react";

export const addFavorite = async (movie) => {
  let items = await getAllFavorites();
  let check = items.find((item) => item.movieId === movie.id);
  if (check) {
    Alert.alert("Elokuva on jo suosikeissa");
  } else {
    console.log(
      JSON.stringify(movie.movieId) +
        "assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss \n\n\n"
    );
    Alert.prompt(
      "Arvioi elokuva 1-10",
      "Pilkku sallittu",
      [
        {
          text: "Myöhemmin",
          onPress: async () =>
            await saveItemFavorites(
              movie.title,
              movie.poster_path || movie.img,
              new Date().toISOString(),
              1,
              movie.movieId,
              0
            ),
          style: "Myöhemmin",
        },
        {
          text: "OK",
          onPress: async (text) => {
            let replace = text.replace(",", ".");
            if (parseFloat(text) > 0 && parseFloat(text) < 11) {
              await saveItemFavorites(
                movie.title,
                movie.poster_path,
                new Date().toISOString(),
                1,
                movie.id,
                replace
              );
            } else {
              Alert.alert("Arvio pitää olla 1-10");
            }
          },
        },
      ],
      "plain-text",
      null,
      "numeric"
    );
  }
};
