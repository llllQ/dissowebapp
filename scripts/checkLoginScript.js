firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        // User is signed in.
        //   alert(user + " is signed in");
        var user1 = firebase.auth().currentUser;
        console.log(user1);
        if (user1.displayName != null){
            document.getElementById("profileName").innerHTML = "Hi! " + user1.displayName;
        } else{
            document.getElementById("profileName").innerHTML = "Hi! " + user1.email;
        }
        
    } else {
        console.log("not signed in");
        window.location = "../index.html";
      // No user is signed in.
    }
  });

  function logout(){
    firebase.auth().signOut();
}