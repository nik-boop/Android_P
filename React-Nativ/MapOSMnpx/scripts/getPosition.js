import { Alert, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";

class GetPosition {
constructor() {
  this.myPoz = {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  };
}
  hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (
      status === PermissionsAndroid.RESULTS.DENIED ||
      status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      ToastAndroid.show(
        "Location permission denied by user.",
        ToastAndroid.LONG,
      );
    }
    return false;
  };

  StartWatch(funcWatch, funcMyPoz) {
    this.watchID = Geolocation.watchPosition(position => {
        funcWatch(this.getWatchPositionJson(position));
        funcMyPoz(this.getMyPositionJson(position));
      },
      this.alertErr,
    );
    console.log("start");

  }

  GetMyPoz = async (funcMyPoz) => {
    Geolocation.getCurrentPosition(
      position => {
        funcMyPoz(this.getMyPositionJson(position));
      },
      this.alertErr,
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      });
    console.log("get poz");
  };

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371;
    let dLat = this.deg2rad(lat2 - lat1);
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  marksLen(coords1, coords2) {
    return this.getDistanceFromLatLonInKm(coords1.latitude, coords1.longitude, coords2.latitude, coords2.longitude);
  };

  pathLen(markers) {
    let summa = 0;
    for (let i = 0; i < markers.length - 1; i++) {
      summa += this.marksLen(markers[i].coords, (markers[i + 1].coords));
    }
    return summa;
  };


  delWatchID() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  getWatchPositionJson(position) {
    const initialPosition = JSON.stringify(position);
    let time = new Date();
    this.myPoz = {
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
    let rez = {
      distinct: "Точка пройденного маршрута",
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      time: time.toString(),
      timestamp: position.timestamp, // Отметка времени
      provider: position.provider,
      altitudeAccuracy: position.coords.altitudeAccuracy, // Точность определения высоты
      speed: position.coords.speed,
      heading: position.coords.heading, // Заголовок
      accuracy: position.coords.accuracy, // Точность
      altitude: position.coords.altitude, // Высота
      json: initialPosition, // json
    };

    return rez;

  }

  getMyPositionJson(position) {

    const initialPosition = JSON.stringify(position);

    let time = new Date();

    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timezone: "UTC",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    this.myPoz = {
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    };
    let rez = {
      title: "Текущая позиция",
      description: "Точка показывающая текущее местоположение прользователя",
      coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
      timeString: time.toString(),
      time: time.toLocaleString("ru", options),
      timestamp: position.timestamp,// Отметка времени
      provider: position.provider,
      altitudeAccuracy: position.coords.altitudeAccuracy,// Точность определения высоты
      speed: position.coords.speed,
      heading: position.coords.heading,// Заголовок
      accuracy: position.coords.accuracy, // Точность
      altitude: position.coords.altitude, // Высота
    };

    return rez;

  }

  alertErr = (error) => {
    Alert.alert("Error", JSON.stringify(error));
  };


}


export default GetPosition;
