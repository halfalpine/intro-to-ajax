
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
        items.push('<li class="article"><a class="title" href="#">' + headline + '</a><p class="lead">' + lead + '</p></li>');
      });
      console.log(pureCity(city));
      $('#nytimes-articles').append(function() {
        return items.join('');
      });
    });

    return false;
}

$('#form-container').submit(loadData);
