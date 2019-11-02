var m = require("mithril");

var HeaderPartial = require("./partials/header");
var UploadExPartial = require("./partials/upload_ex");

var UploadEx = {
    view: function() {
        return [m(HeaderPartial), m(UploadExPartial)];
    }
}

module.exports = UploadEx;
