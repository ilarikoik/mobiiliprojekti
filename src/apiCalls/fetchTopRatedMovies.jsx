import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

import { APIANDKEY, URL } from "../../config"; // Ensure the path is correct

const fetchTopRatedMovies = async (page) => {
  try {
    const res = await fetch(`${URL}/movie/top_rated?${APIANDKEY}&page=${page}`);
    const result = await res.json();
    console.log("jojojojadsojasodjoadas");
    return result.results;
  } catch (error) {
    a;
    console.log("Error fetching trending movies:", error);
    return [];
  }
};

export default fetchTopRatedMovies; // Default export

// https://api.themoviedb.org/3/movie/top_rated?api_key=&page=1
