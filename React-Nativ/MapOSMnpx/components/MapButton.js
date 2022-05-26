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
                       this.props.func.getPoz();
                       press3 = !press3
                     }}
          >
            <Text style={styles.buttonText}>
              Мое местоположение
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
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    color: "#fff",
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

