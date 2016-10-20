$(function() {
// Initialize variables
var $window = $(window);
var $usernameInput = $('.usernameInput'); // Input for username
var $loginPage = $('.login.page'); // The login page

// Prompt for setting a username
var username;
var connected = false;
var typing = false;
var lastTypingTime;
var $currentInput = $usernameInput.focus();

var socket = io();

// Keyboard events

$window.keydown(function (event) {
// Auto-focus the current input when a key is typed
	if (!(event.ctrlKey || event.metaKey || event.altKey)) {
	  $currentInput.focus();
	}
	// When the client hits ENTER on their keyboard
	if (event.which === 13 || event.keycode == 13) {
	  if (username) {
	    sendMessage();
	    socket.emit('stop typing');
	    typing = false;
	  } else {
	    setUsername();
	  }
	}
});



// $usernameInput.keydown(function (e) {
// 	console.log('enter');
//     if (e.keyCode == 13) {
//         // Do something
//          alert('you pressed enter ^_^');
//     }
// });
// Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "Welcome to Socket.IO Chat – ";
    console.log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant!";
    } else {
      message += "there are " + data.numUsers + " participants!";
    }
    console.log(message);
  }

// Sets the client's username
function setUsername () {
	username = cleanInput($usernameInput.val().trim());

	// If the username is valid
	if (username) {
	  $loginPage.fadeOut();
	  // $chatPage.show();
	  $loginPage.off('click');
	  // $currentInput = $inputMessage.focus();

	  // Tell the server your username
	  socket.emit('add user', username);
	}
}

// Prevents input from having injected markup
function cleanInput (input) {
return $('<div/>').text(input).text();
}



});

