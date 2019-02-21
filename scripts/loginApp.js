var fname="";
var newUser = false;

var loginUnameLabel = document.getElementById("lblTxtUsername");
var loginPwordLabel = document.getElementById("lblTxtPassword");
var loginUnameInput = document.getElementById("txtUsername");
var loginPwordInput = document.getElementById("txtPassword");

var regUnameLabel = document.getElementById("lblRegUsername");
var regPwordLabel = document.getElementById("lblRegPassword");
var regUnameInput = document.getElementById("regUsername");
var regPwordInput = document.getElementById("regPassword");

/**
 * This function is called after login/register button is pressed
 * Function resets values of username and password input fields to be blank, ready for new input values to be entered
 */
function resetLbl(){
  loginUnameLabel.innerHTML="";
  loginPwordLabel.innerHTML ="";
}
/**
 * This function removes the invalid input class from an input element
 * @param  {} elementid html element id referring to data input field on index.html
 */
function resetInput(elementid){
  document.getElementById(elementid).classList.remove("inputInvalid");
}

/**
 * This function is triggered every time the authentication state of the user in changed (logged in/out) within the login/register html page
 * If a user is signed in, they get redirected to the main app page
 * If a user is not signed in, nothing happens
 * @param  {} user firebase user reference object
 */
firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      // User is signed in.
    var currUser = firebase.auth().currentUser;
    // updateName(currUser, fname);
    // console.log(currUser);
    console.log(newUser);
    if (newUser != false){
      console.log("hello31");
      writeUserData(currUser.uid,fname,currUser.email);
    }
    
    window.location = "./html/InventoryFreezer.html";

    } else {
        console.log("not signed in");
    }
  });
/**
 * This function is called on login button press. 
 * When called it takes the values from username and password input boxes and checks them against firebase records
 * Error messages given out as relevant based on incorrect user input
 */
function login(){
    const userEmail = document.getElementById("txtUsername").value;
    const userPassword = document.getElementById("txtPassword").value;
    resetLbl();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log("Error code: "+errorCode);

        switch(errorCode){
          case "auth/wrong-password":
            loginPwordInput.placeholder='Password';
            loginPwordInput.classList.add("inputInvalid");
            loginPwordLabel.innerHTML="Invalid Password Format";
          break;
          case "auth/invalid-email":
            loginUnameInput.placeholder='Email'
            loginUnameInput.classList.add("inputInvalid");
            loginUnameLabel.innerHTML="Invalid Email Format";
          break; 
          case "auth/user-not-found":
          loginUnameLabel.innerHTML="This User Doesn't Exist";
          break;
        }
      });
}

// function updateName(user, name){
//     user.updateProfile({displayName: name.valueOf()}).then(function() {
//       // Update successful.
//       console.log("Update Successful");
//     }).catch(function(error) {
//       // An error happened.
//       console.log("Update Failed: "+error.message);
//     });
// }

/**
 * This function is called upon a register new user press.
 * When called it takes fields username, password and display-name and passes them to firebase to ensure a user-record does not already exist
 * If valid, a new entry is added to the user database
 */
function register(){
  newUser = true;
    const userEmail = document.getElementById("regUsername").value;
    const userPassword = document.getElementById("regPassword").value;
    fname = document.getElementById("regFname").value;
    resetLbl();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      switch(errorCode){
        case "auth/wrong-password":
          regPwordInput.placeholder='Password';
          regPwordInput.classList.add("inputInvalid");
          regPwordLabel.innerHTML="Invalid Password Format";
        break;
        case "auth/invalid-email":
          regUnameInput.placeholder='Email'
          regUnameInput.classList.add("inputInvalid");
          regUnameLabel.innerHTML="Invalid Email Format";
        break; 
      }
    });

    // var testUser = firebase.auth().currentUser;
    // writeUserData(testUser.uid,fname,userEmail);
}
/**
 * This function is used to switch index.html from sign-in to register sections.
 * Once called, displays one section and hides another
 */
function toggleDisplay(){
  resetLbl();
  var reg = document.getElementById("signup");
  var log = document.getElementById("signin");

  // console.log(reg);
  if (log.style.display != "none"){
    log.style.display = "none";
    reg.style.display="inherit";
    
  } else{
    log.style.display = "inherit";
    reg.style.display = "none";
  }
}