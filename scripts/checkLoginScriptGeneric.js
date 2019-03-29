/**
 * This function checks for changes to current user's authentication state within the main html app page
 * If user is logged in, display display-name on profile area of hamburger menu
 * If user is logged out, redirect to the index login/register html page
 * @param  {} user firebase user reference object
 */
firebase.auth().onAuthStateChanged(function(user){
    if (user) {

    } else {
        console.log("not signed in");
        window.location = "../index.html";
    }
  });

  function logout(){
    firebase.auth().signOut();
}