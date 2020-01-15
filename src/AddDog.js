import * as React from 'react';
import { Animated, Dimensions, Button, Image,
   View, Keyboard, TextInput, UIManager, StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const { State: TextInputState } = TextInput;

export default class AddDog extends React.Component {
  state = {
    image: null,
    shift: new Animated.Value(0),
    dogInfo: undefined,
  };

  constructor(props)
  {
    super(props)

    this.dogName = undefined
  }

  componentDidMount() {
    this.getPermissionAsync();
    
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    let { image } = this.state;

    return (
      <Animated.View style={{transform: [{translateY: this.state.shift}], flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{width: "100%", height: "50%", marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
          {
            image ?
            <Image source={{ uri: image }} style={{flex: 1, resizeMode: 'cover'}} />:
            <Image source={require('../assets/icon.png')} style={{width: 200, height: 200}} />
          }
        </View>
        <Button
          title="Pick a dog image"
          onPress={this._pickImage}
        />
        <TextInput
          style={styles.textInput}
          placeholder='DOG NAME'
          maxLength={15}
          onChangeText={text => {this.dogName = text}}
        />
        <TextInput
          multiline
          numberOfLines={2}
          style={styles.infoInput}
          editable
          maxLength={50}
          placeholder='DOG INFO'
          value={this.state.dogInfo?this.state.dogInfo:''}
          onChangeText={text => {
            if(text.split('\n').length < 4)
            {
              this.setState({dogInfo: text})
            }
          }}
        />
        <View 
          style={styles.uploadButton}
        >
          <Button
            title="Upload the dog"
            onPress={()=>{}}
          />
        </View>
      </Animated.View>
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    height: 40,
    minWidth: "50%",
  }, 
  infoInput: {
    textAlignVertical: 'top',
    marginTop: 20,
    padding: 5,
    color: "#fff",
    fontSize: 15,
    borderColor: "grey",
    borderWidth: 1,
    height: 80,
    width: "70%",
  },
  uploadButton: {
    marginTop: 20,

  }
});