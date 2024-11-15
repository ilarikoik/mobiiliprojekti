import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import fetchMovieTheathers from "../apiCalls/fetchMovieTheathers";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Maps({ navigation, route }) {
  const { fromDetails } = route.params || {};
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState();
  const [region, setRegion] = useState({
    latitude: 60.20074522904256,
    longitude: 24.92759019553311,
    latitudeDelta: 0.05922,
    longitudeDelta: 0.05421,
  });
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const request = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("ei hyväksytty");
          return null;
        }
        const current = await Location.getCurrentPositionAsync({});
        setRegion({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });

        console.log("Route params:", route.params); // Check if route.params has fromDetails
        console.log("fromDetails:", fromDetails);
        const teatterit = await fetchMovieTheathers(
          current.coords.latitude,
          current.coords.longitude
        );
        setTheaters(teatterit);
      } catch (error) {}
    };
    request();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="OMA SIJAINTI"
        >
          <AntDesign name="user" size={24} color="gold" />
        </Marker>
        {theaters.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
            ></Marker>
          );
        })}
      </MapView>
      {fromDetails ? (
        <View style={styles.titlecon}>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.title}>Takaisin</Text>
          </TouchableOpacity>
        </View>
      ) : fromDetails === null ? (
        <View style={styles.titlecon}>
          <ActivityIndicator
            size={50}
            color="#fff"
            style={{ marginTop: 100 }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  map: {
    flex: 1,
  },
  titlecon: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 80,
    textAlign: "center",
  },
  backbutton: {
    backgroundColor: "#FEBE10",
    height: 40,
    width: 300,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
