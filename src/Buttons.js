import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-elements';

export default function Buttons() {
    
    return (
    <View style={styles.menu}>
      <View style={styles.menuItem}>
       <Button title="View Dogs" type="clear" color="#ffffff"/>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.text}>Liked Dogs</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.text}>Add Dog</Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  menuItem: {
    flex: 1,
    backgroundColor: '#666666',
    margin: 1,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  }
});