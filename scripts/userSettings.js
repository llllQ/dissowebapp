function updateUserData(uname, udiet, uallergy){
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).set({
        name: uname,
        diet: udiet,
        allergy: uallergy
    });
    window.location = "Inventory.html"
}

function readUserData(userVal){
    const userId = userVal;
    firebase.database().ref('users/'+userId).on('value', function(snapshot){
        // console.log(snapshot.val());

        document.getElementById("userName").value = snapshot.val().name;
        document.getElementById("dietSelect").value = snapshot.val().diet;
        document.getElementById("allergySelect").value = snapshot.val().allergy;
    });
    
}
