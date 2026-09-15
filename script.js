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

// Query console
(function () {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");
  if (!input || !output) return;

  const responses = {
    "help": "Try: skills, projects, experience, whoami, contact, clear",
    "select * from skills;": "Python, SQL, PostgreSQL, Oracle, BigQuery, Airflow, Docker, Power BI, Snowflake (basics)",
    "skills": "Python, SQL, PostgreSQL, Oracle, BigQuery, Airflow, Docker, Power BI, Snowflake (basics)",
    "select * from projects;": "1. Retail Data Platform — ETL + star schema + BigQuery + Airflow\n2. RFM Customer Segmentation — SQL-based RFM scoring + cohort analysis",
    "projects": "1. Retail Data Platform — ETL + star schema + BigQuery + Airflow\n2. RFM Customer Segmentation — SQL-based RFM scoring + cohort analysis",
    "select * from experience;": "Database Developer/Engineer @ Quantum Asia (client: NIC), Feb 2025 — present",
    "experience": "Database Developer/Engineer @ Quantum Asia (client: NIC), Feb 2025 — present",
    "whoami": "A database developer who got curious about everything upstream and downstream of the database.",
    "contact": "anushaviru12@gmail.com — GitHub: anushav-12 — LinkedIn: anusha-v-551529275",
  };

  function addLine(text, cls) {
    const div = document.createElement("div");
    div.className = "t-line " + cls;
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const raw = input.value.trim();
    if (!raw) return;
    addLine("andy=# " + raw, "t-query");

    const key = raw.toLowerCase();
    if (key === "clear") {
      output.innerHTML = "";
    } else if (responses[key]) {
      addLine(responses[key], "t-result");
    } else {
      addLine("Unknown query. Try: help", "t-hint");
    }
    input.value = "";
  });
})();

// One-time hero schema diagram reveal (respects reduced-motion via CSS fallback)
window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("schemaSvg");
  if (!svg) return;
  const nodes = svg.querySelectorAll(".node");
  const links = svg.querySelectorAll(".link");

  setTimeout(() => {
    nodes[0].classList.add("shown"); // fact table appears first
  }, 100);

  links.forEach((link, i) => {
    setTimeout(() => link.classList.add("drawn"), 350 + i * 220);
  });

  nodes.forEach((node, i) => {
    if (i === 0) return;
    setTimeout(() => node.classList.add("shown"), 500 + i * 220);
  });
});
