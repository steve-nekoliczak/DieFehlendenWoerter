var m = require("mithril");

var Auth = require("../../models/auth");

var Login = {
    view: function() {
        return m("form", [
            m(".row.container", [
                m("form.twelve.columns[method='post']", [
                    m("p", "email:"),
                    m("input[name='email'][type='email']", {
                        oninput: function (e) { Auth.setUsername(e.target.value) },
                        value: Auth.username
                    }),
                    m("p", "password:"),
                    m("input[name='password'][type='password']", {
                        oninput: function (e) { Auth.setPassword(e.target.value) },
                        value: Auth.password
                    }),
                    m("p", [
                        m("button[type=button]", {onclick: Auth.login}, "login"),
                        m("button[type=button]", {onclick: Auth.register}, "register"),
                    ])
                ])
            ])
        ])
    }
}

module.exports = Login
