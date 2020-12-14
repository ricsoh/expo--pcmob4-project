import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrivalMinutes, setArrivalMinutes] = useState("");
  const [seqArrival, setSeqArrival] = useState("");
  const [seqArrivalMinutes, setSeqArrivalMinutes] = useState("");
  const [busNumber, setBusNumber] = useState("945");
  const [busStop, setBusStop] = useState("43009");
  const [BUSSTOP_URL, setBUSSTOP_URL] = useState("https://arrivelah2.busrouter.sg/?id=" + busStop);
//  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + busStop;

  // This will retrive data using API
  function loadBusStopData() {
    // Turn on the loading indicator each time
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (item) => item.no === busNumber
        )[0];
        setArrival(myBus.next.time);
        setArrivalMinutes(Math.round((myBus.next.duration_ms)/60000));
        setSeqArrival(myBus.subsequent.time);
        setSeqArrivalMinutes(Math.round((myBus.subsequent.duration_ms)/60000));
        setLoading(false);
      });
  }

  // This happened once
  useEffect(() => {
    const interval = setInterval(loadBusStopData, 3000);

    // Return the function to run when unmouting
    return () => clearInterval(interval);
  }, []);

  // Return formatted date
  function dateConvert(time) {
    const day = new Date(time);
    let [hour, minute, second] = day.toLocaleTimeString("en-US").split(":");
    const timeArranged = `${hour}:${minute}:${second}`
    
    return timeArranged;
  }

  function refreshPressed(newBusStop) {
//    alert("Refresh pressed");
    loadBusStopData();
  }

 return (
  <View style={styles.container}>
    <View style={styles.containerView}>
      <Text style={styles.title}>Bus stop</Text>
      <Text style={styles.arrivalInfo}>{busStop}</Text>
      <Text style={styles.title}>Bus number</Text>
      <Text style={styles.arrivalInfo}>{busNumber}</Text>
      {/* Next bus arrival */}
      <Text style={styles.title}>Bus arrival time ( waiting time )</Text>
      <Text style={styles.arrivalInfo}>
        {loading ? <ActivityIndicator size="large" color="blue"/> : dateConvert(arrival)} ( {arrivalMinutes} mins )
      </Text>
      {/* Subsequent bus arrival */}
      <Text style={styles.title}>Subsequent Bus arrival time ( waiting time )</Text>
      <Text style={styles.arrivalInfo}>
        {loading ? <ActivityIndicator size="large" color="blue"/> : dateConvert(seqArrival)} ( {seqArrivalMinutes} mins )
      </Text>
      <Text style={styles.arrivalInfoNote}>Note, negative waiting time means bus arriving late.</Text>
      <TouchableOpacity style={styles.button} onPress={() => refreshPressed()}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
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
 containerView: {
  flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  height: "50%",
 },
 textInput: {
  margin: 20,
  borderWidth: 1,
  width: "80%",
  padding: 10,
  borderColor: "#ccc",
 },
  title: { 
  fontWeight: "bold",
  fontSize: 15,
  color: "blue",
  textAlign: "left",
  marginBottom: 10,
//  textDecorationLine: "underline",
 },
 arrivalInfo: {
  fontSize: 15,
  marginBottom: 25,
 },
 arrivalInfoNote: {
  fontSize: 12,
  marginBottom: 30,
 },
 button: {
  padding: 12,
  backgroundColor: "darkgreen",
  borderRadius: 10,
 },
 buttonText: {
  fontSize: 18,
  fontWeight: "bold",
  color: "white",
 },
});

