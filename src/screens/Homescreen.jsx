import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/Card"; 
import Fetch from "../components/Fetch";
import { API_KEY, BASE_URL,SEARCH_URL, APIANDKEY } from "../../config";


export default function HomeScreen({ navigation }) {
  const [movies,setMovies] = useState([]);
  const [keyword,setKeyword] = useState('');
  const [url, setUrl] = useState(`${BASE_URL}${API_KEY}`);
  
  // asetetaa URL ja lähetetään se Fetch komponentille
  // jos keyword tyhjä niin palauttaa trendaavat leffat
  const handleUrl = () => {
    let urly;
    if(keyword.length === 0){
      urly = `${BASE_URL}${API_KEY}`
      setUrl(urly)
    }
    urly = `${SEARCH_URL}${keyword}${APIANDKEY}`
    setUrl(urly)

  }
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.h1text}>Kaikki elokuvat</Text>
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.search}
          placeholder="Hae elokuvia"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setKeyword(text)}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={handleUrl}
        >
          <AntDesign name="search1" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
      <Fetch url={url} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#333",
  },
  searchcontainer: {
    width: "90%",  
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
  },
  search: {
    flex: 1,  
    height: "100%",
    backgroundColor: "#333",
    margin:10,
    color: "#fff",
  },
  searchIcon: {
    padding:10,
  },
  h1text: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ccc",
  },
});
