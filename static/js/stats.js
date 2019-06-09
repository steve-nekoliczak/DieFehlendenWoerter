
ns = {};

// article criteria
var cases = ['Nom', 'Acc', 'Dat', 'Gen'];
var defs = ['Def', 'Ind'];
var genders = ['Masc', 'Fem', 'Neut', 'Plur'];

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
                    $body.trigger('model_get_stats_success', [data]);
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
                height: '30px'
            }));

            var correct_data = [];
            var total_data = [];
            $.each(genders, function(i, gender) {
                var def_correct_key = case_ + '_Def_' + gender + '_correct';
                var ind_correct_key = case_ + '_Ind_' + gender + '_correct';
                correct_data.push(charts_data[def_correct_key] + charts_data[ind_correct_key]);

                var def_total_key = case_ + '_Def_' + gender + '_total';
                var ind_total_key = case_ + '_Ind_' + gender + '_total';
                total_data.push(charts_data[def_total_key] + charts_data[ind_total_key]);
            });
            $.each(correct_data, function(i, v) {
            });

            var chartData = {
                labels: genders,
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
                            text: case_
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'index',
                            intersect: true,
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
                                }
                            }
                        },
                    }
			});
        },

        gen_article_charts: function(charts_data) {
            $.each(cases, function(i, case_) {
                $.each(defs, function(j, def) {
                    ns.view.gen_article_chart(charts_data, case_, defs);
                })
            })
        },

    }
}());

ns.controller = (function(m, v) {

    var $body = $('body');
    var model = m,
        view = v;

    $('#new_ex').click(function() {
    });

    $body.on('model_get_stats_success', function(x, data) {
        view.gen_article_charts(data);
    });

}(ns.model, ns.view));


$(function() {
    ns.model.get_stats('article', undefined, undefined);
});

