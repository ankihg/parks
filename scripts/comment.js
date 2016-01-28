(function(module){

var comment = {};
var dataRef = new Firebase('https://scorching-inferno-738.firebaseio.com/');


comment.handleButton = function(ctx, next){
  $('#comment-button').on('click', function(evt){
    evt.preventDefault();
    // var parkId = ctx.params.id;
    // console.log('parkid: ',parkId);
    console.log('parkid: ',ctx.params.id);
    var commentBody = $('#comment-input').val();
    var park = $('#parkName-input').val();
    dataRef.push({id: ctx.params.id, name: park, text: commentBody});
    $('#comment-input').val('');
    $('#parkName-input').val('');
  });
};

comment.loadAll = function(ctx, next){
  $('#comment-list').empty();
  dataRef.on('child_added', function(snapshot) {
    var newComment = snapshot.val();
    console.log('appending ctx: ',ctx.params.id);
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

// comment.handleButton();
// comment.loadAll();

  module.comment = comment;
})(window);
