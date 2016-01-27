(function(module){

var comment = {};
var dataRef = new Firebase('https://scorching-inferno-738.firebaseio.com/');


comment.handleButton = function(ctx){
  $('#comment-button').on('click', function(evt){
    evt.preventDefault();
    var parkId = ctx.params.id;
    console.log(parkId);
    var commentBody = $('#comment-input').val();
    var park = $('#parkName-input').val();
    dataRef.push({name: park, text: commentBody});
    $('#comment-input').val('');
    $('#parkName-input').val('');
  });
};

comment.loadAll = function(){
  dataRef.on('child_added', function(snapshot) {
    var newComment = snapshot.val();
    console.log(newComment);
    comment.displayComment(newComment);
    console.log(newComment.name, newComment.text);
  });
}

comment.displayComment = function(comment){
  var template = Handlebars.compile($('#comment-template').text());
  $('#comment-list').append(template(comment));
};

// comment.handleButton();
comment.loadAll();

  module.comment = comment;
})(window);
