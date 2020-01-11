import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
  } from 'react-native';
import SmallPhoto from './SmallPhoto'
  

class MyDog extends React.Component {

render(){
  
  return (
    <TouchableHighlight onPress={()=>{}} underlayColor="#ffffff60" style={styles.container}>
      <View style={{width: "100%", marginLeft: "10%", flexDirection: "row"}}>
        <SmallPhoto />
        <View style={{width: "50%", marginLeft: "5%", marginTop: "2%", flexDirection: "column"}}>
        <Text h1 style={styles.text}>IMIĘ</Text>
        <Text style={styles.text}>info info info info info info info info info info info  </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
}


const styles = StyleSheet.create({
  text: {
    color: '#ffff',
  },
  container: {
    width: "95%",
    margin: 5,
    padding: 5,
  }
});

export default MyDog;