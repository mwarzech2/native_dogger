import React from 'react';
import {
  View,
  Image
  } from 'react-native';
  

class SmallPhoto extends React.Component {

render(){
  const url = 'https://github.com/wniedzwiedz/dogger/blob/master/src/elmo.JPG?raw=true';
  return (


  <View style={{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "23%",
    marginRight: "2%"
  }}
>
    <Image source={{uri: url}} style={{width: "100%", paddingTop: "56.25%", alignItems:"center"}} accessibilityLabel='Dog Image'/>
    </View>
  );
}
}

export default SmallPhoto;