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
          <Pressable onPress={() => {
            let visible = !this.props.visible;
            this.props.func.train_list(visible)
          }}>
            <View>
              <Text style={styles.route}>
                {this.props.route} {this.props.visible ? "▲" : "▼"}
              </Text>
            </View>
          </Pressable>
          <Button title={"Win"} onPress={()=>{this.props.data.windowsNumber == 0? this.props.func.changeWindow(1): this.props.func.changeWindow(0)}}/>
          <Button title={"Save"} onPress={()=>{this.props.func.save()}}/>

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

