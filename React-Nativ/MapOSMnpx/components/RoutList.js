import React, { Component, useState } from "react";

import {
  Button, Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
} from "react-native";

//style={[styles.box_inR, ]}


class RoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  render() {
    return (
      this.props.visibal && (
        <View style={styles.box}>
          <ScrollView style={styles.scrollList}>
            {this.props.routes.map(
              (item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                  this.props.func(index, item);
                }}>
                  <View style={styles.listComp}>
                    <Text numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                </Pressable>
              ),
            )}
          </ScrollView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    top: 40,
    width: "40%",
    height: "20%",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "rgb(255,255,255)",


  },
  route: {
    textAlignVertical: "center",
    color: "rgb(250,250,250, 0)",
  },
  scrollList: {

    color: "rgba(256,256,256,0)",
    //width: "40%",
    //height: "20%",

  },
  listComp: {
    //borderLeftWidth: 2,
    //borderRightWidth: 2,
    //borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "rgba(140,140,140,1)",
    paddingTop: 7,
    paddingRight: 7,
    paddingBottom: 7,
    paddingLeft: 7,

  },

});

export default RoutList;
