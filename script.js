document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("messageInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");

    let username = localStorage.getItem("username") || "Guest";

    const loadChatHistory = () => {
        try {
            const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
            chatbox.innerHTML = ""; // Clear the chatbox
            chatHistory.forEach(chat => {
                displayMessage(chat.username, chat.message);
            });
        } catch (error) {
            console.error("Error loading chat history:", error);
        }
    };

    const saveChat = (username, message) => {
        try {
            const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
            chatHistory.push({ username, message });
            localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        } catch (error) {
            console.error("Error saving chat:", error);
        }
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

        // Scroll to the bottom
        chatbox.scrollTop = chatbox.scrollHeight;
    };

    sendMessageBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (message) {
            displayMessage(username, message);
            saveChat(username, message);
            messageInput.value = ""; // Clear the input field
        }
    });

    messageInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default action of Enter key
            sendMessageBtn.click();
        }
    });

    // Load chat history on page load
    loadChatHistory();
});
