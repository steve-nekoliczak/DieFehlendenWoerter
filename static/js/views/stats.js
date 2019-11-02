var m = require("mithril");

var HeaderPartial = require("./partials/header");
var StatsPartial = require("./partials/stats");

var Stats = {
    view: function() {
        return [m(HeaderPartial), m(StatsPartial)];
    }
}

module.exports = Stats;
