/**
 * This function checks for changes to current user's authentication state within the main html app page
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

  /**
   *This function changes the current user's authentication state to be signed out. This then invokes the onAuthStateChanged() firebase function
   *
   */
  function logout(){
    firebase.auth().signOut();
}