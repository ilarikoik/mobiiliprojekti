import React from "react";
import { View, Text, Button,ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import { APIANDKEY, URL,SEARCH_URL } from "../../config"; // Ensure the path is correct

const fetchMovieByName = async (keyword) => {
  try {
    const res = await fetch(`${SEARCH_URL}${keyword}&${APIANDKEY}`);
    const result = await res.json();
    return result.results;
  } catch (error) {
    console.log(`Error fetching movie(s) ${keyword}:`, error);
    return [];
  }
};

export default fetchMovieByName;


  // "https://api.themoviedb.org/3/search/movie?query=Shrek&api_key="