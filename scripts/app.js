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

function changeTitle(foodType){
    var heading = document.getElementById("pageTitle");
    heading.innerHTML = foodType + " Inventory";
}

function populateList(foodType){
    changeTitle(foodType);
    document.getElementById("nav-toggle").checked = false;
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/inventories/' + userId + '/'+foodType+'/').once('value').then(function(snapshot) {
        var foodArray = (snapshot.val());
        var list = document.getElementById("foodList");
        list.innerHTML = "";
        foodArray.forEach(function(element) {
            
            list.innerHTML += "<li class='foodItem'><img class='foodIcon' src='../resources/carrot.webp'><p class='foodName'>" + element.name +"</p> <p class='foodExp'>"+element.expiry+"</p> <p class='foodQuantity'>"+element.quantity+"</p>";
            // console.log(element);
          });
    });

    // var document.getElementById
   
}
