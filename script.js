document.querySelector('.message-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const input = document.querySelector('#messageInput');
    const message = input.value.trim();
    
    if (message === '') return; // Do nothing if message is empty
    
    const messageList = document.querySelector('.message-list');
    const newMessage = document.createElement('div');
    newMessage.className = 'message user';
    newMessage.textContent = message;
    messageList.appendChild(newMessage);
    
    input.value = ''; // Clear the input field
    messageList.scrollTop = messageList.scrollHeight; // Scroll to the bottom
});
