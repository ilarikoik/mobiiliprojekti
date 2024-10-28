import React from "react";
import { View, Text, Button,ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL } from "../../config"; // Ensure the path is correct

const fetchTrendingMovies = async () => {

  try {
    const res = await fetch(`${URL}/trending/movie/week?${APIANDKEY}`);
    const result = await res.json();
    console.log("afdlaksdladklsakl")
    console.log(result.results)
    return result.results; 
  } catch (error) {
    console.log("Error fetching trending movies:", error);
    return [];
  } 

 
};


export default fetchTrendingMovies; 


  // "https://api.themoviedb.org/3/movie/trending?api_key="