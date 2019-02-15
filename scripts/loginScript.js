 var fname="";

firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
    var currUser = firebase.auth().currentUser;
    updateName(currUser, fname);
    console.log(currUser);
    window.location = "./html/InventoryFreezer.html";

    } else {
        console.log("not signed in");
    }
  });

function login(){
    const userEmail = document.getElementById("txtUsername").value;
    const userPassword = document.getElementById("txtPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + error.message);
      });
}

function updateName(user, name){
    user.updateProfile({displayName: name.valueOf()}).then(function() {
      // Update successful.
      console.log("Update Successful");
    }).catch(function(error) {
      // An error happened.
      console.log("Update Failed: "+error.message);
    });
}

function register(){
    const userEmail = document.getElementById("regUsername").value;
    const userPassword = document.getElementById("regPassword").value;
    fname = document.getElementById("regFname").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error: " + error.message);
    });
}