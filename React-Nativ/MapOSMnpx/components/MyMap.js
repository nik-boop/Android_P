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
import GetPosition from "../scripts/getPosition";


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
      viewMarks: true,
      newMark: null,
    };


  }


  render() {
    const { getP, markers, getInf, myPoz } = this.props;
    return (
      <View style={styles.main}>
        <MapView
          showsUserLocation={true}
          style={styles.map}
          mapType={"none"}
          onLongPress={e => this.setState( {newMark: e.nativeEvent.coordinate} )}
        >
          <UrlTile
            //urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            maximumZ={20}
            zIndex={0}
          />
          <Marker
            coordinate={myPoz.coords}
            title={"User"}
            pinColor={"green"}
            zIndex={6}
            onPress={()=>{getInf(-1)}}
          >
          </Marker>

          {this.props.viewMarks && markers.length > 0 &&
            markers.map(
              (items, index) => (
                <Marker
                  key={index}
                  coordinate={items.coords}
                  title={"Point#" + (index+1)}
                  zIndex={5}
                  onPress={()=>{getInf(index)}}
                />
              ),
            )}


          {
            this.state.newMark != null && <Marker title={"MyMark"} coordinate={this.state.newMark} />
          }

          {this.props.viewPoliline && markers.length > 1 &&
          <Polyline coordinates={markers.map(item => {
            return item.coords;
          })} zIndex={2} />}



        </MapView>




        {/*


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
        {this.state.viewPoliline && this.state.markers.length > 1 &&
            <Polyline coordinates={this.state.markers.map(item => {
              return item.coords;
            })} zIndex={2} />}

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

        */
        }

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
