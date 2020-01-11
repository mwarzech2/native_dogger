import React from 'react';
import './App.css';
import DogPhoto from './DogPhoto'

import {
  Button,
  View,
  } from 'react-native';


  function Dog(props) {
    return (
    <div className="Dog" style={props.style}>
        <header className="Dogs-header">
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: 10,
                marginLeft: 10
                

            }}>

            <View style={{width: "55%", alignItems:"left", marginLeft: "5%"}}>

            <DogPhoto />
            </View>
            <View style={{flexDirection: "column",width: "30%", alignItems:"center", marginRight: "5%"}}>
            <h1>IMIĘ</h1>
            <p>
            a        </p>

            <View style={[{ width: "80%",  margin: "10%" }]}>

            <Button 
            title="LIKE" 
            color='#fd0006'
            />
            </View>

            <View style={[{ width: "80%", margin: "10%" }]}>
            <Button 
            title="NEXT" 
            color='#009b95'
            />

            </View>

            </View></View>


      </header>
    </div>
    );}
    export default Dog;