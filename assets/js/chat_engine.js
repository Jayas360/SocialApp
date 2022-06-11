
const chatEngine = (chatBoxId, userEmail) => {
    var socket = io.connect('http://3.109.122.222:5000');

    // var input = document.getElementById('chat-message');
    // var btn = document.getElementById('send-message');

    // btn.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if(input.value){
    //         console.log(input.value);
    //     }
    // })
    

    socket.on('connect', () => {
        console.log('connection established using sockets...!');

        socket.emit('join_room', {
            user_email: userEmail,
            chatroom: 'codeial'
        })

        socket.on('user_joined', function(data){
            console.log('a user joined', data);
        });
    });

    //send a message on clicking the send message button
    $('#send-message').click(function(){
        let msg = $('#chat-message').val();

        if(msg != ''){
            //console.log(msg);
            socket.emit('send_message', {
                message: msg,
                user_email: userEmail,
                chatroom: 'codeial'
            })
        }
    });

    socket.on('receive_message', (data) => {
        console.log('received message', data.message);

        let newMessage = $('<li>');

        let messageType = 'other-message';

        if(data.user_email == userEmail){
            messageType = 'self-message';
        }

        newMessage.append($('<span>', {
            'html': data.message
        }));
        newMessage.append($('<sub>', {
            'html': data.user_email
        }));
        newMessage.addClass(messageType);

        $('#chat-message-list').append(newMessage);
    });

}

// class ChatEngine{
//     constructor(){
//         console.log("inside constructor");
//         // this.chatBox = $(`#${chatBoxId}`);
//         // this.userEmail = userEmail;

//         //io is an global variable as soon as we included cdnjs for socket.io in home.ejs
//         this.socket = io.connect('https//:localhost:5000');

//         // if(this.userEmail){
//         //     console.log('connection handler called');
//         //     this.connectionHandler();
//         // }
//     }

//     connectionHandler(){
//         console.log('inside connection handler');
//         // this.socket.on('connect', function(){
//         //     console.log('Connection established using sockets...!');
//         // });
//     }
// }