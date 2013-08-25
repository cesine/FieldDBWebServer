function reindex(pouchname) {

  $('#innerProgressBar').width(0).html('&nbsp;');
  $('#progressBar').css('display', 'inline-block');
  $('#progressBar').show();
  var url = 'https://lexicondev.lingsync.org/train/lexicon/' + pouchname;
  var checks = 0;

  $.post(url, JSON.stringify({})).done(function(response) {

    var total = response.rows.length;
    for (var i = 0; i < total; i++) {
      (function(index) {

        var url = 'http://searchdev.lingsync.org/' + pouchname + '/datums/' + response.rows[index].id;
        var data = response.rows[index].key;

        $.post(url, JSON.stringify(data)).done(function(response2) {
          var pct = Math.round(checks / (total - 1) * 100);
          if (pct < 99) {
            progress(pct, $('#progressBar'));
          }
          checks++;
          if (checks === total - 1) {
            $('#innerProgressBar').width($('#progressBar').width());
            $('#innerProgressBar').html('<strong>' + checks + '</strong> records indexed.&nbsp;&nbsp;');
            $('#progressBar').delay(9000).hide(600);
          }
        });

      })(i);
    }

  });

}

function progress(percent, $element) {
  var progressBarWidth = percent * $element.width() / 100;
  $('#innerProgressBar').width(progressBarWidth).html(percent + '%&nbsp;');
}

function clearresults() {
  $('#dataresult').hide();
  $('#clearresults').hide();
}

var searchForm = $('#searchCorpus');
searchForm.submit(function() {

  var data = searchForm.serializeArray()[0];
  var url = searchForm.attr('action');
  console.log(data);
  $.post(url, data).done(function(response) {
    console.log(response);
    $('#dataresult').show();
    $('#clearresults').show();
    $('#dataresult').JSONView(JSON.stringify(response.hits));
  });

  return false;

});
