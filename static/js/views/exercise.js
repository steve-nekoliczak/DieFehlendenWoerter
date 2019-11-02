var m = require("mithril");

var HeaderPartial = require("./partials/header");
var ExercisePartial = require("./partials/exercise");

var Exercise = {
    view: function() {
        return [m(HeaderPartial), m(ExercisePartial)];
    }
}

module.exports = Exercise;
