import React from 'react';
import {
  View,
  Image
  } from 'react-native';
import { googleThumbnailUrl } from '../config';
  
const config = require('../config');

class SmallPhoto extends React.Component {

  static defaultProps = {
    url: config.templateImageUrl,
  }

render(){
  return (


  <View style={{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "23%",
    marginRight: "2%"
  }}
>
    <Image source={{uri: googleThumbnailUrl+this.props.url}} style={{width: "100%", paddingTop: "56.25%", alignItems:"center"}} accessibilityLabel='Dog Image'/>
    </View>
  );
}
}

export default SmallPhoto;