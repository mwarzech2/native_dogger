import React from 'react';
import DogPhoto from './DogPhoto'

import {
  Text,
  StyleSheet,
  Button,
  View,
} from 'react-native';

function MyDog(props) {
  if(props.dog === undefined) {
    return null
  } else {
    return (
      <View style={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <View style={{width: "100%", height: "80%"}}>
          <DogPhoto url={props.dog.pictureUrl}/>
        </View>
        <Text style={styles.title}>{props.dog.name}</Text>
        <Text style={styles.text}>{props.dog.info}</Text>
      </View>
    );
  }
}
export default MyDog;

const styles = StyleSheet.create({
  title: {
    color: '#ffff',
    fontSize: 30,
    paddingTop: 10,
  },
  text: {
    color: '#ffff',
    fontSize: 15,
    paddingTop: 5,
  }
});