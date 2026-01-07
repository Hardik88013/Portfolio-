/* ============================
   TYPING EFFECT (ONE AT A TIME)
============================ */
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
let deleting = false;

const typing = document.querySelector(".typing");

function typeEffect() {
  const text = roles[roleIndex];

  if (!deleting) {
    typing.textContent = text.slice(0, charIndex++);
    if (charIndex > text.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typing.textContent = text.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

/* ============================
   THEME TOGGLE (DARK/LIGHT)
============================ */
const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};
/* ============================
   SCROLL REVEAL
============================ */
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
/* ============================
   COUNTER ANIMATION
============================ */
const counters = document.querySelectorAll(".counter");

const runCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;

    const update = () => {
      const increment = Math.ceil(target / 80);
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
};

let counterStarted = false;
window.addEventListener("scroll", () => {
  const achievements = document.getElementById("achievements");
  if (!achievements) return;

  const top = achievements.getBoundingClientRect().top;
  if (top < window.innerHeight && !counterStarted) {
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
    const sectionTop = section.offsetTop - 140;
    if (scrollY >= sectionTop) {
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
