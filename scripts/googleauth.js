/**
 * This function is called upon press of 'Sign in With Google' login/register option
 * Authenticates user with webapp using firebase authentication
 */
function gAuth(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}
