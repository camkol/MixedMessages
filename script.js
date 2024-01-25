// Selecting relevant DOM elements
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

// Initializing variables
let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// Function to create a chat li element with the provided message and class name
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Function to generate a response from pre-defined answers
const generateResponse = () => {
  const responses = [
    "I'm not sure about that.",
    "That's an interesting question!",
    "I need to think about that.",
    "Let me check my database...",
    "Hmm, let me provide you with some information.",
    "I'm still learning, but I'll do my best!",
    "Ask me again in a minute.",
    "I'm on a coffee break, but I'll get back to you.",
    "Life's full of mysteries, isn't it?",
    "Let me consult with my virtual crystal ball...",
    "Why don't we ponder the meaning of life instead?",
    "I'm feeling witty today: What did one chatbot say to the other? I'm byte-sized and ready to chat!",
    "Knock, knock. Who's there? Chatbot. Chatbot who? Chatbot that's what I'm here for!",
    "What's a chatbot's favorite movie? The Social Network!",
    "Why don't chatbots ever get tired? They have plenty of bytes!",
    "How does a chatbot express its feelings? In binary code!",
    "I'm not just a chatbot; I'm a chatBFF (Best Friend Forever)!",
  ];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Function to handle user input and initiate chat
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." while waiting for the chatbot's response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      // Generate a response and update the chat
      const responseMessage = generateResponse();
      const responseChatLi = createChatLi(responseMessage, "incoming");
      chatbox.appendChild(responseChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 600);
  }, 600);
};

// Event listeners for input changes, Enter key, and button click
chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without shift key and the window width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);

// Event listeners for chatbot toggling and closing
chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
