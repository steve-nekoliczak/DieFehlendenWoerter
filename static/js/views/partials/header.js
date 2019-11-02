var m = require("mithril");

var Header = {
    view: function() {
        return [m("header[id='banner']", [
            m(".row", [
                m("h1.banner.eight.columns", "Die Fehlenden Wörter"),
                m(".four.columns", [
                    m("span", "{{ current_user.email }}"),
                    m("span", " | "),
                    m("a[href='#!/logout']", "logout"),
                ])
            ]),
            m(".row", [
                m(".nav.twelve.columns", [
                    m("ul.ul_links", [
                        m("li.li_links.li_links_first", [
                            m("a[href='#!/exercise']", "exercise")
                        ]),
                        m("li.li_links", [
                            m("a[href='#!/stats']", "stats")
                        ]),
                        m("li.li_links", [
                            m("a[href='#!/upload_ex']", "upload exercise")
                        ]),
                        m("li.li_links", [
                            m("a[href='#!/how_to']", "how to")
                        ])
                    ]),
                    m("[id='header_border_div']", [
                    ])
                ]),
                "\n"
            ])
        ])]
    }
}

module.exports = Header
