import React, {useState, useEffect} from 'react';
import DogButton from './DogButton'
import MyDog from './MyDog';
import {getMyDogs} from '../DoggerRestApi'
import { IconButton } from 'react-native-paper';

import {
  View,
  ScrollView,
  RefreshControl,
  } from 'react-native';
import AddDog from './AddDog';

  
const config = require('../config');

var data = undefined

export default function MyDogs(props) {
  let _isMounted = false;

  const [refreshing, setRefreshing] = React.useState(false);
  const [shouldRefresh, setShouldRefresh] = React.useState(false);
  
  useEffect(() => {
    _isMounted = true;
    return () => {
      _isMounted = false;
    }
  }, [_isMounted]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyDogs(setDogsData).then(() => setRefreshing(false));
  }, [refreshing]);

  function renderDogs()
  {
    let dogs = []
    
    getMyDogs(setDogsData);
    if(data === undefined) return null;
    data.forEach((element,i) => {
      let view = <MyDog dog={element} closeModalMethod={props.closeModalMethod}/>
      dogs.push(<DogButton
        key={i}
        dog={element}
        showModalMethod={()=>{props.showModalMethod(view)}}
        closeModalMethod={props.closeModalMethod}
        />)
    });
    return dogs;
  }

  function setDogsData(responseData){
    if(_isMounted && JSON.stringify(data) !== JSON.stringify(responseData)) {
      data = responseData;
      setRefreshing(false);
    }
  }

  return (
    <View style={props.style}>
      <View style={{position: "absolute", bottom: 30, right: 30, zIndex: 5,
                    width:60, height:60, borderRadius:30, backgroundColor:'#2196f3',
                    alignItems: 'center', justifyContent: 'center'}}>
        <IconButton
          icon="plus"
          type='font-awesome'
          color="#ffffff"
          size={40}
          onPress={() => {
            let view = <AddDog closeModalMethod={props.closeModalMethod}/>
            props.showModalMethod(view)
          }}
        />
      </View>
      <ScrollView style={{
        flexDirection: "column",
        height:"100%",
        width:"100%"
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderDogs()}
      </ScrollView>
    </View>
  );
}