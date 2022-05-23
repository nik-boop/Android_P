import React, { Component, useState } from "react";

import {
  Button, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//style={[styles.box_inR, ]}


class MarkerInf extends Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  render() {
    return (
      <ScrollView style={styles.box}>
        <View>
          <Text style={styles.title}>
            {this.props.inf.title}
          </Text>
        </View>
        <View style={styles.main_inf}>
          <View style={styles.viewPos}>
            <View style={styles.main_inf}>
              <Text style={styles.pos}> latitude: </Text>
              <Text>{this.props.inf.coords.latitude} </Text>
            </View>
            <View style={styles.main_inf}>
              <Text style={styles.pos}> longitude: </Text>
              <Text>{this.props.inf.coords.longitude} </Text>
            </View>

          </View>
          <View style={styles.desk}>
            <Text>
              Время создания: {this.props.inf.time}
            </Text>
          </View>


        </View>
        <View>
          <Text>
            Длинна маршрута: {this.props.inf.pathLen}
          </Text>
        </View>
        <View>
          <Text>
            Описание: {this.props.inf.desc}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: "0%",
    boxSizing: "content-box",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    overflow: "hidden",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "rgba(140,140,140,1)",
    borderStyle: "solid",

  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  main_inf: {
    display: "flex",
    flexDirection: "row",

  },
  viewPos: {
    flex:1,

  },
  pos: {
    fontWeight: "700",
  },
  desk:{
    flex:1.7,

  },

});

export default MarkerInf;

