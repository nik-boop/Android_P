import AsyncStorage from "@react-native-async-storage/async-storage";

class MySave {


  getValue = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  getJson = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  setValue = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  setJson = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (e) {
      console.log(JSON.stringify(e));
    }
    console.log(keys);
  };

}

export default MySave
