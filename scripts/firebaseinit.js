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

/**
 * This function takes a barcode id and retrieves the relevant food JSON object
 * @param  {} foodid where foodid is the number encoded in the 1-dimensional barcode that has just been scanned by the user.
 * @returns data object representing the item of food that has just had it's barcode scanned.
 */
function readFoodDbData(foodid){
  var data;
  foodDBRef.on('value', function(snapshot){
    data = snapshot.child(foodid).val();
  });
  console.log("value of returnable in readFooddbData function: "+data);
  return data;
}

function writeFoodDbData(foodObj, foodid){
  console.log('Write Request to Food DB for Food Item: ');
  console.log(foodObj);
  console.log(foodid);
  firebase.database().ref('fooddb/' + foodid + '/').set({
    name: foodObj.name,
    expiry: foodObj.expiry,
    quantity: foodObj.quantity,
    category: foodObj.category
  }, function(error) {
    console.log(error);
    if (error) {
      // The write failed...
      console.log('Err writing to food db');
      return false;
    } else {
      // Data saved successfully!
      return true;
    }
  });
  return true;
}

/**
 * @param  {} foodObj
 */
function writeFoodInvenData(foodObj){
  console.log("Write request to Personal Inventory for food item:");
  console.log(foodObj);
  var userId = firebase.auth().currentUser.uid;
  var childId = new Date().getTime();
  firebase.database().ref('inventories/' + userId + '/' + foodObj.category + '/' + childId + '/').set({
    name: foodObj.name,
    expiry: foodObj.expiry,
    quantity: foodObj.quantity
  }, function(error) {
    console.log(error);
    if (error) {
      // The write failed...
      console.log('err writing to food inventory');
      return false;
    } else {
      // Data saved successfully!
      return true;
    }
  });
  return true;
}
