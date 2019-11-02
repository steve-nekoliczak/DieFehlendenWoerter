var m = require("mithril");

var HowTo = {
    view: function() {
        return [
            "\n\n",
            m("title", "how to"),
            m(".row.container", [
                m("h5", [m("b", "home")]),
                m("ul", [
                    m("li", "\n                Choose a document and an exercise type to start.\n            "),
                    m("li", "\n                In each text box, type in your answer and hit enter when ready to submit.\n            "),
                    m("li", "\n                Light green is a right answer. Light red is a wrong answer.\n            ")
                ]),
                m("h5", [m("b", "upload exercise")]),
                m("ul", [
                    m("li", "\n                Only UTF-8 encoded text files can be uploaded.\n            "),
                    m("li", "\n                Each paragraph must be on one line (i.e. newline characters determine paragraph breaks).\n            "),
                    m("li", "\n                The NLP library does not determine language. The NLP library accepts any text and does its best to process it, so please only upload text files that are in German.\n            ")
                ])
            ]),
            "\n\n\n"
        ]
    }
}

module.exports = HowTo;
