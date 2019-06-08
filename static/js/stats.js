
ns = {};

// article criteria
var cases = ['Nom', 'Acc', 'Dat', 'Gen'];
var defs = ['Def', 'Ind'];
var genders = ['Masc', 'Fem', 'Neut', 'Plur'];

// colors
var lightblue = 'rgba(54, 162, 235, 0.2)';
var salmon = 'rgba(255, 99, 132, 0.2)';
var yellow = 'rgba(255, 206, 86, 0.2)';
var lightgreen = 'rgba(75, 192, 192, 0.2)';

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

        gen_article_chart: function (charts_data, case_, def) {
            var chart_id = 'article_' + case_ + '_' + def + '_chart';
            $('#chart_div').append($('<canvas>', {
                id: chart_id,
                width: '50px',
                height: '30px'
            }));

            var correct_data = [];
            var total_data = [];
            $.each(genders, function(i, gender) {
                var correct_key = case_ + '_' + def + '_' + gender + '_correct';
                var total_key = case_ + '_' + def + '_' + gender + '_total';
                correct_data.push(charts_data[correct_key]);
                total_data.push(charts_data[total_key]);
            });
            var incorrect_data = [];
            $.each(correct_data, function(i, v) {
                incorrect_data.push(total_data[i] - correct_data[i]);
            });

            var barChartData = {
                labels: genders,
                datasets: [
                    {
                        label: 'correct',
                        backgroundColor: lightblue,
                        data: correct_data,
                        stack: 'answered'
                    }, {
                        label: 'incorrect',
                        backgroundColor: salmon,
                        data: incorrect_data,
                        stack: 'answered'
                    }, {
                        label: 'total',
                        backgroundColor: lightgreen,
                        data: total_data,
                        stack: 'total'
                    }
			    ]
            };

			window.myBar = new Chart( $('#' + chart_id), {
                    type: 'bar',
                    data: barChartData,
                    options: {
                        title: {
                            display: true,
                            text: case_ + ' ' + def
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                stacked: true,
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
			});
        },

        gen_article_charts: function(charts_data) {
            $.each(cases, function(i, case_) {
                $.each(defs, function(j, def) {
                    ns.view.gen_article_chart(charts_data, case_, def);
                })
            })
            // ns.view.gen_article_chart(charts_data, 'Nom', 'Def');
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

