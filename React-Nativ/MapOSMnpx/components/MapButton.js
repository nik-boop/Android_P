import React, { Component, useState } from "react";

import {
  Button,
  Pressable,
  StyleSheet,
  Text,
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
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  main: {
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
  buttonbar: {
    width: "100%",
    flexDirection: "row",
  },
});

export default TopLine;

