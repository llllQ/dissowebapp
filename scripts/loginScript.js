firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
    //   alert(user + " is signed in");
    var user = firebase.auth().currentUser;
    console.log(user);
    window.location = "./html/InventoryFreezer.html";

    console.log('test');
    } else {
        console.log("not signed in");
      // No user is signed in.
    }
  });

function login(){
    

    var userEmail = document.getElementById("txtUsername").value;
    var userPassword = document.getElementById("txtPassword").value;

    // alert("here");

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error: " + error.message);
        // ...
      });


}