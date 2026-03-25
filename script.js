/* ============================
   THEME TOGGLE (DARK / LIGHT)
============================ */
const toggle = document.getElementById("themeToggle");

// Load saved preference
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.className = savedTheme;
toggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

toggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  document.body.classList.remove("dark", "light");
  document.body.classList.add(isDark ? "light" : "dark");
  toggle.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

/* ============================
   SCROLL REVEAL
============================ */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < triggerBottom) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ============================
   COUNTER ANIMATION
============================ */
function runCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;

    const update = () => {
      const increment = Math.ceil(target / 70);
      count += increment;
      if (count < target) {
        counter.textContent = count;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

let counterStarted = false;
window.addEventListener("scroll", () => {
  const achievements = document.getElementById("achievements");
  if (!achievements) return;
  if (achievements.getBoundingClientRect().top < window.innerHeight && !counterStarted) {
    runCounters();
    counterStarted = true;
  }
});

/* ============================
   NAVBAR ACTIVE LINK
============================ */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 160) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ============================
   STAR BACKGROUND (DARK ONLY)
============================ */
const canvas = document.getElementById("stars");
const ctx    = canvas.getContext("2d");
let w, h, stars = [];

function resizeCanvas() {
  w = canvas.width  = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars(count = 130) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.15 + 0.05,
      alpha: Math.random(),
      blink: Math.random() * 0.02 + 0.005
    });
  }
}
createStars();

function animateStars() {
  ctx.clearRect(0, 0, w, h);

  // Only draw stars if dark mode
  if (document.body.classList.contains("dark")) {
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > h) star.y = 0;
      star.alpha += star.blink;
      if (star.alpha <= 0 || star.alpha >= 1) star.blink *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147, 197, 253, ${star.alpha})`;
      ctx.fill();
    });
  }

  requestAnimationFrame(animateStars);
}
animateStars();

/* ============================
   ACHIEVEMENT TABS
============================ */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // Update buttons
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Update panes
    tabPanes.forEach(p => p.classList.remove("active"));
    const activePane = document.getElementById(`tab-${target}`);
    if (activePane) activePane.classList.add("active");

    // Re-run counters if switching to coding or gfg tab
    counterStarted = false;
    runCounters();
  });
});

/* ============================
   RESUME TABS
============================ */
const resTabBtns = document.querySelectorAll(".resume-tab-btn");
const resTabPanes = document.querySelectorAll(".resume-pane");

resTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    // Update buttons
    resTabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Update panes
    resTabPanes.forEach(p => p.classList.remove("active"));
    const activePane = document.getElementById(target);
    if (activePane) activePane.classList.add("active");
  });
});

/* ============================
   CERTIFICATE LIGHTBOX
============================ */
function openLightbox(src, caption) {
  // Only open if image actually exists (not placeholder)
  const lb = document.getElementById("certLightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  img.src = src;
  cap.textContent = caption;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = document.getElementById("certLightbox");
  lb.classList.remove("open");
  document.body.style.overflow = "";
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ============================
   TYPING EFFECT (HERO)
============================ */
const typingElement = document.getElementById("typing-text");
const roles = [
  "Computer Science Undergraduate",
  "Java Developer",
  "Python Developer",
  "C++ Programmer",
  "ML & DSA Enthusiast",
  "DevOps Learner"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 120;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

/* ============================
   ASHIRWAD MEDICOS SLIDER
============================ */
function initAshirwadSlider() {
  const slider = document.querySelector('.ashirwad-slider');
  if (!slider) return;
  const slides = slider.querySelectorAll('img');
  let current = 0;
  
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
  initAshirwadSlider();
});
