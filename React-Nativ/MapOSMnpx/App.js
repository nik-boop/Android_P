import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";



import MarkList from "./components/MarkList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TopLine from "./components/TopLine";
import RoutList from "./components/RoutList";
import MyMap from "./components/MyMap";

class App extends Component {
  constructor(props) {
    super(props);

    this.storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    };
    this.storeDataJs = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    this.getData = async (key) => {
      try {
        return await AsyncStorage.getItem(key);
      } catch (e) {
        console.log(e);
      }
    };
    this.getDataJs = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };
    this.removeValue = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        console.log(e);
      }
    };
    this.getAllKeys = async () => {
      let keys = [];
      try {
        keys = await AsyncStorage.getAllKeys();
      } catch (e) {
      }
      console.log(keys);
    };
    let Path = {
      name: "Новый путь",
      myMarks: [{name: 'маркер 1', coords: {latitude: 10, longitude: 3}, desc: 'Тут опиcание'},
        {name: 'маркер 2', coords: {latitude: 12, longitude: 4}, desc: 'Тут опиcание'},],
      pathMarks: [],
    };
    this.getDataJs("@nullPath").then(r => {
      r == null ? this.storeDataJs("@nullPath", Path) : null;
    });
    let ways = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }, { name: "6" }]
    this.storeDataJs("@Ways", ways);

    this.getAllKeys();


    this.state = {
      train_v: false,
      data: Path,
      ways: ways,
      windowsNumber: 0,
    };


    this.getData("@lastKey").then(r => {
      console.log(r);
    });
    console.log(this.state.data);
    console.log("ways: " + this.state.ways)
  }

  componentDidMount() {
    this.getDataJs("@Ways").then(r => {
      if (r == null) {
        console.log("res new : " + r)
        this.storeDataJs("@Ways", [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }, { name: "6" }]);
        this.setState({ways: r})
      } else {
        if (this.state.ways != r){
          this.setState({ways: r})
          console.log("res: " + r)
        }
      }
    });
    console.log("ways: " + this.state.ways.map((item)=>{item.name}))

  }

  render() {
    return (
      <View style={styles.main}>
        <TopLine route={"Маршрут 1"}
                 pathKey={this.state.keyPath}
                 func={
                   {
                     train_list: (value) => {
                       this.setState({ train_v: value });
                     },
                     onPressPath: (pathKey) => {
                       ToastAndroid.showWithGravity(
                         pathKey,
                         ToastAndroid.SHORT,
                         ToastAndroid.CENTER,
                       );
                     },
                     changeWindow: (number) => {
                       this.setState({ windowsNumber: number });
                     },
                     changeNamePath: (name) => {
                       this.setState({ data: this.state.data.name = name });
                     },
                   }
                 }
                 visible={this.state.train_v}
                 data={
                   {
                     windowsNumber: this.state.windowsNumber,
                     mainData: this.state.data,
                   }
                 }
        >
        </TopLine>
        <MyMap
          style={styles.map}
          func={{ none: null }}
          data={
            {
              windowsNumber: this.state.windowsNumber,
              mainData: this.state.data,
            }
          }
        >
        </MyMap>

        {
          this.state.windowsNumber == 1 &&
            <MarkList
              list={this.state.data.myMarks}>
            </MarkList>
        }
        {/*
        <MarkList
          list={}>
        </MarkList>
        */}


        <RoutList
          func={
            (index, item) => {
              ToastAndroid.showWithGravity(
                "Нажато на №" + (index + 1),
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            }}
          visibal={this.state.train_v}
          routes={this.state.ways}
        >
        </RoutList>

      </View>


      /*
      <MarkList list={[
        {name: 'маркер 1', coords: {latitude: 10, longitude: 3}, desc: 'Тут опиcание'},
        {name: 'маркер 2', coords: {latitude: 12, longitude: 4}, desc: 'Тут опиcание'},
        {name: 'маркер 3', coords: {latitude: 14, longitude: 5}, desc: 'Тут опиcание'},
        {name: 'маркер 4', coords: {latitude: 16, longitude: 6}, desc: 'Тут опиcание'},
        {name: 'маркер 5', coords: {latitude: 18, longitude: 7}, desc: 'Тут опиcание'},
        {name: 'маркер 6', coords: {latitude: 20, longitude: 8}, desc: 'Тут опиcание'},
        {name: 'маркер 7', coords: {latitude: 22, longitude: 9}, desc: 'Тут опиcание'},
        {name: 'маркер 8', coords: {latitude: 24, longitude: 10}, desc: 'Тут опиcание'},
        {name: 'маркер 9', coords: {latitude: 26, longitude: 11}, desc: 'Тут опиcание'},
        {name: 'маркер 10', coords: {latitude: 28, longitude: 12}, desc: 'Тут опиcание'},
        {name: 'маркер 11', coords: {latitude: 30, longitude: 13}, desc: 'Тут опиcание'},
        {name: 'маркер 12', coords: {latitude: 32, longitude: 14}, desc: 'Тут опиcание'},
        {name: 'маркер 13', coords: {latitude: 34, longitude: 15}, desc: 'Тут опиcание'},
        {name: 'маркер 14', coords: {latitude: 36, longitude: 16}, desc: 'Тут опиcание'},
        {name: 'маркер 15', coords: {latitude: 38, longitude: 17}, desc: 'Тут опиcание'},
        {name: 'маркер 16', coords: {latitude: 40, longitude: 18}, desc: 'Тут опиcание'},
        {name: 'маркер 17', coords: {latitude: 42, longitude: 19}, desc: 'Тут опиcание'},
        {name: 'маркер 18', coords: {latitude: 44, longitude: 20}, desc: 'Тут опиcание'},
        {name: 'маркер 19', coords: {latitude: 46, longitude: 21}, desc: 'Тут опиcание'},
        {name: 'маркер 20', coords: {latitude: 48, longitude: 22}, desc: 'Тут опиcание'},
        {name: 'маркер 21', coords: {latitude: 50, longitude: 23}, desc: 'Тут опиcание'},
        {name: 'маркер 22', coords: {latitude: 52, longitude: 24}, desc: 'Тут опиcание'},
        {name: 'маркер 23', coords: {latitude: 54, longitude: 25}, desc: 'Тут опиcание'},
        {name: 'маркер 24', coords: {latitude: 56, longitude: 26}, desc: 'Тут опиcание'},
        {name: 'маркер 25', coords: {latitude: 58, longitude: 27}, desc: 'Тут опиcание'},
        ]}>
      </MarkList>
        */
    );

  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default App;
