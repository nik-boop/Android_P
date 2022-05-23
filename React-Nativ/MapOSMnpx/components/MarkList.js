import React, { Component, useState } from "react";

import {
  Button, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

//style={[styles.box_inR, ]}


class MarkList extends Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  render() {
    return (
      <ScrollView style={styles.list}>
        {this.props.list.map(
          (item, index) => (
            <Pressable onPress={()=>(alert('Нажато на №'+(index+1)))} key={index}>
              <View style={styles.box}>
                <View style={[styles.row_box, styles.label]}>
                  <Text style={[styles.box_inR, styles.name]}>
                    {index + 1}# {item.name}
                  </Text>
                  <Text style={[styles.box_inR, styles.coords]}>
                    latitude: {item.coords.latitude.toFixed(3)} longitude: {item.coords.longitude.toFixed(3)}
                  </Text>
                </View>
                <View style={[styles.row_box, styles.description]}>
                  <Text numberOfLines={1} style={[styles.description_text]}>
                    Описание: {item.desc}
                  </Text>
                </View>
              </View>
            </Pressable>
          ),
        )}

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  list: {
    position: "absolute",
    top: 40,
    height: "100%",
    backgroundColor: "rgb(255,255,255)",
  },
  box: {
    height: 60,
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
  row_box: {
    display: "flex",
    flexDirection: "row",
  },
  box_inR: {
    flex: 1,

  },
  label: {},
  name: {},
  coords: {
    textAlign: "right",
    flex: 2,

  },
  description: {},
  description_inf: {},
  description_text: {
    textAlignVertical: "center",
    width: "100%",

  },

});

export default MarkList;

