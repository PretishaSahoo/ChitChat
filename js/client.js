
const socket = io('http://localhost:8000');

const form =document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".mainBox");
const music=new Audio('ting.mp3');


const append=(message,position )=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;

    const sanitizedClassName = position.replace(/[^a-zA-Z0-9-_]/g, '');

    messageElement.classList.add("message");
    messageElement.classList.add("fs-5");
    messageElement.classList.add("fw-lighter");
    messageElement.classList.add(sanitizedClassName);
    messageContainer.append(messageElement);
    
    messageContainer.scrollTop = messageContainer.scrollHeight;
    music.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=" ";
})

const namee=prompt("Enter your name to join:");
socket.emit('new-user-joined',namee);

socket.on('user-joined', namee=>{
    append(`${namee}-joined-the-chat!`,'mid')
})

socket.on('recieve', data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('leave', namee=>{
    append(`${namee}-left-the-chat!`,'mid');
})