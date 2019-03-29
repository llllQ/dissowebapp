const appfunctions = {   
  /**
   * this function 
   */

  minimiseHamburger() {
    var toggle = document.getElementById("nav-toggle");
    if (toggle.checked == true) {
      toggle.checked = false;
      document.getElementById("main").classList.remove("hidden");
    }
  },

  /**
   * this function changes the navbar header to represent the food inventory currently being shown in #main's foodlist
   * @param  {String} foodType expects one of {"fridge","freezer","pantry"}
   */
  changeTitle(foodType) {
    var heading = document.getElementById("pageTitle");
    heading.innerHTML = foodType + " Inventory";
  },
  
  /**
   * This function displays food items stored in the current user's relevant area from their food inventory in main html section
   * @param  {String} foodType expects one of {"fridge","freezer","pantry"} used during database read request
   * @returns {} no returnable, DOM manipulation used to display database read request
   */
  populateList(foodType) {
    appfunctions.changeTitle(foodType);
    document.getElementById("nav-toggle").checked = false;

    while (userId == null){
      var userId = firebase.auth().currentUser.uid;
      console.log(userId);
    }
    
    // console.log(userId + "/inventories/" + foodType + "/");

    return firebase
      .database()
      .ref("/inventories/" + userId + "/" + foodType + "/")
      .once("value")
      .then(function(snapshot) {
        var foodArray = [];
        snapshot.forEach(ss => {
          foodArray.push(ss.val());
        });
        
        var list = document.getElementById("foodList");
        list.innerHTML = "";
        console.log("foodArray val:");
        console.log(foodArray);
        foodArray.forEach(function(element) {
          list.innerHTML +=
            "<li class='foodItem'><img class='foodIcon' src='../resources/carrot.webp'><p class='foodName'>" +
            element.name +
            "</p> <p class='foodExp'>" +
            element.expiry +
            "</p> <p class='foodQuantity'>" +
            element.quantity +
            "</p>";
        });
      });
  },

  getFoodObjArray(foodType){
    userId = appfunctions.getCurrentUser();
     return firebase
      .database()
      .ref("/inventories/" + userId + "/" + foodType + "/")
      .once("value")
      .then(function(snapshot) {
        appfunctions.updateHTML(snapshot.val(), userId, foodType);
      });
      
  },

  getFoodObjImg(userId, foodType,filename){
//     var storage = firebase.storage()
//     var pathref = storage.ref("https://firebasestorage.googleapis.com/v0/b/disso-70-100.appspot.com/o/9voizvBqsMOukDXp6kXXB5Smyeu2%2Finventories%2Ffridge%2F1.jpg?alt=media&token=5399ec9a-af29-4564-827c-e26123095965");
//     // Create a reference from a Google Cloud Storage URI
// // var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')
//     console.log("Pathref val:");
//     console.log(pathref);

// Points to the root reference
var storageRef = firebase.storage().ref();
// Points to 'images'
var imagesRef = storageRef.child(userId+'/inventories/'+foodType+'/'+filename);
// console.log(imagesRef);
    // return pathref;

    var test = imagesRef.getDownloadURL()
    return test;
  
  },

  getCurrentUser(){
    return firebase.auth().currentUser.uid;
  },

  updateHTML(fArray, uId, foodType){
    console.log("user id:");
    console.log(uId);
    appfunctions.changeTitle(foodType);
    document.getElementById("nav-toggle").checked = false;
    var list = document.getElementById("foodList");
    var test = appfunctions.getFoodObjImg(uId, foodType, "1.jpg");
    console.log("test val:");
    console.log(test);
        list.innerHTML = "";
        fArray.forEach(function(element) {
          list.innerHTML +=
            "<li class='foodItem'><img class='foodIcon' src='"+test+"'><p class='foodName'>" +
            element.name +
            "</p> <p class='foodExp'>" +
            element.expiry +
            "</p> <p class='foodQuantity'>" +
            element.quantity +
            "</p>";
          // console.log(element);
        });
  }


};
module.exports = appfunctions;
