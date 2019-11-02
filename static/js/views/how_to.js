var m = require("mithril");

var HeaderPartial = require("./partials/header");
var HowToPartial = require("./partials/how_to");

var HowTo = {
    view: function() {
        return [m(HeaderPartial), m(HowToPartial)];
    }
}

module.exports = HowTo;
