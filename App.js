import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=43009";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [busNumber, setBusNumber] = useState("945");

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
//          (item) => item.no === "945"
          (item) => item.no === busNumber
        )[0];
        setArrival(myBus.next.time);
        setLoading(false);
//        console.log("My bus:");
//        console.log(myBus);
      });
  }

  // This happened once
  useEffect(() => {
    const interval = setInterval(loadBusStopData, 1000);

    // Return the function to run when unmouting
    return () => clearInterval(interval);
  }, []);

  function refreshPressed() {
    alert("Refresh pressed");
  }

 return (
   <View style={styles.container}>
     <Text style={styles.title}>Bus ({busNumber}) arrival time:</Text>
      <Text style={styles.arrivalTime}>
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
   fontSize: 32,
   marginBottom: 24,
 },
 arrivalTime: {
   fontSize: 40,
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

