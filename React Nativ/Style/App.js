import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';

import Picture from './components/Picture';

export default function App() {
  return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Журнал Bright
        </Text>
        <Card style={{borderWidth: 2}}>
          <View style={styles.news}>
            <Text style={styles.blue}>Новости</Text>
          </View>
          <Picture/>
          <View style={styles.buttonContainer}>
            <Text style={styles.next}>
              ЧИТАТЬ ДАЛЕЕ
            </Text>
          </View>
        </Card>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
    padding: 1,
  },
  news: {
    marginTop: 10,
    marginLeft: 40
  },
  blue: {
    color: 'blue',
    fontSize: 16,
  },
  next: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize:20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    elevation: 10,
    marginBottom: 20,
    marginHorizontal: 60,
    backgroundColor: '#AAAFFF',
    borderRadius: 10,
    padding: 15,
  }
});
