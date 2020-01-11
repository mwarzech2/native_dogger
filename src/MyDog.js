import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  } from 'react-native';
import  { TouchableRipple } from 'react-native-paper';
import SmallPhoto from './SmallPhoto'
  

class MyDog extends React.Component {

  static defaultProps = {
    url: 'https://github.com/wniedzwiedz/dogger/blob/master/src/elmo.JPG?raw=true',
    dogName: 'Dog name',
    info: 'Dog info'
  }

render(){
  return (
    <TouchableRipple onPress={()=>{}} 
      rippleColor="#ffffff60"
      style={styles.container}>
      <View style={{width: "100%", marginLeft: "10%", flexDirection: "row"}}>
        <SmallPhoto url={this.props.url} />
        <View style={{width: "50%", marginLeft: "5%", marginTop: "2%", flexDirection: "column"}}>
  <Text h1 style={styles.title}>{this.props.dogName}</Text>
  <Text style={styles.text}>{this.props.info}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
}
}


const styles = StyleSheet.create({
  title: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    paddingTop: 5,
    color: '#ffff',
  },
  container: {
    width: "95%",
    margin: 5,
    padding: 5,
  }
});

export default MyDog;