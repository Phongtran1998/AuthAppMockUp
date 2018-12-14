function onClick() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      location.href = "User.html";
    })
    .catch(function() {
      $("#login").text("Wrong email or password");
    });
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location.href = "User.html";
  }
});
function checkPassword() {
  var x = document.getElementById("password");
  var y = document.getElementById("password-check");
  x.type = x.type === "password" ? "text" : "password";
}
var signIPassword = document.getElementById("password");
var signInEmail = document.getElementById("email");
var button = document.getElementById("sign-in");

enterClick(signIPassword, button);
enterClick(signInEmail, button);

function enterClick(signIn, button) {
  signIn.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      button.click();
    }
  });
}
