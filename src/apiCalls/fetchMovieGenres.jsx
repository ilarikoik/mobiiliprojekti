import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL } from "../../config"; // Ensure the path is correct

const fetchMovieGenres = async () => {
  try {
    const res = await fetch(`${URL}/genre/movie/list?${APIANDKEY}`);
    const result = await res.json();
    return result.genres;
  } catch (error) {
    console.log("Error fetching movie genres: ", error);
    return [];
  }
};

export default fetchMovieGenres; // Default export

// `${URL}genre/movie/list?${APIANDKEY}`
//https://api.themoviedb.org/3/genre/movie/list?api_key=56c4fbb22fb2085dfd77610e1689a704
