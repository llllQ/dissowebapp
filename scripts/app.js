  /**
   * This function is called when a user selects a food item from their inventory that they wish to edit details of. This is intiated when a user clicks on the food item's icon.
   *  The purpose of this function is to bring up a 'edit' html page, loaded with the info stored about the food item being edited
   * @param  {} foodKey expects the unique id used as a key to store the food item in the user's food inventory. Used in this function to complete the db reference to load the food item being edited
   * @param  {} foodType expects the category of the food (fridge/freezer/pantry) used to complete the db reference to load the food item being edited
   * @param  {} userId epects the id value of the currently signed in user used to complete the db reference to load the food item being edited.
   */
  function editFoodItem(foodKey, foodType, userId) {
    var inventory = document.getElementById("invenList");
    var editScreen = document.getElementById("foodInfo");
    var foodNameDisplay = document.getElementById("foodName");
    var foodExpiryDisplay = document.getElementById("foodExpiry");
    var foodQuantityDisplay = document.getElementById("foodQuantity");
    var freezerRadio = document.getElementById("freezerRadio");
    var fridgeRadio = document.getElementById("fridgeRadio");
    var pantryRadio = document.getElementById("pantryRadio");
    var foodIdStore = document.getElementById("foodIdStore");
    var foodObj = [];
    firebase
      .database()
      .ref("/inventories/" + userId + "/" + foodType + "/")
      .once("value", function(snapshot) {
        foodObj.push(snapshot.child(foodKey).val());
        console.log(foodObj);
        inventory.style.display = "none";
        editScreen.style.display = "block";
        console.log(foodObj[0]);
        foodNameDisplay.value = foodObj[0].name;
        foodExpiryDisplay.value = foodObj[0].expiry;
        foodQuantityDisplay.value = foodObj[0].quantity;
        console.log(foodType);
        switch (foodType) {
          case "fridge":
            fridgeRadio.checked = true;
            break;
          case "freezer":
            freezerRadio.checked = true;
            break;
          case "pantry":
            pantryRadio.checked = true;
            break;
        }
        foodIdStore.value = foodKey;
      });
  };

  function removeItem(){
    var foodKey = document.getElementById("foodIdStore").value;
    var freezerRadio = document.getElementById("freezerRadio");
    var fridgeRadio = document.getElementById("fridgeRadio");
    var pantryRadio = document.getElementById("pantryRadio");
    var inventory = document.getElementById("invenList");
    var editScreen = document.getElementById("foodInfo");
    const userId = firebase.auth().currentUser.uid;
    var foodType;
    if (freezerRadio.checked == true) {
      foodType = freezerRadio.value;
    }
    if (fridgeRadio.checked == true) {
      foodType = fridgeRadio.value;
    }
    if (pantryRadio.checked == true) {
      foodType = pantryRadio.value;
    }
    firebase.database()
      .ref("inventories/" + userId + "/" + foodType + "/" + foodKey + "/").remove();
      inventory.style.display = "block";
    editScreen.style.display = "none";
  };

  /**
   * This function writes any changes made when a user commits their food item edits.
   *   It uses values in the input fields generated from editFoodItem().
   */
  function writeEdit() {
    var inventory = document.getElementById("invenList");
    var editScreen = document.getElementById("foodInfo");
    var foodNameDisplay = document.getElementById("foodName");
    var foodExpiryDisplay = document.getElementById("foodExpiry");
    var foodQuantityDisplay = document.getElementById("foodQuantity");
    var freezerRadio = document.getElementById("freezerRadio");
    var fridgeRadio = document.getElementById("fridgeRadio");
    var pantryRadio = document.getElementById("pantryRadio");
    var foodKey = document.getElementById("foodIdStore").value;
    var foodObj = {
      name: foodNameDisplay.value,
      expiry: foodExpiryDisplay.value,
      quantity: foodQuantityDisplay.value
    };
    var foodType;
    if (freezerRadio.checked == true) {
      foodType = freezerRadio.value;
    }
    if (fridgeRadio.checked == true) {
      foodType = fridgeRadio.value;
    }
    if (pantryRadio.checked == true) {
      foodType = pantryRadio.value;
    }
    const userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("inventories/" + userId + "/" + foodType + "/" + foodKey + "/")
      .set({
        name: foodObj.name,
        expiry: foodObj.expiry,
        quantity: foodObj.quantity
      });
    inventory.style.display = "block";
    editScreen.style.display = "none";
  };

  /**
   * this function changes the navbar header to represent the food inventory currently being shown in #main's foodlist.
   * It is called whenever a user navigates to one of their three inventories (fridge/freezer/pantry).
   * @param  {String} foodType expects one of {"fridge","freezer","pantry"}
   */
  function changeTitle(foodType) {
    var heading = document.getElementById("pageTitle");
    heading.innerHTML = foodType + " Inventory";
  };

  /**
   * This function displays food items stored in the current user's relevant area from their food inventory in main html section
   * @param  {String} foodType expects one of {"fridge","freezer","pantry"} used during database read request
   * @returns {} no returnable, DOM manipulation used to display database read request
   */
 function populateList(foodType) {
    var pantrySwitch = document.getElementById("pantrySwitch");
    var fridgeSwitch = document.getElementById("fridgeSwitch");
    var freezerSwitch = document.getElementById("freezerSwitch");
    switch (foodType) {
      case "fridge":
        fridgeSwitch.classList.add("current");
        pantrySwitch.classList.remove("current");
        freezerSwitch.classList.remove("current");
        break;
      case "freezer":
        fridgeSwitch.classList.remove("current");
        pantrySwitch.classList.remove("current");
        freezerSwitch.classList.add("current");
        break;
      case "pantry":
        fridgeSwitch.classList.remove("current");
        pantrySwitch.classList.add("current");
        freezerSwitch.classList.remove("current");
        break;
    }
    changeTitle(foodType);
    document.getElementById("nav-toggle").checked = false;
    var userId = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref("/inventories/" + userId + "/" + foodType + "/")
      .on("value", function(snapshot) {
        var foodArray = [];
        snapshot.forEach(element => {
          var temp = { key: element.key, value: element.val() };
          foodArray.push(temp);
        });

        var list = document.getElementById("foodList");
        list.innerHTML = "";

        foodArray.forEach(function(element) {
          var foodClass = "foodItem";
          //check element's expiry date
          const today = new Date();
          var dateFormatted = element.value.expiry.split("/").map(Number);
          dateFormatted = new Date(
            dateFormatted[2],
            dateFormatted[1] - 1,
            dateFormatted[0]
          );
          const daysLeft = Date.dateDiff(today, dateFormatted)
          if ( daysLeft < 2) {
            foodClass += " nearlyExpired";
          }
          if (daysLeft < -1){
            foodClass += " expired";
          }
          list.innerHTML +=
            "<li class='" +
            foodClass +
            "' id='" +
            element.key +
            "'><img class='foodIcon' onclick=editFoodItem(" +
            element.key +
            "," +
            "'" +
            foodType +
            "'" +
            "," +
            "'" +
            userId +
            "'" +
            ") src='../resources/pencil-edit-button.webp'><p class='foodName'>" +
            element.value.name +
            "</p> <p class='foodExp'>" +
            element.value.expiry +
            "</p> <p class='foodQuantity'>" +
            element.value.quantity +
            "</p>";
        });
      });
  };
  
  function getFoodObjImg(userId, foodType, filename) {
    //     var storage = firebase.storage()
    //     var pathref = storage.ref("https://firebasestorage.googleapis.com/v0/b/disso-70-100.appspot.com/o/9voizvBqsMOukDXp6kXXB5Smyeu2%2Finventories%2Ffridge%2F1.jpg?alt=media&token=5399ec9a-af29-4564-827c-e26123095965");
    //     // Create a reference from a Google Cloud Storage URI
    // // var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')
    //     console.log("Pathref val:");
    //     console.log(pathref);

    // Points to the root reference
    var storageRef = firebase.storage().ref();
    // Points to 'images'
    var imagesRef = storageRef.child(
      userId + "/inventories/" + foodType + "/" + filename
    );
    // console.log(imagesRef);
    // return pathref;

    var test = imagesRef.getDownloadURL();
    return test;
  };