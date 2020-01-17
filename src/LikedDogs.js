import React, {useState, useEffect} from 'react';
import DogButton from './DogButton'
import {getLikedDogs} from './DoggerRestApi'

import {
  View,
  ScrollView,
  RefreshControl,
  } from 'react-native';

  
const config = require('../config');

var data = undefined

export default function LikedDogs(props) {
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
    getLikedDogs(setDogsData).then(() => setRefreshing(false));
  }, [refreshing]);

  function renderDogs()
  {
    let dogs = []
    
    getLikedDogs(setDogsData);
    if(data === undefined) return null;
    data.forEach((element,i) => {
      dogs.push(<DogButton
        key={i}
        dog={element}
        showModalMethod={props.showModalMethod}
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