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

  Http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(Http.responseText);
      console.log(data);
      data.matches.forEach(element => {
        // if (element.recipeName.length > 23){
        //     element.recipeName = (element.recipeName.substr(0, 20) + "...")
        // }
        // <a href='https://www.yummly.co.uk/recipe/" +
        //   element.id +
        //   "' target='_blank'></a>
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
      output.innerHTML +=
        "<button onclick='showSearchContainer()'>Back to Search</button>";
    }
  };
  document.getElementById("searchContainer").style.display = "none";
}

function showSearchContainer() {
  document.getElementById("temp").innerHTML = "";
  document.getElementById("searchContainer").style.display = "block";
}

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

document.getElementById("itagSearch").onclick = function() {
  document.getElementById('search').style.display = "block";
  const searchparam = document.getElementById("searchBox").value;
  document.getElementById("searchBox").value = "";
  queryInventory(searchparam);
};

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


function getUserVals(){
  var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
  var test = snapshot.val();
  return test;
});
}


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
  })
  
  // const userId = firebase.auth().currentUser.uid;
  // const dietryData = getUserData(userId);
  // console.log("+++++"+dietryData);
  
};
