import React from 'react';
import DogPhoto from './DogPhoto'
import {deleteLikeRequest} from '../DoggerRestApi'

import {
  Text,
  StyleSheet,
  Button,
  View,
} from 'react-native';

function LikedDog(props) {
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
        <View style={[{position: "absolute", bottom: 10, right: 10}]}>
          <Button 
            title="UNLIKE" 
            color='#ff3452'
            onPress={()=>{
              deleteLikeRequest(props.dog.id, ()=>{})
              props.closeModalMethod()
            }}
          />
        </View>
      </View>
    );
  }
}
export default LikedDog;

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