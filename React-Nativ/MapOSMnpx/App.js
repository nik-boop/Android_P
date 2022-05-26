import React, { Component } from "react";
import {
  Alert,
  Dimensions, Modal, Pressable,
  StyleSheet, Text, TextInput,
  ToastAndroid,
  View,
} from "react-native";


import TopLine from "./components/TopLine";
import MyMap from "./components/MyMap";

class App extends Component {
  constructor(props) {
    super(props);




    this.state = {
      train_v: false,
      windowsNumber: 0,
      modalVisible: false,
      viewSaveMarkButton: false,
      pathName: null,
      markers: []
    };

  }




  render() {
    const { modalVisible, viewSaveMarkButton } = this.state;
    return (
      <View style={styles.main}>
        <TopLine route={"Отображение геоинформации"}

        />
        <MyMap
          app={{setMarkers:(value)=>{ this.setState({setMarkers: value}); console.log(this.state.markers)}}}
          markers={this.state.markers}
          style={styles.map}
          func={{ none: null }}
          data={
            {
              windowsNumber: this.state.windowsNumber,
              mainData: this.state.data,
            }
          }
        />

      </View>
    );

  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalInput: {
  }
});

export default App;
