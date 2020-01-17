const config = require('../config');


function getResponse(response) {
  if(response.status === 200) {
    return response.json()
  }
  console.warn("Error status "+response.status);
  console.warn(response);
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

function handleResponse(fetchMethod, onSuccessMethod) {
  return fetchMethod.then(getResponse)
    .then((responseJson) => {
      if(!checkResponseJson(responseJson)) return
      onSuccessMethod(responseJson.data)
    })
    .catch((error) =>{
        console.error(error);
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

export function uploadDogRequest(dog, onSuccessMethod) {
  let data = new FormData();
  data.append('dogName', dog.name);
  data.append('dogInfo', dog.info);
  data.append('dogImage', {
    uri: dog.image,
    type: 'image/jpeg', // or photo.type
    name: dog.name+"Photo.jpg",
  });
  console.log(data)
  return handleResponse(
    fetch(config.hostUrl+"/uploadDog", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data
    }), onSuccessMethod)
}
