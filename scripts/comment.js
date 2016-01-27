(function(module){

var comment = {};
var dataRef = new Firebase('https://scorching-inferno-738.firebaseio.com/');


comment.handleButton = function(){
  $('#comment-button').on('click', function(evt){
    evt.preventDefault();
    // console.log(ctx);
    // console.log(ctx.params);
    // var commentId = ctx.params.id;
    var commentBody = $('#comment-input').val();
    var park = $('#parkName-input').val();
    dataRef.push({name: park, text: commentBody});
    $('#comment-input').val('');
    $('#parkName-input').val('');
  });
};

comment.loadAll = function(){
  // console.log(ctx);
  // console.log(ctx.params.id);
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

comment.handleButton();
comment.loadAll();

  module.comment = comment;
})(window);
