// var testUser = firebase.auth().currentUser;
// writeUserData(testUser.uid,testUser.displayName,testUser.email);

//foreach item in food database where username is same and food type is same create fooditem html item and populate
//img, food name, food expiry date and food quantity.

// function readData(foodType){
//     var userId = firebase.auth().currentUser.uid;
//     return firebase.database().ref('/inventories/' + userId + '/'+foodType+'/').once('value').then(function(snapshot) {
//         var foodobj = (snapshot.val());
//         // console.log(foodobj);
//     });
// }
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
    var userId = firebase.auth().currentUser.uid;
    console.log(userId + "/inventories/" + foodType + "/");

    var storage = firebase
      .storage()
      .ref(userId + "/inventories/" + foodType + "/");
    return firebase
      .database()
      .ref("/inventories/" + userId + "/" + foodType + "/")
      .once("value")
      .then(function(snapshot) {
        var foodArray = snapshot.val();
        var list = document.getElementById("foodList");
        list.innerHTML = "";
        foodArray.forEach(function(element) {
          list.innerHTML +=
            "<li class='foodItem'><img class='foodIcon' src='../resources/carrot.webp'><p class='foodName'>" +
            element.name +
            "</p> <p class='foodExp'>" +
            element.expiry +
            "</p> <p class='foodQuantity'>" +
            element.quantity +
            "</p>";
          // console.log(element);
        });
      });

    // var document.getElementById
  }
};
module.exports = appfunctions;
