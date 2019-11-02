var m = require("mithril");

var Stats = {
    view: function() {
        return [
            m("title", "stats"),
            m(".row.container", [
                m(".one-third.column[id='selector_div']", [
                    m("fieldset[id='adjectives_set']", [
                        m(".item", [
                            m("label.section_label", "adjectives")
                        ]),
                        m(".item", [
                            m("input.adjective_checkbox[id='adj_nom_checkbox'][type='checkbox']"),
                            m("label[for='adj_nom_checkbox']", "nominative")
                        ]),
                        m(".item", [
                            m("input.adjective_checkbox[id='adj_acc_checkbox'][type='checkbox']"),
                            m("label[for='adj_acc_checkbox']", "accusative")
                        ]),
                        m(".item", [
                            m("input.adjective_checkbox[id='adj_dat_checkbox'][type='checkbox']"),
                            m("label[for='adj_dat_checkbox']", "dative")
                        ]),
                        m(".item", [
                            m("input.adjective_checkbox[id='adj_gen_checkbox'][type='checkbox']"),
                            m("label[for='adj_gen_checkbox']", "genitive")
                        ])
                    ]),
                    m("fieldset[id='articles_set']", [
                        m(".item", [
                            m("label.section_label", "articles")
                        ]),
                        m(".item", [
                            m("input.article_checkbox[id='art_nom_checkbox'][type='checkbox']"),
                            m("label[for='art_nom_checkbox']", "nominative")
                        ]),
                        m(".item", [
                            m("input.article_checkbox[id='art_acc_checkbox'][type='checkbox']"),
                            m("label[for='art_acc_checkbox']", "accusative")
                        ]),
                        m(".item", [
                            m("input.article_checkbox[id='art_dat_checkbox'][type='checkbox']"),
                            m("label[for='art_dat_checkbox']", "dative")
                        ]),
                        m(".item", [
                            m("input.article_checkbox[id='art_gen_checkbox'][type='checkbox']"),
                            m("label[for='art_gen_checkbox']", "genitive")
                        ])
                    ])
                ]),
                m(".two-thirds.column[id='chart_div']", [
                ])
            ]),
        ]
    }
}

module.exports = Stats;
