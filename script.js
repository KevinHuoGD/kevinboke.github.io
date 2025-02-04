// 照片轮播功能
const images = document.querySelectorAll('.carousel img');
const dots = document.querySelectorAll('.carousel-dots .dot');
let current = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
}

function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
}

setInterval(nextImage, 5000);

document.querySelector('.next-btn').addEventListener('click', nextImage);
document.querySelector('.prev-btn').addEventListener('click', prevImage);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        current = index;
        showImage(current);
    });
});

// AI助手弹窗功能
const chatToggle = document.getElementById('chat-toggle');
const chatModal = document.getElementById('chat-modal');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.querySelector('#chat-input textarea');
const sendBtn = document.getElementById('send-btn');
const closeBtn = document.querySelector('.close-btn');

chatToggle.addEventListener('click', () => {
    chatModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    chatModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.style.display = 'none';
    }
});

function addMessage(text, isUser) {
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user' : 'ai'}`;
    message.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        // 模拟AI回复
        setTimeout(() => {
            addMessage("这是模拟回复。", false);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});

// 自动调整输入框高度
chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});