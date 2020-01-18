const config = require('../config');


function getResponse(response, onFailureMethod=()=>{}) {
  if(response.status === 200) {
    return response.json()
  }
  console.warn("Error status "+response.status);
  console.warn(response);
  onFailureMethod();
  return null
}

function checkResponseJson(responseJson) {
  if(!responseJson) return false
  if(responseJson.status.statusType.localeCompare("SUCCESS") != 0)
  {
    console.warn(responseJson.status.errorMessege);
    return false
  }
  return true
}

function handleResponse(fetchMethod, onSuccessMethod, onFailureMethod=()=>{}) {
  return fetchMethod.then(getResponse)
    .then((responseJson) => {
      if(!checkResponseJson(responseJson)){
        onFailureMethod()
        return
      }
      onSuccessMethod(responseJson.data)
    })
    .catch((error) =>{
        console.error(error);
        onFailureMethod()
    })
}

export function getRequest(endPoint, setDataMethod){
  return handleResponse(fetch(config.hostUrl+endPoint, {
      method: 'GET'
  }), setDataMethod)
}

export function getLikedDogs(setDataMethod){
  return getRequest('/likedDogs', setDataMethod)
}

export function getRandomDogs(dogsCountLimit, setDataMethod) {
  return getRequest('/randomDogs?limit='+dogsCountLimit, setDataMethod)
}

export function likeDogRequest(dogId) {
  return handleResponse(
    fetch(config.hostUrl+'/likeDog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "dogId="+dogId,
    }), ()=>{}
  )
}

export function deleteLikeRequest(dogId, onSuccessMethod){
  return handleResponse(fetch(config.hostUrl+'/unlikeDog', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: "dogId="+dogId,
  }), onSuccessMethod)
}

export function uploadDogRequest(dog, onSuccessMethod, onFailureMethod=()=>{}) {
  let localUri = dog.image
  let filename = 'dog.jpg'
  let type = 'image/jpeg'
  
  let body = new FormData();
  body.append('dogName', dog.name);
  body.append('dogInfo', dog.info);
  body.append('dogImage', {
    uri: localUri,
    type: type, // or photo.type
    name: filename,
  });
  console.log(body)

  let serverURL = config.hostUrl+"/uploadDog"
  //var xhr = new XMLHttpRequest();
  //xhr.open('POST', serverURL);
  //xhr.send(body);

  return handleResponse(
    fetch(serverURL, {
      method: 'post',
      body: body
    }), onSuccessMethod, onFailureMethod)
}
