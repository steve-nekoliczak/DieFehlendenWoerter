
ns = {};
var article_stats = {};

// article: criteria
var cases = ['Nom', 'Acc', 'Dat', 'Gen'];
var defs = ['Def', 'Ind'];
var genders = ['Masc', 'Fem', 'Neut', 'Plur'];
// article: code to english dicts
var d_cases = {
    'Nom': 'nominative',
    'Acc': 'accusative',
    'Dat': 'dative',
    'Gen': 'genitive'
};
var d_defs = {
    'Def': 'definite',
    'Ind': 'indefinite'
};
var d_genders = {
    'Masc': 'masculine',
    'Fem': 'feminine',
    'Neut': 'neutral',
    'Plur': 'plural'
};
// checkbox id to case name
var d_checkbox_name = {
    "art_nom_checkbox": 'Nom',
    "art_acc_checkbox": 'Acc',
    "art_dat_checkbox": 'Dat',
    "art_gen_checkbox": 'Gen'
};
// checkbox id to chart id
var d_checkbox_chart = {
    "art_nom_checkbox": 'article_Nom_chart',
    "art_acc_checkbox": 'article_Acc_chart',
    "art_dat_checkbox": 'article_Dat_chart',
    "art_gen_checkbox": 'article_Gen_chart'
};


// colors
var lightblue = 'rgba(54, 162, 235, 0.2)';
var salmon = 'rgba(255, 99, 132, 0.2)';
var yellow = 'rgba(255, 206, 86, 0.75)';
var lightgreen = 'rgba(75, 192, 192, 0.75)';
var lightred = 'rgba(255, 0, 0, 0.25)';
var black = 'rgba(0,0,0,0.5)';
var lightgray = 'rgba(113,113,113,0.25)';

ns.model = (function(){
    var $body = $('body');

    return {

        // def get_stats(ex_type, from_datetime=None, to_datetime=None):
        'get_stats': function(ex_type, from_datetime, to_datetime) {
            var ajax_options = {
                type: 'GET',
                url: 'api/visualizer_data/get_stats',
                accepts: 'application/json',
                dataType: 'json',
                data: {'ex_type': ex_type,
                       'from_datetime': from_datetime,
                       'to_datetime': to_datetime}
            };
            $.ajax(ajax_options)
                .done(function(data) {
                    if (ex_type == 'article') {
                        article_stats = data;
                    }
                    // $body.trigger('model_get_stats_success', [data]);
                })
            /*
            // TODO setup fail case
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
            */
        },
    }
}());

ns.view = (function() {
    return {

        gen_article_chart: function (charts_data, case_) {
            var chart_id = 'article_' + case_ + '_chart';
            $('#chart_div').append($('<canvas>', {
                id: chart_id,
                width: '50px',
                height: '50px'
            }));

            var correct_data = [];
            var total_data = [];
            $.each(genders, function(i, gender) {
                // These keys need to match the keys of the json dict coming in from the get_ calls.
                var def_correct_key = case_ + '_Def_' + gender + '_correct';
                var ind_correct_key = case_ + '_Ind_' + gender + '_correct';
                correct_data.push(charts_data[def_correct_key] + charts_data[ind_correct_key]);

                var def_total_key = case_ + '_Def_' + gender + '_total';
                var ind_total_key = case_ + '_Ind_' + gender + '_total';
                total_data.push(charts_data[def_total_key] + charts_data[ind_total_key]);
            });

            var genders_local = [];
            $.each(genders, function(i, v) {
                genders_local.push(d_genders[v]);
            });
            var chartData = {
                labels: genders_local,
                datasets: [
                    {
                        label: 'correct',
                        backgroundColor: lightgreen,
                        data: correct_data,
                        fill: true,
                    }, {
                        label: 'total',
                        backgroundColor: lightgray,
                        data: total_data,
                        fill: true,
                    }
			    ]
            };

			window.myBar = new Chart( $('#' + chart_id), {
                    type: 'radar',
                    data: chartData,
                    responsive: true,
                    showTooltips: true,
                    options: {
                        title: {
                            display: true,
                            text: 'article - ' + d_cases[case_]
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'index',
                            intersect: true,
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    var i = tooltipItem.datasetIndex;
                                    var this_val = tooltipItem.yLabel;
                                    var output = data.datasets[i].label + ': ' + this_val ; // + ' (' + + ')';
                                    if (data.datasets[i].label == 'correct') {
                                        // i+1 assumes the next data set is the total count.
                                        var total = data.datasets[i+1].data[tooltipItem.index];
                                        var percent = Math.round((this_val / total) * 100);
                                        output += ' (' + percent + '%)';
                                    }
                                    return output;
                                }
                            }
                        },
                    }
			});
        },

        remove_article_chart: function(chart_id) {
            $('#' + chart_id).remove();
        },

    }
}());

ns.controller = (function(m, v) {

    var $body = $('body');
    var model = m,
        view = v;

    $('.article_checkbox').click(function() {
        if ($(this).is(':checked', true)) {
            view.gen_article_chart(article_stats, d_checkbox_name[$(this).attr('id')]);
        } else {
            view.remove_article_chart(d_checkbox_chart[$(this).attr('id')]);
        }
    });

}(ns.model, ns.view));


$(function() {
    ns.model.get_stats('article', undefined, undefined);
});

