// Initialize Firebase
var config = {
    apiKey: "AIzaSyAitFMM7mywp1BwUvRbpbvdiNFS3v2Bzcc",
    authDomain: "disso-70-100.firebaseapp.com",
    databaseURL: "https://disso-70-100.firebaseio.com",
    projectId: "disso-70-100",
    storageBucket: "disso-70-100.appspot.com",
    messagingSenderId: "1083959403368"
  };
  firebase.initializeApp(config);
var database = firebase.database();

function writeUserData(userId, displayname, email) {
  // console.log("here");
  firebase.database().ref('users/' + userId).set({
    name: displayname,
    email: email
  });
  firebase.database().ref('inventories/' + userId).set({
    fridge: "a",
    freezer: "a",
    pantry: "a"
  });
}