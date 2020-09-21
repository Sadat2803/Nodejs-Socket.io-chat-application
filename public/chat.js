$(function(){
  var socket  = io.connect('http://localhost:3000')

  var message = $('#message')
  var username = $('#username')
  var send_message = $('#send_message')
  var send_username = $('#send_username')
  var chatroom = $('#chatroom')
  var feedback = $('#feedback')
  send_username.click(() => {
-    socket.emit('change_username',{username: username.val() })
  })

  send_message.click(() => {
    socket.emit('new_message',{username : username.val(), message: message.val() })
    message.val('')
  })

  message.bind('keypress',() => {
    socket.emit('typing')
  })

  socket.on('typing',(data) => {
    feedback.html("<p><i>"+data.username+" is typing a message..."+"<i></p>")
  })

  socket.on('new_message',(data) => {
    chatroom.append("<p class='message'>"+data.username+": "+data.message+"</p>")
    feedback.html("")
  })

})
