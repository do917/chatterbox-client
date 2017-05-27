// YOUR CODE HERE:

var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  setInterval(this.fetch, 100);
  // app.fetch();
  this.handleSubmit();
  this.handleUsernameClick();
  this.friends = [];
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
      for (var i = 0; i < 10; i++) {
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

// app.renderPerTime = function() {
//   setInterval(function() {
//     app.fetch.bind(this, message);
//   }, 10);
// };

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<option class="room">${roomName}</option>`);
};

app.handleUsernameClick = function() {
  $('.username').on('click', function() {
    console.log('BOO');
  });
};

app.handleSubmit = function() {
  $('.username').click(function() {
    //NEED TO FILL IN
  });
};

$(document).ready(function() {
  app.init();
});