
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var street = $('#street').val();
    var city = $('#city').val();
    var location = street + ", " + city;
/*
    var nytURL = "https://api.nytimes.com/svc/topstories/v2/home.json";
    nytURL += '?' + $.param({
      'api-key': "53583737f41c443da8cce64008269fad",
      'callback': "Pittsburgh"
    });
*/
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + location + '">');
/*
    $.getJSON(nytURL, function(data) {
      console.log(data);
    });
*/
    return false;
}

$('#form-container').submit(loadData);
