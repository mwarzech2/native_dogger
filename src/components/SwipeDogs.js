import React from 'react';
import SwipeView from './SwipeView';
import {getRandomDogs, likeDogRequest} from '../DoggerRestApi'
import { enableExpoCliLogging } from 'expo/build/logs/Logs';

var Elements = []

function inElementsArray(itemId)
{
  for(var i=0; i<Elements.length;i++)
  {
    if(Elements[i].id === itemId) {
      return true
    }
  }
  return false
}

export default class SwipeDogs extends React.Component {
  
  loadDogs() {
    const maxDogsPerLoad = 5
    getRandomDogs(maxDogsPerLoad,
      (responseData) => {
        if(this._isMounted && responseData)
        {
          Elements = Elements.concat(responseData.filter((item) => !inElementsArray(item.id)));
          this.forceUpdate()
        }
      }
    );
  }

  checkElements(swipeView)
  {
    if(swipeView.state.currentIndex+2>=Elements.length)
    {
      Elements.splice(0, swipeView.state.currentIndex);
      this.loadDogs()
      swipeView.setState({currentIndex: 0});
      this.forceUpdate()
    }
  }

  onLike(swipeView)
  {
    likeDogRequest(Elements[swipeView.state.currentIndex-1].id);
    this.checkElements(swipeView)
  }

  onDislike(swipeView)
  {
    this.checkElements(swipeView)
  }

  constructor(props) {
    super(props)
    this.loadDogs = this.loadDogs.bind(this)
    this.onLike = this.onLike.bind(this)
    this.onDislike = this.onDislike.bind(this)
    this.checkElements = this.checkElements.bind(this)
    this._isMounted = false;
  }

  componentDidMount() {
    if(Elements.length <= 0)
    {
      this.loadDogs();
    }
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
      return (
          <SwipeView onLike={this.onLike} onDislike={this.onDislike} Elements={Elements}/>
      )
  }
}
