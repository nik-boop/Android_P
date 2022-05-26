import { Alert, Modal, Pressable, Text, View } from "react-native";

<Modal

  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    this.setModalVisible(!modalVisible);
  }}
>
  <View >
    <View >
      <Text >Hello World!</Text>
      <Pressable

        onPress={() => this.setModalVisible(!modalVisible)}
      >
        <Text >Hide Modal</Text>
      </Pressable>
    </View>
  </View>
</Modal>
