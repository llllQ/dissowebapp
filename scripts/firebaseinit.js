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

var foodDBRef = firebase.database().ref('fooddb/');

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


function readFoodDbData(foodid){
  var data;
  foodDBRef.on('value', function(snapshot){
    data = snapshot.child(foodid).val();
  });
  console.log("value of returnable in readFooddbData function: "+data);
  return data;
}

function writeFoodInvenData(foodObj){
  console.log("Write request for food item:");
  console.log(foodObj);
  var userId = firebase.auth().currentUser.uid;
  var childId = new Date().getTime();
  firebase.database().ref('inventories/' + userId + '/' + foodObj.category + '/' + childId + '/').set({
    name: foodObj.name,
    expiry: foodObj.expiry,
    quantity: foodObj.quantity
  });
}

// function readFoodDbData(foodid ){
//   // var database = firebase.database();
//   // var userId = firebase.auth().currentUser.uid;
//   var fooddbref = firebase.database().ref('/fooddb/' + foodid);
//   var temp = fooddbref.once('value').then(function(snapshot){
//       var foodItem ={
//       name: snapshot.val().name || 'unknown',
//       quantity: snapshot.val().quantity || 'unknown',
//       expiry: snapshot.val().expiry || 'unknown',
//       category: snapshot.val().category || 'unknown'    
//     };
//     // console.log(foodItem); 
//     return foodItem;
    
//   });
//   // fooddbref.off();
//   return temp;

//   return output = temp.then(function(value){
//     console.log("val here: "+value.name);
//     return value
//   });
//   console.log("val of output: "+output);
//   return output;
    
// }