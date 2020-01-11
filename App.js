import React, {Component} from 'react';
import Buttons from './src/Buttons';
import MyDogs from './src/MyDogs';
import SwipeView from './src/SwipeView';
import { StyleSheet, Dimensions, View, Platform} from 'react-native';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements'

const ViewDogs = () => (
  <SwipeView/>
);

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

const LikedDogs = () => (
  <MyDogs/>
);

const AddDog = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

export default function App() {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'v1', title: 'Liked Dogs' },
    { key: 'v2', title: 'View Dogs' },
    { key: 'v3', title: 'Add dog' },
  ]);

  const renderScene = SceneMap({
    v1: LikedDogs,
    v2: ViewDogs,
    v3: AddDog,
  });

  return (
    <View style={styles.container}>
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
    display: 'flex', //(Platform.OS === 'android' || Platform.OS === 'ios') ? 'none' : 'block',
    height: 'auto', //(Platform.OS === 'android' || Platform.OS === 'ios') ? 0 : 'auto',
    flexDirection: 'column',
  }
});
/*
  function setBody(newBody) {
    this.setState({ tab: newBody });
  }

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Buttons setBodyMethod={setBody}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Hello elo</Text>
      </View>
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
  menu: {
    flex: 1,
  },
  content: {
    flex: 11,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: '#fff',
  }
});*/