import m from "mithril";

var Exercise = require("./views/exercise");
var Stats = require("./views/stats");
var UploadEx = require("./views/upload_ex");
var HowTo = require("./views/how_to");
var Login = require("./views/login");

m.route(document.body,
    "/exercise", {
        "/exercise": Exercise,
        /*
        "/exercise": {
            onmatch: function() {
                if (!localStorage.getItem("auth-token")) m.route.set("/login")
                else return Home
            }
        },
        */
        "/stats": Stats,
        "/upload_ex": UploadEx,
        "/how_to": HowTo,
        "/login": Login
    }
)
