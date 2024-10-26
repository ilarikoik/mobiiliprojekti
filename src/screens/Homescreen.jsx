import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet ,Button,ActivityIndicator,Keyboard} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Card from "../components/Card"; 
import Fetch from "../components/Fetch";
import { API_KEY, BASE_URL,SEARCH_URL, APIANDKEY } from "../../config";
import FetchUpcomingMovies from "../apiCalls/FetchUpcomingMovies";
import fetchMovieByName from "../apiCalls/FetchMovieByName";

export default function HomeScreen({ navigation }) {
  const [movies,setMovies] = useState([]);
  const [keyword,setKeyword] = useState('');
  const [url, setUrl] = useState(`${BASE_URL}${API_KEY}`);
  const [loading, setLoading] = useState(false);

  
  // muista await ja async aina näissä !
  const handleUrl =  async() => {
    if(keyword.length > 0) {
      setLoading(true)
      const movie = await fetchMovieByName(keyword)
      setMovies(movie)
      setLoading(false)
      setKeyword('')
      Keyboard.dismiss();
    }
    // haettaessa tyhjää palauttaa UpComingMovies
    if(keyword.length === 0) {
      setLoading(true)
      const trendingMovies = await FetchUpcomingMovies();
      setMovies(trendingMovies)
      setLoading(false)
    }
  }

  useEffect(() => {
    const getUpcoming = async () => {
      setLoading(true)
      const upComing = await FetchUpcomingMovies();
      setMovies(upComing)
      console.log(upComing)
      setLoading(false)
    }
    getUpcoming();
  },[])

  
  // nagivation propsina fetchille ja sieltä cardille , pitää kulkea "ylhäätlä" alaspäin aina tämmösissä ilmeisesti
  return (
    <View style={styles.container}>
      <Text style={styles.h1text}>Kaikki elokuvat</Text>
      <View style={styles.searchcontainer}>
        <TextInput
          style={styles.search}
          placeholder="Hae elokuvia"
          placeholderTextColor="#ccc"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={handleUrl}
        >
          <AntDesign name="search1" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {!loading ? (<Card movies={movies} navigation={navigation}></Card>) : (<ActivityIndicator size="large" color="#fff"style={{marginTop:100,}} />)}
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
