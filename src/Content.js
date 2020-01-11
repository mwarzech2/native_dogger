import React from 'react';
  import {
    View,
  } from 'react-native';
  

class Content extends React.Component {

  static defaultProps = {
    tab: 0
  }

  constructor(props)
  {
    super(props)
    this.renderChild = this.renderChild.bind(this);
  }

  renderChild()
  {
    console.log(this.props.tab)
    return this.props.children[this.props.tab]
  }

  render(){
  
  return (
      <View ref="content" style={this.props.style}>
        {this.renderChild()}
      </View>
    );
  }
}

export default Content;