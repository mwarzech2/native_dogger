import React from 'react';
import {
  Image,
  View,

  } from 'react-native';
  
const config = require('../config');

class DogPhoto extends React.Component {

  static defaultProps = {
    url: undefined,
  }


render(){
  if(this.props.url === undefined) return null;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image 
        source={{uri: config.googleImageUrl+this.props.url}}
        style={{
          flex: 1,
          resizeMode: 'cover',
          borderRadius: 0,
        }}
      />
    </View>
  );
}
}

export default DogPhoto;