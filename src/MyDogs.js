import React, {useState} from 'react';
import MyDog from './MyDog'

import {
  View,
  ScrollView,
  } from 'react-native';


export default function MyDogs(props) {

  const [data, setData] = useState(undefined);

  function renderDogs()
  {
    let dogs = []
    
    if(data === undefined)
    {
      getDogs();
      if(data === undefined) return null;
    }
    data.data.forEach(element => {
      dogs.push(<MyDog
        url={"https://drive.google.com/thumbnail?id="+element.pictureUrl} 
        dogName={element.name}
        />)
    });
    return dogs;
  }

  function getDogs(){
    return fetch('https://lit-falls-41523.herokuapp.com/dogs', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setData({
        data: responseJson.data,
      });
  
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  return (
    <View style={props.style}>
        <ScrollView style={{
          flexDirection: "column",
          width:"100%"
    
          }}>

    {renderDogs()}

    </ScrollView>
  </View>
  );
}