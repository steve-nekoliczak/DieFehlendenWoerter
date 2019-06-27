
ns = {};

var clean_verb_form = {
    'Fin': 'finite',
    'Part': 'participle',
    'Inf': 'infinitive',
    'Ger': 'gerund'

};
var clean_verb_tense ={
    'Pres': 'present',
    'Past': 'past'
};

var ex_text_inputs = {}

var is_cheater_mode = false;

ns.model = (function(){
    var $body = $('body');

    return {

        'get_paragraph': function(document_title, paragraph_index, ex_types) {
            var ajax_options = {
                type: 'GET',
                url: 'api/exercise/get_paragraph',
                accepts: 'application/json',
                dataType: 'json',
                data: {'document_title': document_title,
                       'paragraph_index': paragraph_index,
                       'ex_types': ex_types}
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $body.trigger('model_get_ex_success', [data]);
            })
            /*
            // TODO setup fail case
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
            */
        },

        'get_document_list': function() {
            var ajax_options = {
                type: 'GET',
                url: 'api/exercise/get_document_list',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $body.trigger('model_get_document_list_success', [data]);
            })
        },

        'get_ex_type_list': function(document_title) {
            var ajax_options = {
                type: 'GET',
                url: 'api/exercise/get_ex_type_list',
                accepts: 'application/json',
                dataType: 'json',
                data: {'document_title': document_title}
            };
            $.ajax(ajax_options)
                .done(function(data) {
                    $body.trigger('model_get_ex_type_list_success', [data]);
                })
        },

        'post_ex_attempt': function(ex_id, topic_word_index, guess) {
            var ajax_options = {
                type: 'GET',
                url: 'api/grader/post_ex_attempt',
                data: {
                    ex_id: ex_id,
                    topic_word_index: topic_word_index,
                    guess: guess
                }
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $body.trigger('model_post_ex_attempt_success', data);
            })
            // TODO setup fail case
            .fail(function(xhr, textStatus, errorThrown) {
                // $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            });
        }

    }
}());

ns.view = (function() {
    return {
        'print_ex': function(ex_json) {
            if ($('#exercise').length > 0) {
                $('#exercise').remove();
            }
            if (ex_json) {

                ex_text_inputs = {}

                var $ex = $('<p>');

                for (var i = 0; i < ex_json.length; i++) {

                    // Need to account for punctuation chars having their own index.
                    var words = ex_json[i].sentence_text.split(/(?=[-—.,!?:;'"“«› ])|(?<=['"„»‹])/g);

                    var snt_fragment = "";

                    if (ex_json[i].paragraph_start
                        && i != 0) {
                        $ex.append("<br><br>");
                    }

                    // Get index of all topic words for this sentence.
                    var tw_indices = [];
                    for (var j = 0; j < ex_json[i].topic_words.length; ++j) {
                        var tw = ex_json[i].topic_words[j];
                        tw_indices.push(tw.index);
                        var key = tw.index + "_" + ex_json[i]._id.$oid;
                    }

                    for (var j = 0; j < words.length; ++j) {
                        var tw_index = $.inArray(j, tw_indices);
                        if (tw_index > -1) {
                            $ex.append($('<span>', {
                                text: snt_fragment + " ",
                                class: 'ex_span'
                            }));
                            snt_fragment = " ";
                            var tw_obj = ex_json[i].topic_words[tw_index];

                            // Make special placeholder notes for verbs
                            // The verb lemma itself is usually not enough
                            // information to make an informed guess.
                            var placeholder = '';
                            if (tw_obj.type == 'verb') {
                                var verb_form = clean_verb_form[tw_obj.feats.VerbForm];
                                if (tw_obj.feats.Tense) {
                                    var verb_tense = clean_verb_tense[tw_obj.feats.Tense];
                                    placeholder = tw_obj.lemma + ' (' + verb_form + ', ' + verb_tense + ')';
                                } else {
                                    placeholder = tw_obj.lemma + ' (' + verb_form + ')';
                                }
                            } else {
                                placeholder = tw_obj.lemma;
                            }

                            var id = j + '_' + ex_json[i]._id.$oid;
                            ex_text_inputs[id] = {}
                            ex_text_inputs[id]['normal'] = placeholder;
                            ex_text_inputs[id]['cheater'] = tw_obj.text;

                            if (is_cheater_mode) {
                                placeholder = ex_text_inputs[id]['cheater'];
                            } else {
                                placeholder = ex_text_inputs[id]['normal'];
                            }

                            $ex.append($('<input>', {
                                id: id,
                                tw_index: j,
                                mongo_id: ex_json[i]._id.$oid,
                                placeholder: placeholder,
                                class: 'ex_word ' + tw_obj.type
                            }));
                        } else {
                            snt_fragment += words[j];
                        }
                    }
                    $ex.append($('<span>', { text: snt_fragment }));
                    $('#exercise_div').append($ex);
                }
            };
        },


        'clear_ex': function() {
            $('#exercise_div').empty();
        },

        'fill_document_select': function(doc_list) {
            $.each(doc_list, function(i, title) {
                $('#document_select').append($('<option>', {
                    text: title,
                    id: title
                }));
            })
        },

        'clear_ex_type_select': function() {
            $('#ex_type_select').empty();
            $('#ex_type_select').append($('<option>', {
                text: 'exercise type',
            }));
        },

        'fill_ex_type_select': function(ex_type_list) {
            $.each(ex_type_list, function(i, name) {
                $('#ex_type_select').append($('<option>', {
                    text: name,
                    id: 'ex_' + name
                }));
            })
        },

        'grade_attempt': function($input, grade_result) {
            $input.addClass('answered');
            if(grade_result['is_correct']) {
                $input.addClass('correct');
            } else {
                $input.addClass('incorrect');
            }
        }

    }
}());

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
                var $next = $(this).nextAll('.ex_word');
                if ($next.length > 0) {
                    $next.first().focus();
                } else {
                    $('#new_ex').focus();
                }
            }
        })
    };

    $('#new_ex').click(function() {
        view.clear_ex();
        model.get_paragraph($('#document_select').val(), -1, [$('#ex_type_select').val()]);
    });

    $('#document_select').change(function() {
        model.get_ex_type_list($('#document_select').val());
        view.clear_ex_type_select();
    });

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

    $body.on('model_get_ex_success', function(x, data) {
        view.print_ex(data);
        init_ex_words();
    });

    $body.on('model_get_document_list_success', function(x, data) {
        view.fill_document_select(data);
    });

    $body.on('model_get_ex_type_list_success', function(x, data) {
        view.fill_ex_type_select(data);
    });

    $body.on('model_post_ex_attempt_success', function(x, data) {
        var $input = $('#' + data['topic_word_index'] + '_' + data['ex_id'].$oid);
        view.grade_attempt($input, data);
    });

}(ns.model, ns.view));


$(function() {
    ns.model.get_document_list();
});

