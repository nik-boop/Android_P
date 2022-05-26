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

  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.box}>

            <View>
              <Text style={styles.route}>
                {this.props.route}
              </Text>
            </View>


        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: 40,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxSizing: "content-box",
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    overflow: "hidden",
    backgroundColor: "rgb(173,1,217)",
    borderStyle: "solid",
  },
  route: {
    textAlignVertical: "center",
    color: "rgb(250,250,250)",
  },
});

export default TopLine;

