import React, {Component} from 'react';
import LikedDogs from './src/LikedDogs';
import LikedDog from './src/LikedDog';
import AddDog from './src/AddDog';
import SwipeView from './src/SwipeView';
import { TouchableHighlight, StyleSheet, Dimensions, View, Platform, Text} from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements'
import { IconButton } from 'react-native-paper';


const getTabBarIcon = (props) => {

  const {route} = props

  switch(route.key)
  {
    case 'v1':
      return <Icon name='heart' type='font-awesome' color='#fff'/>
    case 'v2':
      return <Icon name='paw' type='font-awesome' color='#fff'/>
    case 'v3':
      return <Icon name='plus' type='font-awesome' color='#fff'/>
  }
  return null
}


const AddDogTab = () => (
  <AddDog />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function App() {

  const Modal = Platform.select({
    ios: () => require('react-native').Modal,
    android: () => require('react-native').Modal,
    web: () => require('modal-react-native-web'),
  })();
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'v1', title: 'Liked Dogs' },
    { key: 'v2', title: 'View Dogs' },
    { key: 'v3', title: 'Add dog' },
  ]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalDog, setModalDog] = React.useState(undefined);

  if(Platform.OS === "web"){
    Modal.setAppElement('body')
  }
  

  const ViewDogs = () => (
    <View style={{flex: 1}}>
      <SwipeView />
    </View>
  );
  
  const LikedDogsTab = () => (
    <LikedDogs showModalMethod={openModalDog}/>
  );

  const renderScene = SceneMap({
    v1: LikedDogsTab,
    v2: ViewDogs,
    v3: AddDogTab,
  });

  function openModalDog(dog)
  {
    setModalDog(dog);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Modal animationType = {"slide"}
          transparent = {false}
          visible = {modalVisible}
          onRequestClose = {() => { console.log("Modal has been closed.") } }
        >
          
        <View style = {styles.modal}>
          <LikedDog dog={modalDog} closeModalMethod={()=>{setModalVisible(false)}}/>
          <View style={{position: "absolute", top: 5, left: 5, zIndex: 5}}>
            <IconButton
              icon="arrow-left"
              type='font-awesome'
              color="#ffffff"
              size={35}
              onPress={() => {setModalVisible(!openModalDog)}}
            />
          </View>
        </View>
      </Modal>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={(props) => {
          return(<TabBar
              {...props}
              renderIcon={
                  props => getTabBarIcon(props)
              }
              labelStyle={styles.labelStyle}
              scrollEnabled={false}
              indicatorStyle={{
                backgroundColor: 'white',
              }}
          />)
            }
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'android' || Platform.OS === 'ios') ? 35 : 0,
    flexDirection: 'column',
    backgroundColor: '#282c34',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
  },
  labelStyle: {
    display: 'flex', //(Platform.OS === 'android' || Platform.OS === 'ios') ? 'none' : 'flex',
    height: 'auto', //(Platform.OS === 'android' || Platform.OS === 'ios') ? 0 : 'auto',
    flexDirection: 'column',
  },
  modal: {
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#282c34',
     padding: 0,
  },
  text: {
     color: '#3f2949',
     marginTop: 10
  }
});