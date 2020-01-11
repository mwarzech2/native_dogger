import React from 'react';
import MyDog from './MyDog'

import {
  Button,
  View,
  ScrollView
  } from 'react-native';


export default function MyDogs(props) {
    return (
      <View style={props.style}>
          <ScrollView style={{
            flexDirection: "column",
            width:"100%"
      
            }}>

    <MyDog/>
    <MyDog/>
    <MyDog/>

    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>
    <MyDog/>



    </ScrollView>
  </View>
    );}