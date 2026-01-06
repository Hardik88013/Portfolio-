/* TYPING EFFECT */
const text = ["Java Developer", "Python Programmer", "ML & DSA Enthusiast"];
let index = 0, char = 0;
const typing = document.querySelector(".typing");

function type() {
    if (char < text[index].length) {
        typing.textContent += text[index][char++];
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (char > 0) {
        typing.textContent = text[index].substring(0, --char);
        setTimeout(erase, 50);
    } else {
        index = (index + 1) % text.length;
        setTimeout(type, 300);
    }
}
type();

/* THEME TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
};

/* PARTICLES */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.6)";
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();
