import React, { Component } from "react";
import {
  Alert,
  Dimensions, FlatList, Modal, Pressable,
  StyleSheet, Text, TextInput,
  ToastAndroid,
  View,
} from "react-native";

import GetPosition from "./scripts/getPosition";


import TopLine from "./components/TopLine";
import MyMap from "./components/MyMap";
import MySave from "./scripts/MySave";
import MarkerInf from "./components/MarkerInf";
import MapButton from "./components/MapButton";

class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      train_v: false,
      windowsNumber: 0,
      modalVisible: false,
      viewSaveMarkButton: false,
      pathName: null,
      markers: [],
      mySave: new MySave(),
      getP: new GetPosition(),
      myPoz: {
        title: "Текущая позиция",
        description: "Точка показывающая текущее местоположение прользователя",
        coords: { latitude: 0, longitude: 0 },
        timeString: "",
        time: "",
        timestamp: 0,// Отметка времени
        provider: 0,
        altitudeAccuracy: 0,// Точность определения высоты
        speed: 0,
        heading: 0,// Заголовок
        accuracy: 0, // Точность
        altitude: 0, // Высота
      },
      myMarks: [],
      myMark: null,
      viewWaysList: false,
      info: null,
      viewPoliline: true,
      viewMarks: true,
    };


    const { getP, markers, mySave, info, myPoz } = this.state;
    getP.hasLocationPermission()
      .then(r => {
        r ? getP.StartWatch(
          (r) => {
            let m = r
            m.pathLen = getP.pathLen(this.state.markers).toFixed(2);
            this.setState(
              {
                markers: this.state.markers.concat(m),
              });

            mySave.setJson("@markers", this.state.markers.concat(r));
          },
          (r) => {
            this.setState(
              {
                myPoz: r,
              });
          }): Alert.alert("Нет разрешения - корректная работа невозможна","Приложение не сможет определить местоположение пользователя без разрешения" )
      });

  }

  componentDidMount() {
    const { mySave, info, myPoz } = this.state;
    mySave.getJson("@markers").then(r => {
      r != null && r.length > 0 && this.setState({ markers: r });
    });

  }


  componentWillUnmount() {
    this.state.getP.delWatchID()
  }


  waysList({ item, index, separators }) {
    return (
      <View style={styles.waysListItem}>
        <Pressable onPress={() => {
          ToastAndroid.showWithGravity(
            item.name,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM);
        }}>
          <Text>
            {"#" + index + " "}{item.name}
          </Text>
        </Pressable>

      </View>
    );
  }


  render() {
    const {
      modalVisible,
      viewSaveMarkButton,
      getP, myPoz,
      markers, ways,
      viewWaysList,
      viewPoliline, viewMarks,
      mySave,
    } = this.state;
    let {info}= this.state;
    info === null && (info = myPoz)
    myPoz.pathLen = getP.pathLen(markers).toFixed(2);
    return (
      <View style={styles.main}>
        <TopLine route={"Отображение геоинформации"}
        />
        <View style={styles.myMap}>
          <MyMap
            markers={markers}
            myPoz={myPoz}
            getInf={(index) => {
              if (index == -1) {
                this.setState({ info: myPoz });
              } else {
                info = markers[index];
                info.title = "Точка маршрута номер№ " + (index + 1);
                this.setState({ info: markers[index] });
              }
            }}
            createMark={(newMark) => this.setState({ myMark: newMark })}
            viewPoliline={viewPoliline}
            viewMarks={viewMarks}


          >

          </MyMap>
        </View>

        <View style={styles.inf}>
          <MarkerInf inf={info} />
        </View>

        <View style={styles.button}>
          <MapButton
            func={
              {
                viewPoliline: (value) => {
                  this.setState({ viewPoliline: value });
                  console.log("polil")
                },
                viewMarks: (value) => {
                  this.setState({ viewMarks: value });
                },
                dellAll: () => {
                  this.setState({ markers: [] });
                  mySave.setJson("@markers", [])
                },

              }}
            data={
              {
                viewPoliline: viewPoliline,
                viewMarks: viewMarks,
              }}

          />
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
        >
          <View style={styles.centeredView}>
            <Text> Ghbd </Text>
          </View>
        </Modal>

        {viewWaysList && <FlatList style={styles.flatList} data={ways} renderItem={this.waysList} />}


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
  myMap: {
    flex: 4,

  },
  inf: {
    flex: 1,
    //padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
  },
  flatList: {
    position: "absolute",
    top: 40,
    backgroundColor: "#fff",
    width: "30%",
    height: "30%",

  },
  waysListItem: {
    borderBottomWidth: 1,
    padding: 5,

  },
  modalView: {},
  button: {
    flex: 0.7,
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
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalInput: {},
});

export default App;
