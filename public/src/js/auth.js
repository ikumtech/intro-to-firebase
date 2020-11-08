
async function login() {
    
    const provider = new firebase.auth.GoogleAuthProvider();

    // added this as given by docs: https://firebase.google.com/docs/auth/web/auth-state-persistence
    try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        const auth_result = await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Error Code:${errorCode}\nError Message:${errorMessage}`)
    }

    updateUI();
    
    
}

async function logout() {

    // event handler for logout button

    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('User signed out successfully.')
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Error Code:${errorCode}\nError Message:${errorMessage}`)
    });

    updateUI();

}

function updateUI(){
    firebase.auth().onAuthStateChanged((user) => {
        displayAuthenticatedUI(); // call method to update UI according to users log in state
    })
}


/**
 * Checks if the user exists and changes the UI appropriately
 */
function displayAuthenticatedUI() {
    var user = firebase.auth().currentUser;

    const userSignedIn = !!user
    console.log(userSignedIn); // print true if user exists
    // hide the login and sign up buttons when user signs in
    document.getElementById('loginSection').hidden = userSignedIn;
    // show the profile button when user signs in
    document.getElementById('ProfileSection').hidden = !userSignedIn;
    return userSignedIn;
}


