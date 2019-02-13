firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
    //   alert(user + " is signed in");
    var user = firebase.auth().currentUser;
    console.log(user);
    } else {
        console.log("not signed in");
        window.location = "../index.html";
      // No user is signed in.
    }
  });

  function logout(){
    firebase.auth().signOut();
}