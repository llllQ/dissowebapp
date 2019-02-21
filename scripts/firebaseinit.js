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

/**
 * This function is called when a new user is registered. It creates an entry for them in the user and inventory tables in the firebase database.
 * @param  {String} userId current user's id String used to create a flat hierarchy noSQL database entry in firebase
 * @param  {String} displayname registration field stored in the user table on firebase
 * @param  {String} email registration field stored in the user table on firebase
 */
function writeUserData(userId, displayname, email) {
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