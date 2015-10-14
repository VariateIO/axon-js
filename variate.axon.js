
if(!window.jQuery) {
  throw "jquery not found!";
}

$(function() {
  $.ajax({
    url: 'http://api.variate.io/'
  }).done(function(data) {
    console.log(data);
  });
});