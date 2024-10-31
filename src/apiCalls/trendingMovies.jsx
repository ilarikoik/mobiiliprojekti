import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL } from "../../config"; // Ensure the path is correct

const fetchTrendingMovies = async (page) => {
  try {
    const res = await fetch(
      `${URL}/trending/movie/week?${APIANDKEY}&page=${page}`
    );
    const result = await res.json();
    console.log("HHHHALALLLA");
    return result.results;
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return [];
  }
};

export default fetchTrendingMovies;

// "https://api.themoviedb.org/3/movie/trending?api_key=api_key=56c4fbb22fb2085dfd77610e1689a704"
// https://api.themoviedb.org/3/trending/movie/week?api_key=56c4fbb22fb2085dfd77610e1689a704
