var m = require("mithril");

var HeaderPartial = require("./partials/header");
var LoginPartial = require("./partials/login");

var Login = {
    view: function() {
        return [m(HeaderPartial), m(LoginPartial)];
    }
}

module.exports = Login;
