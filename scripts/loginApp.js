var fname="";

var loginUnameLabel = document.getElementById("lblTxtUsername");
var loginPwordLabel = document.getElementById("lblTxtPassword");
var loginUnameInput = document.getElementById("txtUsername");
var loginPwordInput = document.getElementById("txtPassword");

var regUnameLabel = document.getElementById("lblRegUsername");
var regPwordLabel = document.getElementById("lblRegPassword");
var regUnameInput = document.getElementById("regUsername");
var regPwordInput = document.getElementById("regPassword");

function resetLbl(){
  loginUnameLabel.innerHTML="";
  loginPwordLabel.innerHTML ="";
}

function resetInput(elementid){
  document.getElementById(elementid).classList.remove("inputInvalid");
}

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
  resetLbl();
    const userEmail = document.getElementById("txtUsername").value;
    const userPassword = document.getElementById("txtPassword").value;

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
        }
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
  resetLbl();
    const userEmail = document.getElementById("regUsername").value;
    const userPassword = document.getElementById("regPassword").value;
    fname = document.getElementById("regFname").value;

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

      window.alert("Error: " + error.message);
    });
}

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
  
  // console.log(document.getElementById("signup").style.display);
  // console.log("login container display val: " + log.style.display);
}