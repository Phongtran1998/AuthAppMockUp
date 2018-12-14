firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var username = firebase.auth().currentUser;
    document.getElementById("username").innerHTML = username.email;
    var data;
    var key = [];
    firebase
      .database()
      .ref("/user/" + username.uid)
      .on("value", function(snapshot) {
        const noData = snapshot.val() === null;
        if (noData) {
          document.getElementById("loading-header").style.display = "none";
          document.getElementById("no-data-header").style.display = "block";
        } else if (!noData) {
          document.getElementById("loading-header").style.display = "none";
          document.getElementById("data-list").style.display = "block";
          data = Object.keys(snapshot.val());
          data.map(function(value) {
            key.push(value);
            firebase
              .database()
              .ref("/user/" + username.uid + "/" + value)
              .on("value", function(snapshot) {
                $("#data-list").append(
                  "<div class='content'><span class='header-text'><b>Name: </b></span><span class='info'>" +
                    snapshot.val().Name +
                    "</span><br><span class='header-text'><b>Phone: </b></span><span class='info'>" +
                    snapshot.val().Phone +
                    "<br><button type=button class='edit'>Edit</button></div>"
                );
              });
          });
          var buttonList = document.querySelectorAll(".edit");
          for (var i = 0; i < buttonList.length; i++) {
            buttonList[i].id = key[i];
          }
          data.map(function(value) {
            document.getElementById(value).onclick = function() {
              $(".hover_bkgr_fricc1").show();
              $(".popupCloseButton").click(function() {
                $(".hover_bkgr_fricc1").hide();
              });
              firebase
                .database()
                .ref("/user/" + username.uid + "/" + value)
                .on("value", function(snap) {
                  const value = snap.val();
                  const editName = document.getElementById("edit-name");
                  const editPhone = document.getElementById("edit-phone");
                  const isNumberEdit = isNum(editPhone);
                  editName.value = value.Name;
                  editPhone.value = value.Phone;
                  document.getElementById("edit-button").onclick = function() {
                    if (
                      editName.value === value.Name &&
                      editPhone.value === value.Phone
                    ) {
                      alert("You haven't made any changes");
                    } else if (!isNumberEdit) {
                      alert("Phone must be number");
                    } else {
                      firebase
                        .database()
                        .ref("/user/" + username.uid + "/" + value)
                        .set({
                          Name: editName.value,
                          Phone: editPhone.value
                        });
                      document.location.reload(true);
                    }
                  };
                });
              document.getElementById("delete-button").onclick = function() {
                if (confirm("Are you sure?")) {
                  firebase
                    .database()
                    .ref("/user/" + username.uid + "/" + value)
                    .remove()
                    .then(function() {
                      document.location.reload(true);
                    });
                }
              };
            };
          });
        }
      });
    document.getElementById("add-button").onclick = function() {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const isNumber = isNum(phone);
      if (isNumber) {
        firebase
          .database()
          .ref("user/" + username.uid)
          .push({
            Name: name,
            Phone: phone
          });
        $(".hover_bkgr_fricc").hide();
        document.location.reload(true);
      } else {
        alert("Phone must be a number");
      }
    };
    document.getElementById("sign-out").onclick = function() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          location.href = "index.html";
        });
    };
  }
});
function isNum(phone) {
  return (
    !isNaN(phone) &&
    (function(x) {
      return (x | 0) === x;
    })(parseFloat(phone))
  );
}
