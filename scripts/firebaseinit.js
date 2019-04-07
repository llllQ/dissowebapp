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

Date.dateDiff = function(fromdate, todate) {	
  var diff = todate - fromdate;	
  var divideBy = 86400000
  
  return Math.floor( diff/divideBy);
}

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
    const ext = data.expiry;
    console.log("*******");
    console.log(data);
    console.log("*******");
    var tempDate = new Date();
    console.log(tempDate);
    tempDate.setDate(tempDate.getDate() + ext);
    console.log('&&&&&&');
    console.log(tempDate);
    console.log('&&&&&&');  
    data.expiry = tempDate.getDate()+"/"+(tempDate.getMonth()+1)+"/"+(tempDate.getYear()+1900);
  });
  console.log("value of returnable in readFooddbData function: "+data);
  return data;
}



function writeFoodDbData(foodObj, foodid){
  console.log('Write Request to Food DB for Food Item: ');
  console.log(foodObj);
  console.log(foodid);
  var daysToExpiry;
  var dateFormatted
  const today = new Date();
  dateFormatted = (foodObj.expiry.split("/")).map(Number);
  dateFormatted = new Date(dateFormatted[2], (dateFormatted[1]-1), dateFormatted[0]);
  daysToExpiry = Date.dateDiff(today, dateFormatted);
 
  firebase.database().ref('fooddb/' + foodid + '/').set({
    name: foodObj.name.toUpperCase(),
    expiry: daysToExpiry,
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
function writeFoodInvenData(foodObject){
  console.log("Write request to Personal Inventory for food item:");
  console.log(foodObject);
  var userId = firebase.auth().currentUser.uid;
  var childId = new Date().getTime();
  firebase.database().ref('inventories/' + userId + '/' + foodObject.category + '/' + childId + '/').set({
    name: foodObject.name.toUpperCase(),
    expiry: foodObject.expiry,
    quantity: foodObject.quantity
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
