import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [busNumber, setBusNumber] = useState("945");
  const [busStop, setBusStop] = useState("43009");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + busStop;


  // This will retrive data using API
  function loadBusStopData() {
    // Turn on the loading indicator each time
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("Bus numer:" + busNumber); // display data at console
        const myBus = responseData.services.filter(
          (item) => item.no === busNumber
        )[0];
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  // This happened once
  useEffect(() => {
    const interval = setInterval(loadBusStopData, 3000);

    // Return the function to run when unmouting
    return () => clearInterval(interval);
  }, []);

  function refreshPressed() {
    alert("Refresh pressed");
  }

 return (
  <View style={styles.container}>
    <Text style={styles.title}>Bus stop</Text>
    <Text style={styles.arrivalInfo}>{busStop}</Text>
    <Text style={styles.title}>Bus number</Text>
    <Text style={styles.arrivalInfo}>{busNumber}</Text>
    <Text style={styles.title}>Bus arrival time</Text>
    <Text style={styles.arrivalInfo}>
      {loading ? <ActivityIndicator size="large" color="blue"/> : arrival}
    </Text>
    <TouchableOpacity style={styles.button} onPress={() => refreshPressed()}>
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
  fontSize: 26,
  color: "blue",
  textAlign: "left",
  marginBottom: 24,
  textDecorationLine: "underline",
 },
 arrivalInfo: {
  fontSize: 20,
  marginBottom: 30,
 },
 button: {
  padding: 20,
  backgroundColor: "darkgreen",
  borderRadius: 10,
 },
 buttonText: {
  fontSize: 28,
  fontWeight: "bold",
  color: "white",
 },
});

