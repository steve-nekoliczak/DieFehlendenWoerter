var m = require("mithril");

var Exercise = {
    view: function() {
        return [
            m("title", "home"),
            m(".row.container", [
                m("[id='selectors_div']", [
                    m("select[id='document_select']", [
                        m("option[selected=''][value='']", "document")
                    ]),
                    m("select[id='ex_type_select']", [
                        m("option[selected=''][value='']", "exercise type")
                    ]),
                    m("span[id='take_these']", "Ä ä Ö ö Ü ü ß"),
                    m("[id='selector_div']", [
                        m("fieldset[id='cheater_set']", [
                            m(".item", [
                                m("input[id='cheater_mode_checkbox'][type='checkbox']"),
                                m("label[for='cheater_mode_checkbox']", "cheater mode")
                            ])
                        ]),
                        m("div", [
                        ]),
                        m("br"),
                        m("[id='exercise_div']", [
                        ]),
                        m("[id='buttons_div']", [
                            m("button[id='new_ex']", "New Exercise")
                        ]),
                        m(".error", [
                        ])
                    ]),
                ])
            ])
        ]
    }
}

module.exports = Exercise;
