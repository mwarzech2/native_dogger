import React, {useState, useEffect} from 'react';
import MyDog from './MyDog'

import {
  View,
  ScrollView,
  RefreshControl,
  } from 'react-native';

  
const config = require('../config');

var data = undefined

export default function LikedDogs(props) {
  let _isMounted = false;

  //const [data, setData] = useState(undefined);
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
    getDogs().then(() => setRefreshing(false));
  }, [refreshing]);

  function renderDogs()
  {
    let dogs = []
    
    getDogs();
    if(data === undefined) return null;
    data.forEach((element,i) => {
      dogs.push(<MyDog
        key={i}
        dog={element}
        showModalMethod={props.showModalMethod}
        />)
    });
    return dogs;
  }

  function getDogs(){
    return fetch(config.hostUrl+'/likedDogs', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.status.statusType.localeCompare("SUCCESS") != 0)
      {
        console.warn(responseJson.status.errorMessege);
        return
      }
      if(_isMounted && JSON.stringify(data) !== JSON.stringify(responseJson.data)) {
        console.log("Updated!!! Old data: "+data+", New Data: "+responseJson.data)
        data = responseJson.data;
        setRefreshing(false);
      }
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  console.log("New Update!!!")
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