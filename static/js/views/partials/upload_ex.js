var m = require("mithril");

var UploadEx = {
    view: function() {
        return m("form", [
            m(".row.container", [
                m("form.twelve.columns[enctype='multipart/form-data'][method='post']", [
                    m("p", "title:"),
                    m("p", [m("input[name='title'][type='text']")]),
                    m("p", "author:"),
                    m("p", [m("input[name='author'][type='text']")]),
                    m("p", "file:"),
                    m("p", [m("input[name='file'][type='file']")]),
                    m("p", [
                        m("button[type=button]", /*{onclick: Auth.login},*/ "login"),
                    ]),
                    m("p", "Ensure your file is utf-8 encoded.")
                ])
            ])
        ])
    }
}

module.exports = UploadEx;
