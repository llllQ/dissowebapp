/**
 * This function is called upon the user selecting 'sign out' option
 * Function changes authentication state of the current user to 'signed out' -> triggering a html redirect when authentication change is detected in 'onAuthChanged' methods
 */
function logout(){
    firebase.auth().signOut();
}