document.addEventListener("DOMContentLoaded", function () {
    const usernameContainer = document.getElementById("usernameContainer");
    const chatboxContainer = document.getElementById("chatboxContainer");
    const usernameInput = document.getElementById("usernameInput");
    const setUsernameBtn = document.getElementById("setUsernameBtn");
    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("messageInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");

    let username = "";

    const loadChatHistory = () => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatbox.innerHTML = "";
        chatHistory.forEach(chat => {
            displayMessage(chat.username, chat.message);
        });
    };

    const saveChat = (username, message) => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({ username, message });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    };

    const displayMessage = (user, message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        if (user === username) {
            messageElement.classList.add("sent");
        } else {
            messageElement.classList.add("received");
        }

        messageElement.textContent = `${user}: ${message}`;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    };

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

    sendMessageBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message) {
            displayMessage(username, message);
            saveChat(username, message);
            messageInput.value = "";
        }
    });

    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessageBtn.click();
        }
    });

    setInterval(loadChatHistory, 1000);
});
