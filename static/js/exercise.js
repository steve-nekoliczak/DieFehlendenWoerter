
let ns = {};

ns.model = (function(){
    let $body = $('body');

    return {
        'get_paragraph': function(document_title, paragraph_index, ex_types) {
            let ajax_options = {
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

                $ex = $('<p>');


                for (i = 0; i < ex_json.length; ++i) {

                    // Need to account for punctuation chars having their own index.
                    words = ex_json[i].sentence_text.split(/(?=[.,!?„“»« ])/g);
                    snt_fragment = "";

                    if (ex_json[i].paragraph_start
                        && i != 0) {
                        $ex.append("<br><br>");
                    }

                    // Get index of all topic words for this sentence.
                    tw_indices = [];
                    $.each(ex_json[i].topic_words, function(i, tw) {
                        tw_indices.push(tw.index);
                    })

                    for (j = 0; j < words.length; ++j) {
                        if ($.inArray(j, tw_indices) > -1) {
                            $ex.append($('<span>', { text: snt_fragment + " " }));
                            snt_fragment = " ";

                            $in = $('<input>', {
                                id: j + "_" + ex_json[i]._id.$oid
                            });
                            $ex.append($in);
                        } else {
                            snt_fragment += words[j];
                        }
                    }
                    $ex.append($('<span>', { text: snt_fragment }));
                    $('#exercise_div').append($ex);
                }
            };
        },
    }
}());

ns.controller = (function(m, v) {

    let $body = $('body');
    let model = m,
        view = v;

    $('#new_ex').click(function() {
        model.get_paragraph('Der Engel', '0', ['article']);
    });

    $body.on('model_get_ex_success', function(x, data) {
        view.print_ex(data);
        $('#missing-word').focus();
    });
}(ns.model, ns.view));

