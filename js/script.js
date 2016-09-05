
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var street = $('#street').val();
    var city = $('#city').val();
    var location = street + ", " + city;
    var pureCity = function(cityStr) {
      var commaIndex = cityStr.search(',');
      return cityStr.slice(0, commaIndex);
    };

    var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytURL += '?' + $.param({
      'api-key': "53583737f41c443da8cce64008269fad",
      'q': pureCity(city)
    });

    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&meta=&indexpageids=1&generator=search&gsrsearch=' + city + '&gsrlimit=10&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet%7Ctitlesnippet&callback=?';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + location + '">');


    $.getJSON(nytURL, function(data) {
      var items = [];
      $.each(data.response.docs, function(key, value) {
        var headline = value.headline.main;
        var lead = value.lead_paragraph || 'Click link for content.';
        items.push('<li class="nyt-article"><a class="title" href="#">' + headline + '</a><p class="lead">' + lead + '</p></li>');
      });
      $('#nytimes-articles').append(function() {
        return items.join('');
      });
    }).fail(function() {
      console.log('foo');
      $('#nytimes-articles').html('Articles coule not be loaded!');
    });

    $.ajax({
      url: wikiURL,
      dataType: 'json',
      success: function(data) {
        var pages = data.query.pages;
        var items = [];
        for (var id in pages) {
          console.log(id);
          items.push('<li class="wiki-article"><a class="wiki-link" href="http://en.wikipedia.org/?curid=' + id + '" target="_blank">' + pages[id].title + '</a></li>');
        }
        console.log(items);
        $('#wikipedia-links').append(function() {
          return items.join('');
        });
      }
    });

    return false;
}

$('#form-container').submit(loadData);
