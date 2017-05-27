// YOUR CODE HERE:

var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  setInterval(this.fetch, 1000);
  this.friends = []
  this.userName = app.findUsername();
  // this.fetch();
  this.handleUsernameClick();
  this.handleSubmit();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    success: function (data) {
      console.log('chatterbox: Message received');
      app.clearMessages();
      for (var i = data.results.length -1; i > 0; i--) {
        app.renderMessage(data.results[i]);
      }  
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
};



app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  var textMessage = message.text;
  var username = message.username;
  $('#chats').append(`<ul class="username">${username}:<br>${textMessage}</ul>`);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<option class="room">${roomName}</option>`);
};

app.handleUsernameClick = function() {
  $('.username').click(function() {
    console.log('BOO');
  });
};

app.handleSubmit = function() {
  $('.submit').click(function() {
    var textMessage = $('.message').val()

    var message = {
      username: app.userName,
      text: textMessage,
      roomname: 'lobby'
    };

    app.send(message);
    return false;
  });
};

app.findUsername = function() {
  var url = window.location.href;
  return url.slice(url.indexOf('username=') + 9);
}

$(document).ready(function() {
  app.init();
});
