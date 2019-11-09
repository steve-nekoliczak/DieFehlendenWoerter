var m = require("mithril");


var Ex = {
    // Member vars
    cleanVerbForm: {
        'Fin': 'finite',
        'Part': 'participle',
        'Inf': 'infinitive',
        'Ger': 'gerund'
    },
    cleanVerbTense: {
        'Pres': 'present',
        'Past': 'past'
    },

    documentTitle: "",
    exType: "",
    isCheaterMode: false,
    paragraphIndex: -1,

    documentList: [],
    exTypeList: [],
    exTextInputs: {},

    exPrintout: null,

    // helper functions
    setDocumentTitle: function(value) {
        Ex.documentTitle = value
    },

    setExType: function(value) {
        Ex.exType = value
    },

    setCheaterMode: function(value) {
        Ex.isCheaterMode = value
    },

    // backend calls
    getDocumentList: function() {
        m.request({
            url: "/api/exercise/get_document_list"
        }).then(function(data) {
            Ex.documentList = data
        })
    },

    getExTypeList: function() {
        m.request({
            url: 'api/exercise/get_ex_type_list',
            params: {document_title: Ex.documentTitle}
        }).then(function(data) {
            Ex.exTypeList = data
        })
    },

    getParagraph: function() {
        m.request({
            url: "/api/exercise/get_paragraph",
            params: {document_title: Ex.documentTitle,
                     paragraph_index: Ex.paragraphIndex,
                     ex_types: Ex.exType}
        }).then(function(data) {
            Ex.printEx(data)
        })
    },

    // TODO include user id from local storage
    postExAttempt: function(ex_id, topic_word_index, guess) {
        m.request({
            url: 'api/grader/post_ex_attempt',
            params: {
                ex_id: ex_id,
                topic_word_index: topic_word_index,
                guess: guess
            }
        }).then(function(data) {
            // TODO grade ex
            // $body.trigger('model_post_ex_attempt_success', data);
        })
    },

    printEx: function(exJson) {
        if (Ex.exPrintout) {
            // hack to clear class from cached nodes
            for(i = 0; i < Ex.exPrintout.length; ++i) {
                Ex.exPrintout[i].dom.classList.remove("correct")
                Ex.exPrintout[i].dom.classList.remove("incorrect")
            }
        }

        if (exJson) {

            Ex.exTextInputs = {}
            exFragments = []

            for (i = 0; i < exJson.length; i++) {
                // Need to account for punctuation chars having their own index.
                words = exJson[i].sentence_text.split(/(?=[-—.,!?:;'"“«› ])|(?<=['"„»‹])/g);
                sntFragment = "";

                if (exJson[i].paragraph_start
                    && i != 0) {
                    exFragments.push(m("br"));
                }

                // Get index of all topic words for this sentence.
                tw_indices = [];
                for (j = 0; j < exJson[i].topic_words.length; ++j) {
                    tw = exJson[i].topic_words[j];
                    tw_indices.push(tw.index);
                    key = tw.index + "_" + exJson[i]._id.$oid;
                }

                for (j = 0; j < words.length; ++j) {
                    meta_tw_index = tw_indices.indexOf(j);
                    if (meta_tw_index > -1) {
                        exFragments.push(
                            m("span[class='ex_span']",
                              sntFragment + " "
                            )
                        )
                        sntFragment = " "

                        tw_obj = exJson[i].topic_words[meta_tw_index];

                        // Make special placeholder notes for verbs
                        // The verb lemma itself is usually not enough
                        // information to make an informed guess.
                        placeholder = ''
                        if (tw_obj.type == 'verb') {
                            verb_form = Ex.cleanVerbForm[tw_obj.feats.VerbForm]
                            if (tw_obj.feats.Tense) {
                                verb_tense = Ex.cleanVerbTense[tw_obj.feats.Tense]
                                placeholder = tw_obj.lemma + ' (' + verb_form + ', ' + verb_tense + ')'
                            } else {
                                placeholder = tw_obj.lemma + ' (' + verb_form + ')'
                            }
                        } else {
                            placeholder = tw_obj.lemma
                        }

                        tw_index = j
                        answer = tw_obj.text
                        id = exJson[i]._id.$oid
                        Ex.exTextInputs[id] = {}
                        Ex.exTextInputs[id]['normal'] = placeholder
                        Ex.exTextInputs[id]['cheater'] = answer

                        if (Ex.isCheaterMode) {
                            placeholder = Ex.exTextInputs[id]['cheater']
                        } else {
                            placeholder = Ex.exTextInputs[id]['normal']
                        }

                        exFragments.push(
                            m("input", {
                                id: id,
                                mongo_id: exJson[i]._id.$oid,
                                placeholder: placeholder,
                                value: '',
                                className: 'ex_word ' + tw_obj.type,
                                onkeypress: function(e) {
                                    if (e.key == "Enter"
                                        && !this.classList.contains('correct')
                                        && !this.classList.contains('incorrect')) {

                                        // postExAttempt(this.id, tw_index, guess)
                                        guess = this.value
                                        if (answer == guess) {
                                            this.classList.add('correct')
                                        } else {
                                            this.classList.add('incorrect')
                                        }
                                    }
                                },
                                oncopy: function() {
                                    console.log('in oncopy')
                                },
                            })
                        )
                    } else {
                        sntFragment += words[j];
                    }
                }
                if (sntFragment) {
                    exFragments.push(
                        m("span[class='ex_span']",
                          sntFragment + " "
                        )
                    )
                    sntFragment = " "
                }
            }

            Ex.exPrintout = exFragments
        }
    },


}


module.exports = Ex

/*
ns.controller = (function(m, v) {

    var $body = $('body');
    var model = m,
        view = v;

    var init_ex_words = function() {
        $('.ex_word').first().focus();
        $('.ex_word').keypress(function(k) {
            if (k.keyCode == 13) {
                if (!($(this).val() === '')
                    && !$(this).attr('class').includes('answered')) {
                    model.post_ex_attempt(
                        $(this).attr('mongo_id'),
                        $(this).attr('tw_index'),
                        $(this).val()
                    );
                }
                // TODO still need to set this focus next word thing
                var $next = $(this).nextAll('.ex_word');
                if ($next.length > 0) {
                    $next.first().focus();
                } else {
                    $('#new_ex').focus();
                }
            }
        })
    };

    // TODO figure out how to get this to go in real time, not only on new ex load
    $('#cheater_mode_checkbox').click(function() {
        if ($(this).is(':checked', true)) {
            is_cheater_mode = true;
            $.each($('.ex_word'), function(i, x) {
                $(this).prop('placeholder', ex_text_inputs[$(this).prop('id')]['cheater']);
            });
        } else {
            is_cheater_mode = false;
            $.each($('.ex_word'), function(i, x) {
                $(this).prop('placeholder', ex_text_inputs[$(this).prop('id')]['normal']);
            });
        }
    });

}(ns.model, ns.view));


*/

