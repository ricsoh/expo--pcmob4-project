import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=43009";

export default function App() {
  const [loading, setLoading] = useState(true);

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseDData) => {
        console.log(responseDData);
      });
  }

  // This happened once
  useEffect(() => {
    loadBusStopData();
  }, []);

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" color="blue"/> : "Loaded"}
      </Text>
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>Refresh!</Text>
     </TouchableOpacity>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
   justifyContent: "center",
 },
 title: {
   fontWeight: "bold",
   fontSize: 32,
   marginBottom: 24,
 },
 arrivalTime: {
   fontSize: 64,
   marginBottom: 32,
 },
 button: {
   padding: 20,
   backgroundColor: "darkgreen",
   borderRadius: 10,
 },
 buttonText: {
   fontSize: 32,
   fontWeight: "bold",
   color: "white",
 },
});

