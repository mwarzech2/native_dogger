import React from 'react';
import {
  View,

  } from 'react-native';
import { render } from '@testing-library/react';
  

class DogPhoto extends React.Component {

render(){
  const url = 'https://github.com/wniedzwiedz/dogger/blob/master/src/elmo.JPG?raw=true';
  return (


  <View style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
  }}
>
    <img src={url} style={{width: "100%", alignItems:"left"}} alt='Image'  />
    </View>
  );
}
}

export default DogPhoto;