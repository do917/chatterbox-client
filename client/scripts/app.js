// YOUR CODE HERE:

var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  // setInterval(this.fetch, 1000);
  this.fetch();
  this.friends = [];
  this.userName = app.findUsername();
  this.roomList = [];
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
    data : 'order=-createdAt',
    
    success: function (data) {
      console.log('chatterbox: Message received');
      app.clearMessages();
      for (var i = 0; i < 10; i++) {
        app.renderMessage(data.results[i]);
        // app.roomList.push(data.results[i].roomname);
        app.renderRoom(data.results[i].roomname);
        // console.log(data.results[i].roomname);
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
  $('#chats').append(`<div class="messagebox"><ul class="username"><b>${username}:</b><br>${textMessage}</ul></div>`);
};

app.renderRoom = function(roomList) {
  $('#roomSelect').append(`<option class="room">${roomList}</option>`);
};

app.handleUsernameClick = function() {
  $('.username').click(function() {
    console.log('BOO');
  });
};

app.handleSubmit = function() {
  $('.submit').click(function() {
    var textMessage = $('.message').val();

    var message = {
      username: app.userName,
      text: textMessage,
      roomname: 'secretLobby' 
    };

    app.send(message);
    app.fetch();
    return false;
  });
};


app.findUsername = function() {
  var url = window.location.href;
  return url.slice(url.indexOf('username=') + 9);
};

$(document).ready(function() {
  app.init();
});
