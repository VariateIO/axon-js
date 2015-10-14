
if(!window.jQuery) {
  throw "jquery not found!";
}

$(function() {
  $.ajax({
    url: 'http://api.variate.io/'
  }).done(function(data) {
    var color = 'red';
    if(data == 0) {
      color = 'blue';
    }
    $('body').css('background-color', color);
  });
});