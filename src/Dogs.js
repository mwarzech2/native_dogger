import React from 'react';
import More from './More'
import FivePhotos from './FivePhotos'

import {
  Button,
  View,
  } from 'react-native';


  function Dogs(props) {
    return (
      <View style={props.style}>
        <View style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",

              
            }}>

        <FivePhotos/>
        <FivePhotos/>
        <More/>

        </View>
      </View>
    );}
    export default Dogs;