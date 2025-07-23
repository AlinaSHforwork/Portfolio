// This file can be used for any interactive elements, like:
// - Smooth scrolling for navigation links
// - Form validation (though backend validation is crucial)
// - Simple animations or dynamic content loading

document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scroll for navigation links
    document.querySelectorAll('a.nav-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // You could add form submission handling here, but for a simple static site,
    // the mailto: link is often sufficient, or you'd use a service like Formspree.
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // e.preventDefault(); // Uncomment to prevent default form submission

            // Here you would typically send form data to a backend server
            // For a basic setup, you might just do:
            // alert('Message Sent! (Note: This is a placeholder. Actual sending requires a backend.)');
            // Or use a service like Formspree:
            // contactForm.action = "https://formspree.io/f/your_form_id";
            // contactForm.method = "POST";
            // contactForm.submit();
        });
    }
});





// Отримуємо посилання на контейнер тексту за унікальним ID
const draggableTextContainer = document.getElementById('draggableTextContainer');

// Змінні для відстеження стану перетягування
let isDown = false; // Чи натиснута кнопка миші/дотик
let startX;         // Початкова X-координата курсора/дотику
let scrollLeft;     // Початкова позиція прокрутки контейнера

// Обробник події "натискання миші"
draggableTextContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    draggableTextContainer.classList.add('active-dragging'); // Додаємо клас для візуальної індикації (можна використати для зміни курсора)
    startX = e.pageX - draggableTextContainer.offsetLeft;
    scrollLeft = draggableTextContainer.scrollLeft;
});

// Обробник події "відведення миші з елемента"
draggableTextContainer.addEventListener('mouseleave', () => {
    isDown = false;
    draggableTextContainer.classList.remove('active-dragging');
});

// Обробник події "відпускання кнопки миші"
draggableTextContainer.addEventListener('mouseup', () => {
    isDown = false;
    draggableTextContainer.classList.remove('active-dragging');
});

// Обробник події "рух миші"
draggableTextContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Якщо кнопка не натиснута, нічого не робимо
    e.preventDefault();   // Запобігаємо стандартній поведінці браузера (наприклад, виділенню тексту)
    const x = e.pageX - draggableTextContainer.offsetLeft;
    const walk = (x - startX) * 2; // Розраховуємо відстань прокрутки (множимо на 2 для прискорення)
    draggableTextContainer.scrollLeft = scrollLeft - walk; // Змінюємо позицію прокрутки
});

// --- Підтримка для тач-пристроїв ---

// Обробник події "початок дотику"
draggableTextContainer.addEventListener('touchstart', (e) => {
    isDown = true;
    // e.touches[0] отримує дані першого дотику
    startX = e.touches[0].pageX - draggableTextContainer.offsetLeft;
    scrollLeft = draggableTextContainer.scrollLeft;
});

// Обробник події "закінчення дотику"
draggableTextContainer.addEventListener('touchend', () => {
    isDown = false;
});

// Обробник події "рух дотику"
draggableTextContainer.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - draggableTextContainer.offsetLeft;
    const walk = (x - startX) * 2;
    draggableTextContainer.scrollLeft = scrollLeft - walk;
});

