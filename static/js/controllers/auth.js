var m = require("mithril");

var Auth = {
    username: "",
    password: "",

    setUsername: function(value) {
        Auth.username = value
    },
    setPassword: function(value) {
        Auth.password = value
    },
    login: function() {
        m.request({
            url: "/api/user/login",
            params: {email: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/home")
        })
    },
    register: function() {
        m.request({
            url: "/api/user/login",
            params: {email: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/home")
        })
    }
}

module.exports = Auth
