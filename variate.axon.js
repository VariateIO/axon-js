
if(!window.jQuery) {
  throw "jquery not found!";
}

$(function() {
  var cookieName = 'variate-axon';
  var assignment = $.cookie(cookieName);
  if(!assignment) {
    $.ajax({
      url: 'http://api.local.variate.io/'
    }).done(function(data) {
      assignment = data;
      $.cookie(cookieName, assignment);
      onAssignment(assignment);
    });
  } else {
    onAssignment(assignment);
  }
  function onAssignment(assignment) {
    var color = 'red';
    if(assignment == 0) {
      color = 'blue';
    }
    $('body').css('background-color', color);
  }  
});