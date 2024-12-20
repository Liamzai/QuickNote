const texts = [
    "记录灵感...",
    "记录会议要点...",
    "保存临时想法...",
    "快速做个备忘...",
    "记下这个链接..."
];

class TypeWriter {
    constructor(element, texts, typeSpeed = 100, eraseSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typeSpeed = typeSpeed;
        this.eraseSpeed = eraseSpeed;
        this.pauseTime = pauseTime;
        this.currentTextIndex = 0;
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const currentText = this.texts[this.currentTextIndex];
        const currentLength = this.element.innerText.length;
        
        if (!this.isDeleting) {
            if (currentLength < currentText.length) {
                this.element.innerText = currentText.substring(0, currentLength + 1);
                setTimeout(() => this.tick(), this.typeSpeed);
            } else {
                setTimeout(() => {
                    this.isDeleting = true;
                    this.tick();
                }, this.pauseTime);
            }
        } else {
            if (currentLength > 0) {
                this.element.innerText = currentText.substring(0, currentLength - 1);
                setTimeout(() => this.tick(), this.eraseSpeed);
            } else {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
                setTimeout(() => this.tick(), this.typeSpeed);
            }
        }
    }
}

AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('download-btn')) return;
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    new TypeWriter(typingElement, texts);
}); 