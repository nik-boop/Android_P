import Geolocation from "react-native-geolocation-service";
import React, { Component, useState } from "react";

import {
  Button,
  Dimensions, Modal, PermissionsAndroid, Platform, Pressable,
  StyleSheet, Text, TextInput,
  ToastAndroid,
  View,
} from "react-native";

import MapView, {
  Marker,
  Polyline,
  UrlTile,
} from "react-native-maps";
import { Alert } from "react-native";

import MarkerInf from "./MarkerInf";
import MapButton from "./MapButton";


class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: this.props.markers,
      dataLoc: [],
      myPos: {
        coords: { latitude: 0, longitude: 0 },
        time: 0,
        timestamp: 0, // Отметка времени
        provider: "gps",
        altitudeAccuracy: 0, // Точность определения высоты
        speed: 0,
        heading: 0, // Заголовок
        accuracy: 5, // Точность
        altitude: 0, // Высота
      },
      startLoc: true,
      showLoc: true,
      pathLen: 0,

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

    const addCoords = (position) => {
      const initialPosition = JSON.stringify(position);
      let time = new Date();
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      this.setState({
          markers: this.state.markers.concat(
            {
              number: this.state.markers.length + 1,
              title: "Точка маршрута #" + this.state.markers.length + 1,
              distinct: "Точка пройденного маршрута",
              coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
              time: time.toString(),
              timestamp: position.timestamp, // Отметка времени
              provider: position.provider,
              altitudeAccuracy: position.coords.altitudeAccuracy, // Точность определения высоты
              speed: position.coords.speed,
              heading: position.coords.heading, // Заголовок
              accuracy: position.coords.accuracy, // Точность
              altitude: position.coords.altitude, // Высота
            },
          ),
        },
      );
      this.props.app.setMarkers(this.state.markers)
      this.setState({ dataLoc: this.state.dataLoc.concat({ data: initialPosition, dataTime: time.toString }) });

      this.setState({ pathLen: pathLen(this.state.markers).toFixed(3) });

    };

    const myPos = (position) => {
      let time = new Date();
      let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      this.setState({
          myPos:
            {
              title: "Текущая позиция",
              description: "Точка показывающая текущее местоположение прользователя",
              coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
              timeString: time.toString(),
              time: time.toLocaleString("ru", options),
              timestamp: position.timestamp,// Отметка времени
              provider: position.provider,
              altitudeAccuracy: position.coords.altitudeAccuracy,// Точность определения высоты
              speed: position.coords.speed,
              heading: position.coords.heading,// Заголовок
              accuracy: position.coords.accuracy, // Точность
              altitude: position.coords.altitude, // Высота
            },
        },
      );
    };

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      let R = 6371;
      let dLat = deg2rad(lat2 - lat1);
      let dLon = deg2rad(lon2 - lon1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }


    const marksLen = (coords1, coords2) => {
      return getDistanceFromLatLonInKm(coords1.latitude, coords1.longitude, coords2.latitude, coords2.longitude);
    };

    const pathLen = (markers) => {
      let summ = 0;
      for (let i = 0; i < markers.length - 1; i++) {
        summ += marksLen(markers[i].coords, (markers[i + 1].coords));
      }
      return summ;
    };

    const alertErr = (error) => {
      Alert.alert("Error", JSON.stringify(error));
    };

    this.Start = async () => {
      this.watchID = Geolocation.watchPosition(position => {
        addCoords(position);
        myPos(position);
      });
      console.log("start");
    };

    this.getPoz = async () => {
      Geolocation.getCurrentPosition(myPos, alertErr, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      });
      console.log("get poz");
    };

  }



  componentDidMount() {
    if (this.state.startLoc == true) {
      this.hasLocationPermission().then(r => {
        if (r == true) {
          this.Start();
          this.getPoz();
          console.log("end");
          this.setState({ startLoc: false });
        }
      });
    }

  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.main}>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          mapType={"none"}
        >
          <UrlTile
            //urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={20}
            zIndex={0}
          />
          {this.state.markers.length > 0 && this.state.viewMarks &&
            this.state.markers.map(
              (items, index) => (
                <Marker
                  key={index}
                  coordinate={items.coords}
                  title={"Point#" + index}
                  zIndex={5}
                />
              ),
            )}

          <Marker
            coordinate={this.state.myPos.coords}
            title={"User"}
            pinColor={"green"}
            zIndex={6}
          >
          </Marker>
          {this.state.viewPoliline && this.state.markers.length > 1 &&
            <Polyline coordinates={this.state.markers.map(item => {
              return item.coords;
            })} zIndex={2} />}
        </MapView>
        <MarkerInf
          style={styles.markInf}
          inf={
            {
              title: this.state.myPos.title,
              coords: {
                latitude: this.state.myPos.coords.latitude.toFixed(5),
                longitude: this.state.myPos.coords.longitude.toFixed(5),
              },
              desc: this.state.myPos.description,
              time: this.state.myPos.time,
              pathLen: this.state.pathLen,
            }
          }>
        </MarkerInf>
        <MapButton
          func={
            {
              viewPoliline: (value) => {
                this.setState({ viewPoliline: value });
              },
              viewMarks: (value) => {
                this.setState({ viewMarks: value });
              },
              getPoz: () => {
                this.getPoz();
              },
              MyMark: () => {
                this.setModalVisible();
              },
            }
          }
          data={
            {
              viewPoliline: this.state.viewPoliline,
              viewMarks: this.state.viewMarks,
            }
          }
        >
        </MapButton>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: "100%",
  },
  map: {
    flex: 4,
  },
  markInf: {
    flex: 1,
    /*height: "50%",*/
  },
  buttonbar: {
    width: "100%",
    flexDirection: "row",
  },
  modal: {
    position: "absolute",
    marginTop: "15%",
    marginLeft: "15%",
    height: "50%",
    width: "70%",
    backgroundColor: "#fff",
    color: "#fff",
    borderWidth: 1,
  },

});


export default MyMap;
