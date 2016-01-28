(function(module){

var comment = {};
var dataRef = new Firebase('https://scorching-inferno-738.firebaseio.com/');

function time() {
  var date = new Date();
  var thisDate = [date.getMonth()+1 , date.getDate(), date.getFullYear()];
  return thisDate.join('/');
}

comment.handleButton = function(){
  $('#comment-button').on('click', function(evt){
    evt.preventDefault();
    var parkId = window.location.pathname.split('/')[2];
    var commentBody = $('#comment-input').val();
    var park = $('#parkName-input').val();
    if (commentBody && park !== "") {
      dataRef.push({id: parkId, name: park, time: time(),  text: commentBody});
    };
      $('#comment-input').val('');
      $('#parkName-input').val('');
  });
};

comment.loadAll = function(ctx, next){
  $('#comment-list').empty();
  dataRef.on('child_added', function(snapshot) {
    var newComment = snapshot.val();
    if(newComment.id === ctx.params.id) {
      comment.displayComment(newComment);
    }
  });
  next();
}

comment.displayComment = function(comment){
  var template = Handlebars.compile($('#comment-template').text());
  $('#comment-list').append(template(comment));
};

comment.handleButton();

  module.comment = comment;
})(window);
