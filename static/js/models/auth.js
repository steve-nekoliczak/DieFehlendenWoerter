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
            params: {username: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/exercise")
        })
    },
    register: function() {
        m.request({
            url: "/api/user/register",
            params: {email: Auth.username, password: Auth.password}
        }).then(function(data) {
            localStorage.setItem("auth-token", data.token)
            m.route.set("/exercise")
        })
    }
}

module.exports = Auth
