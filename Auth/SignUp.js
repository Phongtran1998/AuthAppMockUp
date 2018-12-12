function onClick() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var passwordCheck = document.getElementById("password-check").value;

  if (email === "" || password === "") {
    $("#warn").text("Must enter an email or password");
  } else if (password.length < 6) {
    $("#warn").text("Password must be at least 6 characters");
  } else if (password !== passwordCheck) {
    $("#warn").text("Password not match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        location.href = "index.html";
      })
      .catch(function(err) {
        $("#warn").text(err.message);
      });
  }
}
function checkPassword() {
  var x = document.getElementById("password");
  var y = document.getElementById("password-check");
  if (x.type === "password" && y.type === "password") {
    x.type = "text";
    y.type = "text";
  } else {
    x.type = "password";
    y.type = "password";
  }
}
