import React from "react";
import { View, Text, Button,ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL } from "../../config"; // Ensure the path is correct

const fetchUpcomingMovies = async () => {

  try {
    const res = await fetch(`${URL}/movie/upcoming?${APIANDKEY}`);
    const result = await res.json();
    return result.results; // Adjust this based on the actual API response structure
  } catch (error) {a
    console.log("Error fetching upcoming movies:", error);
    return [];
  } 

 
};


export default fetchUpcomingMovies; // Default export


  // "https://api.themoviedb.org/3/movie/upcoming?api_key=56c4fbb22fb2085dfd77610e1689a704"