import m from "mithril";

var Exercise = require("./views/exercise");
var Stats = require("./views/stats");
var UploadEx = require("./views/upload_ex");
var HowTo = require("./views/how_to");
var Login = require("./views/login");

var viewIfLoggedIn = function(view) {
    if (!localStorage.getItem("auth-token")) m.route.set("/login")
    else return view
}

var clearLoginData = function() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("username");
}

m.route(document.body,
    "/exercise", {
        "/exercise": {
            onmatch: function() {
                return viewIfLoggedIn(Exercise);
            }
        },
        "/stats": {
            onmatch: function() {
                return viewIfLoggedIn(Stats);
            }
        },
        "/upload_ex": {
            onmatch: function() {
                return viewIfLoggedIn(UploadEx);
            }
        },
        "/how_to": {
            onmatch: function() {
                return viewIfLoggedIn(HowTo);
            }
        },
        "/login": Login,
        "/logout": {
            onmatch: function() {
                clearLoginData();
                return Login;
            }
        },
    }
)
