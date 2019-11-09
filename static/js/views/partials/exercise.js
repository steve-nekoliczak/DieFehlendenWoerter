var m = require("mithril");

var ExModel = require("../../models/exercise");

ExModel.getDocumentList()

var Exercise = {
    view: function() {
        return [
            m("title", "home"),
            m(".row.container", [
                m("[id='selectors_div']", [
                    m("select[id='document_select']", {
                        oninput: function (e) {
                            ExModel.setDocumentTitle(e.target.value)
                            ExModel.getExTypeList()
                        },
                        value: ExModel.documentTitle
                    }, [
                        m("option[selected=''][value='']", "document"),
                        ExModel.documentList.map(function(doc) {
                            return m('option', { value: doc }, doc)
                        })
                    ]),
                    m("select[id='ex_type_select']", {
                        oninput: function (e) { ExModel.setExType(e.target.value) },
                        value: ExModel.exType
                    }, [
                        m("option[selected=''][value='']", "exercise type"),
                        ExModel.exTypeList.map(function(exType) {
                            return m('option', { value: exType }, exType)
                        })
                    ]),
                    m("span[id='take_these']", "Ä ä Ö ö Ü ü ß"),
                    m("[id='selector_div']", [
                        m("fieldset[id='cheater_set']", [
                            m(".item", [
                                m("input[id='cheater_mode_checkbox'][type='checkbox']", {
                                    oninput: function (e) { ExModel.setCheaterMode(e.target.checked) },
                                    value: ExModel.isCheaterMode
                                }),
                                m("label[for='cheater_mode_checkbox']", "cheater mode")
                            ])
                        ]),
                        m("br"),
                        m("[id='exercise_div']", ExModel.exPrintout),
                        m("[id='buttons_div']", [
                            m("button[type=button]", {onclick: ExModel.getParagraph}, "New Exercise")
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
