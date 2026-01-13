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
typing.textContent = " "; // reserve space before animation starts
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
/* ================= STAR BACKGROUND ================= */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// create stars
function createStars(count = 120) {
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

// animate stars
function animateStars() {
  ctx.clearRect(0, 0, w, h);

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

  requestAnimationFrame(animateStars);
}

animateStars();
/* ================= CERTIFICATE ROTATION ================= */

const certificates = [
  {
    title: "Placement Ace: Java Bootcamp",
    org: "Centre for Professional Enhancement, Lovely Professional University",
    duration: "June 2025 – July 2025",
    points: [
      "Strengthened core Data Structures & Algorithms.",
      "Solved competitive problems on LeetCode & Codeforces.",
      "Improved problem-solving speed and coding efficiency."
    ]
  },
  {
    title: "Decode C++ with DSA",
    org: "Physics Wallah (PW Skills)",
    duration: "June 2024",
    points: [
      "Learned C++ fundamentals with strong DSA concepts.",
      "Practiced arrays, recursion, stacks, queues, and trees.",
      "Built a solid base for competitive programming."
    ]
  }
];

let certIndex = 0;
const images = document.querySelectorAll(".certificate");

const titleEl = document.getElementById("certTitle");
const orgEl = document.getElementById("certOrg");
const durationEl = document.getElementById("certDuration");
const pointsEl = document.getElementById("certPoints");

setInterval(() => {
  images.forEach(img => img.classList.remove("active"));
  certIndex = (certIndex + 1) % certificates.length;
  images[certIndex].classList.add("active");

  const cert = certificates[certIndex];
  titleEl.textContent = cert.title;
  orgEl.textContent = cert.org;
  durationEl.textContent = cert.duration;

  pointsEl.innerHTML = cert.points.map(p => `<li>${p}</li>`).join("");
}, 5000); // change every 5 seconds
