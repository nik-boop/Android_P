/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Geolocation from "react-native-geolocation-service";
import React, { Component, useState } from "react";
import type { Node } from "react";
import {
  Button,
  Dimensions, PermissionsAndroid, Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, ToastAndroid,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import MapView, {
  Circle,
  Marker,
  Polygon,
  Polyline,
  UrlTile,
} from "react-native-maps";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: { latitude: 37.78825, longitude: -122.4324 },
      lines: [],
      marklist: [],
      position: null,
      position_c: null,
    };

    this.hasLocationPermission = async () => {
      if (Platform.OS === "android" && Platform.Version < 23) {
        return true;
      }
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (hasPermission) {
        return true;
      }
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      if (
        status === PermissionsAndroid.RESULTS.DENIED ||
        status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        ToastAndroid.show(
          "Location permission denied by user.",
          ToastAndroid.LONG,
        );
      }

      return false;
    };

    this.drawLine = () => {
      let lines = this.state.marklist.map(item => (item.coords));
      lines.push(this.state.location);
      this.setState({ lines: lines });
    };

    this.clearLine = () => {
      this.setState({ lines: [] });
    };

    this.clearMarker = () => {
      this.setState({ marklist: [], lines: [] });
    };

    this.getPoz = async () => {
      const hasPermission = await this.hasLocationPermission();
      if (!hasPermission) {
        console.log("нет разрешений!");
      }
      Geolocation.getCurrentPosition(
        pos => {
          this.setState({ position: pos });
          this.setState({ position_c: { latitude: pos.coords.latitude, longitude: pos.coords.longitude } });
          //console.log(this.state.position);
          console.log(this.state.position_c);
        },
        error => {
          console.log("Ошибка");
          console.log(error);
        },
      );
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.title_map}>Привет</Text>
        <MapView
          style={styles.map}
          mapType={"none"}
        >
          <UrlTile
            //urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={20}
            zIndex={0}
          />
          {this.state.marklist.map(
            (items) => (
              <Marker
                key={items.title}
                coordinate={items.coords}
                title={"Point#" + items.title}
              />
            ),
          )}

          <Marker
            coordinate={this.state.location}
            title={"User"}
            draggable={true}
            pinColor={"green"}
            onDragStart={e => {
              const last_coords = {
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude,
              };
              if (this.state.marklist.length === 0) {
                this.setState(
                  {
                    marklist: [
                      {
                        coords: last_coords,
                        title: 1,
                      },
                    ],
                  },
                );
              } else {
                this.setState((state, props) => (
                    {
                      marklist: state.marklist.concat(
                        {
                          coords: last_coords,
                          title: state.marklist[state.marklist.length - 1].title + 1,
                        },
                      ),
                    }
                  ),
                );
              }
            }
            }
            onDragEnd={e => {
              this.setState({
                location: {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
              });
            }}
          />

          {this.state.position_c !== null && <Marker coordinate={this.state.position_c} title={"User Poz"} />}

          <Circle
            radius={1000}
            center={this.state.location}
            zIndex={1}
            fillColor={"rgba(255,0,255,0.2)"}
          />
          {this.state.lines.length > 0 && <Polyline coordinates={this.state.lines} zIndex={2} />}
        </MapView>
        <View style={styles.coords_view}>
          <Text style={styles.coords_text}> User position </Text>
          <Text style={styles.coords_text}> {`latitude: ${this.state.location.latitude.toFixed(5)}`} </Text>
          <Text style={styles.coords_text}> {`longitude: ${this.state.location.longitude.toFixed(5)}`} </Text>
        </View>
        <View style={styles.buttonbar}>
          <Button
            onPress={this.drawLine}
            title="Draw" />
          <Button
            onPress={this.clearLine}
            title="Clear" />
          <Button
            onPress={this.clearMarker}
            title="Clear" />
          <Button
            onPress={this.getPoz}
            title="Poz" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  map: {
    flex: 0.9,
  },
  title_map: {
    flex: 0.1,
    width: "100%",
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

export default App;
