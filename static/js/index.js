import m from "mithril";

var Exercise = require("./views/exercise");
var Stats = require("./views/stats");
var UploadEx = require("./views/upload_ex");
var HowTo = require("./views/how_to");
var Login = require("./views/login");

m.route(document.body,
    "/exercise", {
        "/exercise": {
            onmatch: function() {
                if (!localStorage.getItem("auth-token")) m.route.set("/login")
                else return Exercise
            }
        },
        "/stats": {
            onmatch: function() {
                if (!localStorage.getItem("auth-token")) m.route.set("/login")
                else return Stats
            }
        },
        "/upload_ex": {
            onmatch: function() {
                if (!localStorage.getItem("auth-token")) m.route.set("/login")
                else return UploadEx
            }
        },
        "/how_to": {
            onmatch: function() {
                if (!localStorage.getItem("auth-token")) m.route.set("/login")
                else return HowTo
            }
        },
        "/login": Login,
    }
)
