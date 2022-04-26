import * as React from "react";
import MapView, { Circle, Marker, Polyline, UrlTile } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { useState } from "react";

export default function App() {
  const [location, setLocation] = useState({
    longitude: -122.4324,
    latitude: 37.78825,
  });
  const [lines, setLines] = useState([]);

  const [arraylist, setArr] = useState([]);
  let last_coords = {};
  const drawLine = () => {
    let lines = arraylist.map(item => item.coords);
    lines.push(location);
    setLines(lines);
  };
  const clearLine = () => {
    setLines([]);
  };
  const clearMarker = () => {
    setArr([]);
    setLines([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_map}> Maps </Text>

      <MapView
        style={styles.map}
        provider={null}
        mapType={"none"}
        showsMyLocationButton={true}
        showsUserLocation={true}>
        <UrlTile
          //urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          maximumZ={20}
          zIndex={0}
        />
        {arraylist.map(items => (
          <Marker
            key={items.title}
            coordinate={items.coords}
            title={"Point#" + items.title}
          />
        ))}
        <Marker
          coordinate={location}
          title={"User"}
          draggable={true}
          pinColor={"green"}
          onDragStart={e => {
            last_coords = {
              latitude: location.latitude,
              longitude: location.longitude,
            };
            if (arraylist.length === 0) {
              setArr(
                arraylist.concat({
                  coords: last_coords,
                  title: 1,
                }),
              );
            } else {
              setArr(
                arraylist.concat({
                  coords: last_coords,
                  title: arraylist[arraylist.length - 1].title + 1,
                }),
              );
            }
          }}
          onDragEnd={e => {
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        />

        <Circle
          radius={1000}
          center={location}
          zIndex={1}
          fillColor={"rgba(255,0,255,0.2)"}
        />
        {lines.length > 0 && <Polyline coordinates={lines} zIndex={2} />}
      </MapView>
      <View style={styles.coords_view}>
        <Text style={styles.coords_text}> User position </Text>
        <Text style={styles.coords_text}>
          {" "}
          {`latitude: ${location.latitude.toFixed(5)}`}{" "}
        </Text>
        <Text style={styles.coords_text}>
          {" "}
          {`longitude: ${location.longitude.toFixed(5)}`}{" "}
        </Text>
      </View>
      <View style={styles.buttonbar}>
        <Button onPress={drawLine} title="Draw" />
        <Button onPress={clearLine} title="Clear" />
        <Button onPress={clearMarker} title="Clear" />
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
  title_map: {
    textAlignVertical: "bottom",
    flex: 0.1,
    width: "100%",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.9,
  },
  coords_view: {
    flex: 0.1,
    width: "100%",
    color: "rgba(100,100,100,1)",
    textAlign: "left",
    borderWidth: 1,
  },
  coords_text: {
    fontSize: 12,
    width: "100%",
    color: "rgba(100,100,100,1)",
    textAlign: "left",
  },

  buttonbar: {
    width: "100%",
    flexDirection: "row",
  },
});
