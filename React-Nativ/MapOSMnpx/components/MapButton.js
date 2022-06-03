import React, { Component, useState } from "react";

import {
  Button,
  Pressable,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from "react-native";

class TopLine extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    let press1 = false
    let press2 = false
    let press3 = false
    return (
      <View style={styles.buttonbar}>
        <View style={styles.button}>
          <TouchableOpacity style={press1? styles.buttonPresOn: styles.buttonPresOff}
                     onPress={() => {
                       this.props.func.viewPoliline(!this.props.data.viewPoliline);
                       press1 = !press1
                     }}
          >
            <Text style={styles.buttonText}>
              {!this.props.data.viewPoliline ? "Показать маршрут" : "Скрыть маршрут"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={press2? styles.buttonPresOn: styles.buttonPresOff}
                     onPress={() => {
                       this.props.func.viewMarks(!this.props.data.viewMarks);
                       press2 = !press2
                     }}>
            <Text style={styles.buttonText}>
              {!this.props.data.viewMarks ? "Показать маркеры" : "Скрыть маркеры"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button} >
          <TouchableOpacity style={press3? styles.buttonPresOn: styles.buttonPresOff}
                     onPress={() => {
                       this.props.func.dellAll();
                       press3 = !press3
                     }}
          >
            <Text style={styles.buttonText}>
              Удалить все пометки
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {},
  buttonbar: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth:1
  },
  button: {
    backgroundColor: "#2191eb",
    borderRadius: 2,
    flex: 1,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    color: "#ffffff",
    width: "100%",
    height: "100%",
  },
  buttonPresOn: {
    flex: 1,
  },
  buttonPresOff: {
    flex: 1,
  },
  buttonPres: {
    color: "rgba(23,31,188,0.74)",
    flex: 1,
  },
});

export default TopLine;

