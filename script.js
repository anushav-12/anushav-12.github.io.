// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
navToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Expandable project panels
document.querySelectorAll(".project-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const isOpen = panel.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});

// Pipeline node clicks
const pipeDetail = document.getElementById("pipeDetail");
document.querySelectorAll(".pipe-node").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelectorAll(".pipe-node").forEach((n) => n.classList.remove("active"));
    node.classList.add("active");
    pipeDetail.textContent = node.getAttribute("data-detail");
  });
});

// RFM chart clicks
const rfmDefinitions = {
  champions: "Champions: bought recently, buy often, and spend the most. The group worth protecting first.",
  loyal: "Loyal: consistent repeat buyers who aren't necessarily the biggest spenders, but keep coming back.",
  "new": "New: recent first-time buyers with only one or two orders so far — too early to tell where they'll land.",
  "at-risk": "At risk: used to order regularly but haven't shown up in a while. The churn-risk flag targets this group.",
  lost: "Lost: haven't ordered in a long time and show no recent activity. Low priority for retention spend.",
};
document.querySelectorAll(".rfm-bar").forEach((bar) => {
  bar.addEventListener("click", () => {
    document.querySelectorAll(".rfm-bar").forEach((b) => b.classList.remove("active"));
    bar.classList.add("active");
    document.getElementById("rfmDetail").textContent = rfmDefinitions[bar.dataset.segment];
  });
});

// Scroll reveal for section headings and cards
const revealTargets = document.querySelectorAll(".section h2, .project-card, .timeline li, .skill-group");
revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in"));
}

// End-of-page toast, shown once
let toastShown = false;
const toast = document.getElementById("endToast");
window.addEventListener("scroll", () => {
  if (toastShown) return;
  const scrolledToEnd = window.innerHeight + window.scrollY >= document.body.scrollHeight - 40;
  if (scrolledToEnd) {
    toast.classList.add("show");
    toastShown = true;
    setTimeout(() => toast.classList.remove("show"), 4000);
  }
});

// Ambient particle background in hero (gentle drift + mouse parallax)
(function () {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  let w, h, dots;
  let mouseX = 0, mouseY = 0;

  function resize() {
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
    const count = Math.max(18, Math.floor((w * h) / 42000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;

      const dx = (mouseX - d.x) * 0.01;
      const dy = (mouseY - d.y) * 0.01;

      ctx.beginPath();
      ctx.arc(d.x + dx, d.y + dy, d.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(30, 158, 140, 0.35)";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
