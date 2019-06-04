
ns = {};
hints = {};
answers = {};

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

        'post_ex_attempt': function(ex_id, topic_word_index, guess) {
            var ajax_options = {
                type: 'GET',
                url: 'api/exercise/post_ex_attempt',
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

                var $ex = $('<p>');

                for (var i = 0; i < ex_json.length; i++) {

                    // Need to account for punctuation chars having their own index.
                    var words = ex_json[i].sentence_text.split(/(?=[-—.,!?:'"“«› ])|(?<=['"„»‹])/g);

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
                        hints[key] = tw.feats;
                        answers[key] = tw.text;
                    }

                    for (var j = 0; j < words.length; ++j) {
                        var tw_index = $.inArray(j, tw_indices);
                        if (tw_index > -1) {
                            $ex.append($('<span>', {
                                text: snt_fragment + " ",
                                class: 'ex_span'
                            }));
                            snt_fragment = " ";
                            $ex.append($('<input>', {
                                id: j + '_' + ex_json[i]._id.$oid,
                                tw_index: j,
                                mongo_id: ex_json[i]._id.$oid,
                                placeholder: ex_json[i].topic_words[tw_index].lemma,
                                class: 'ex_word ' + ex_json[i].topic_words[tw_index].type
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

        'grade_attempt': function($input, grade_result) {
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
        $('.ex_word').blur(function() {
            if (!($(this).val() === '')) {
                model.post_ex_attempt(
                    $(this).attr('mongo_id'),
                    $(this).attr('tw_index'),
                    $(this).val()
                );
            }
        })
    };

    $('#new_ex').click(function() {
        view.clear_ex();
        model.get_paragraph($('#document_select').val(), -1, ['article']);
    });

    $body.on('model_get_ex_success', function(x, data) {
        view.print_ex(data);
        init_ex_words();
    });

    $body.on('model_get_document_list_success', function(x, data) {
        view.fill_document_select(data);
    });

    $body.on('model_post_ex_attempt_success', function(x, data) {
        var $input = $('#' + data['topic_word_index'] + '_' + data['ex_id']);
        view.grade_attempt($input, data);
    });

}(ns.model, ns.view));


$(function() {
    ns.model.get_document_list();
});

