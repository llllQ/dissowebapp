/**
 *
 *
 * @param {*} ingredients
 * @param {*} diet
 * @param {*} allergy
 */
function yummlyRequest(ingredients, diet, allergy) {
  var output = document.getElementById("temp");
  const Http = new XMLHttpRequest();
  const app_id = "b96a5430";
  const app_key = "6aeb2b034eac35f97d91d9683bb6f550";
  var parameters =
    "&requiredPictures=true&allowedCourse[]=course^course-Main%20Dishes";
  ingredients.forEach(element => {
    element = encodeURIComponent(element.trim());
    parameters += "&allowedIngredient[]=" + element.toLowerCase();
  });

    if (diet !== "none"){
      console.log("Shout");
      parameters += "&allowedDiet[]="+diet;
    }
    if(allergy !=="none"){
      parameters += "&allowedAllergy[]="+allergy;
    }

  

  console.log(parameters);

  const url =
    "https://api.yummly.com/v1/api/recipes?_app_id=" +
    app_id +
    "&_app_key= " +
    app_key +
    parameters;
    console.log("url: "+url);
  Http.open("GET", url);
  Http.send();

  /**
   *
   *
   */
  Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(Http.responseText);
      // console.log(data);
      output.innerHTML +=
        "<button onclick='showSearchContainer()'>Back to Search</button>";
      data.matches.forEach(element => {
        output.innerHTML +=
          "<a href='https://www.yummly.co.uk/recipe/" +
          element.id +
          "' target='_blank'><li><img class='recipeIcon' src='" +
          element.smallImageUrls[0] +
          "'><p class='recipeName'>" +
          element.recipeName +
          "</p> <p class='recipeTime'>" +
          element.totalTimeInSeconds / 60 +
          " minutes</p> <p class='recipeSrc'>" +
          element.sourceDisplayName +
          "</p></li></a>";
      });
      
    }
  };
  document.getElementById("searchContainer").style.display = "none";
}

/**
 *
 *
 */
function showSearchContainer() {
  document.getElementById("temp").innerHTML = "";
  document.getElementById("searchContainer").style.display = "block";
}

/**
 *
 *
 * @param {*} foodname
 */
function queryInventory(foodname) {
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.database();
  const baseref = db.ref("inventories/" + userId + "/");
  foodname = foodname.toUpperCase();
  console.log("Searched food item is: " + foodname);
  var result = "";
  console.log(userId);
  var searchArea = "fridge";
  const freezerRadio = document.getElementById("freezerRadio");
  const fridgeRadio = document.getElementById("fridgeRadio");
  const pantryRadio = document.getElementById("pantryRadio");

  if (fridgeRadio.checked) {
    searchArea = "fridge";
  }
  if (freezerRadio.checked) {
    searchArea = "freezer";
  }
  if (pantryRadio.checked) {
    searchArea = "pantry";
  }

  const fridgeref = baseref
    .child(searchArea)
    .orderByChild("name")
    .equalTo(foodname)
    .limitToFirst(1);
  fridgeref.on("value", function(snapshot) {
    snapshot.forEach(element => {
      // result.push(element.val().name);
      result = element.val().name;
    });
    if (result == ""){
      const newRef = baseref.child(searchArea).orderByChild('name').startAt(foodname).limitToFirst(1);
      newRef.on("value", function(snapshot){
        snapshot.forEach(element => {
          console.log('here');
          result = element.val().name;
          console.log("99");
          console.log(result);
          console.log("99");
          createCheckBox(result);
          return;
        });
      });
    }
    createCheckBox(result);
  });
}

/**
 *
 *
 */
document.getElementById("itagSearch").onclick = function() {
  document.getElementById('search').style.display = "block";
  const searchparam = document.getElementById("searchBox").value;
  document.getElementById("searchBox").value = "";
  queryInventory(searchparam);
};

/**
 *This function creates a HTML checkbox element with the value passed in as a parameter
 *
 * @param {*} value The name value of a food item searched for by the user
 */
function createCheckBox(value) {
  console.log(value);
  if (value) {
    document.getElementById("checkboxHolder").innerHTML +=
      "<label class='checkContainer' for='" +
      value +
      "' ><input type='checkbox' class='tickbox'  id='" +
      value +
      "' checked>" +
      value +
      "</label>";
  }
}


/**
 *This function is used to return user data, which includes the dietry requirments necessary for Yummly API query parameters
 *
 * @returns {Object} userObj - an object representing the current user, including diet and allerfy data to be used in Yummly query
 */
function getUserVals(){
  var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var userObj = snapshot.val();
  return userObj;
});
}


/**
 *This function is called when the search html button is clicked. It collates parameters required for Yummly query from the HTML page and User Database before calling the Yummly Request
 *
 */
document.getElementById("search").onclick = function() {
  var test = document.getElementById("checkboxHolder").children;
  var checks = [];
  var ingredients = [];
  for (var i = 0; i < test.length; i++) {
    checks.push(test[i]);
  }
  checks.forEach(element => {
    if (element.children[0].checked) {
      ingredients.push(element.children[0].id);
    }
  });
  var data
  var promise = getUserVals()
  promise.then(function(result){
     data = result;
     yummlyRequest(ingredients, data.diet, data.allergy);
  });  
};
