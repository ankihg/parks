(function(module){

var comment = {};
var dataRef = new Firebase('https://scorching-inferno-738.firebaseio.com/');

comment.handleButton = function(){
  $('#comment-button').on('click',function(evt){
    evt.preventDefault();
    var commentBody = $('#comment-input').val();
    var park = $('#parkName-input').val();
    dataRef.push({name: park, text: commentBody});
  });
  $('#comment-input').val('');
  $('#parkName-input').val('');
};

comment.loadAll = function(){
  dataRef.on('child_added', function(data) {
    var newComment = data.val();
    comment.displayComment(newComment.name, newComment.text);
  });
}
comment.displayComment = function(name,text){
  $('#comment-ul').append('<li id="'+name+'">'+text+'</li>');
};

comment.handleButton();
comment.loadAll();

  module.comment = comment;
})(window);
