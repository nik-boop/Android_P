import * as React from 'react';
import MapView, {Callout, Circle, Marker, UrlTile} from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default function App() {

    return (
        <View style={styles.container}>
            <Text>
                Maps
            </Text>
            <MapView
                style={styles.map}
            >
                <MapView.UrlTile
                    urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.9
    }

});
