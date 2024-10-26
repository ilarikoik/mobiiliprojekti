import React from "react";
import { View, Text, Button,ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { APIANDKEY, URL,SEARCH_URL } from "../../config"; 

const fetchMovieById = async (movieId) => {
  try {
    const res = await fetch(`${URL}/movie/${movieId}?${APIANDKEY}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(`Error fetching movie id: ${movieId}:`, error);
    return null;
    
  }
};

export default fetchMovieById;


  // "https://api.themoviedb.org/3/movie/55825?api_key=56c4fbb22fb2085dfd77610e1689a704"
  // `${URL}/movie/${movieId}?${APIANDKEY}`