import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL, GOOGLEURL, GOOGLEKEY } from "../../config"; // Ensure the path is correct

// parameterit {par} sisällä jos se on objekti muuten ilman
const fetchMovieTheathers = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `${GOOGLEURL}${latitude},${longitude}&radius=5000&keyword=elokuvateatteri&key=${GOOGLEKEY}`
    );
    const result = await res.json();
    return result.results;
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return [];
  }
};

export default fetchMovieTheathers; // Default export

// "https://api.themoviedb.org/3/movie/trending?api_key=api_key="
//
