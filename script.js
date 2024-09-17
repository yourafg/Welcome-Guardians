document.addEventListener("DOMContentLoaded", function () {
    const usernameContainer = document.getElementById("usernameContainer");
    const chatboxContainer = document.getElementById("chatboxContainer");
    const usernameInput = document.getElementById("usernameInput");
    const setUsernameBtn = document.getElementById("setUsernameBtn");
    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("messageInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");

    let username = "";

    // Load chat history from localStorage
    const loadChatHistory = () => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatbox.innerHTML = "";  // Clear the chatbox
        chatHistory.forEach(chat => {
            displayMessage(chat.username, chat.message);
        });
    };

    // Save chat history to localStorage
    const saveChat = (username, message) => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({ username, message });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    };

    // Display a message in the chatbox
    const displayMessage = (user, message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (user === username) {
            messageElement.classList.add("sent");
        } else {
            messageElement.classList.add("received");
        }

        messageElement.textContent = ${user}: ${message};
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to the bottom
    };

    // Set username and show chatbox
    setUsernameBtn.addEventListener("click", function () {
        username = usernameInput.value.trim();
        if (username) {
            usernameContainer.style.display = "none";
            chatboxContainer.style.display = "flex";
            loadChatHistory();
        } else {
            alert("Please enter a username");
        }
    });

    // Send message
    sendMessageBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message) {
            displayMessage(username, message);
            saveChat(username, message);
            messageInput.value = "";
        }
    });

    // Enter key to send message
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessageBtn.click();
        }
    });

    // Simulate real-time update: Refresh the chatbox every 1 second
    setInterval(loadChatHistory, 1000);
});