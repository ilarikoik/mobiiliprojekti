import React from "react";
import { View, Text, Button,ActivityIndicator} from "react-native";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function Fetch({url,navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // hakee trenaavat leffat 
  useEffect(() => {
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await fetch(url)
      const result = await res.json();
      setData(result.results);
      console.log(result.results)
    } catch (error) {
        console.log("PERKELE ---- "+error)
    } finally {
        setLoading(false);
      }
  };
    fetchMovies();
    console.log('jahaha')
  }, [url])

  if (loading) {
    return <ActivityIndicator size="large" color="#fff"style={{marginTop:100,}} />; // Show loading indicator
  }
  return (
  <View>
    <Card movies={data} navigation={navigation}></Card>
</View>)
}
