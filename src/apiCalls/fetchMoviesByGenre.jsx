import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { APIANDKEY, URL, SEARCH_URL } from "../../config"; // Ensure the path is correct

const fetchMoviesByGenre = async (genreId, page) => {
  try {
    const res = await fetch(
      `${URL}/discover/movie?${APIANDKEY}&with_genres=${genreId}&page=${page}`
    );
    const result = await res.json();
    return result.results;
  } catch (error) {
    console.log(`Error fetching movies by genreID ${genreId} :`, error);
    return [];
  }
};

export default fetchMoviesByGenre;

// "https://api.themoviedb.org/3/discover/movie?api_key=56c4fbb22fb2085dfd77610e1689a704&with_genres=28&page=3
