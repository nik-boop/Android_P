import Constants from 'expo-constants';
import {Button, Dimensions, Text, View} from 'react-native';

const YourApp = () => {
  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: Constants.statusBarHeight}}>
        <Text>
          Hello world!
        </Text>
        <View style={{marginVertical: 160, borderWidth: 3, width: Dimensions.get('window').width}}/>
        <Button
            title={'press me!'}/>
      </View>
  )
}

export default YourApp;
