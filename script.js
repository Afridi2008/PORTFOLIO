/* =============================================
   PORTFOLIO — Enhanced JavaScript
   1. Typing effect (hero name)
   2. Count-up animation (hero stats)
   3. Section fade-in on scroll
   ============================================= */

/* ─── 1. TYPING EFFECT ─── */
(function () {
  const el = document.getElementById("hero-name");
  if (!el) return;

  const lines = ["AFRIDI", "MOHAMED J"];
  const speed = 65;
  let lineIndex = 0;
  let charIndex = 0;
  let cursorEl = null;

  function buildDOM() {
    el.innerHTML = "";
    cursorEl = document.createElement("span");
    cursorEl.className = "typing-cursor";
    el.appendChild(cursorEl);
  }

  function insertChar(char, isAccent) {
    if (isAccent) {
      let em = el.querySelector("em.accent-em");
      if (!em) {
        em = document.createElement("em");
        em.className = "accent-em";
        el.insertBefore(em, cursorEl);
      }
      em.textContent += char;
    } else {
      const text = document.createTextNode(char);
      el.insertBefore(text, cursorEl);
    }
  }

  function type() {
    if (lineIndex >= lines.length) {
      if (cursorEl) cursorEl.remove();
      return;
    }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      const isAccent = lineIndex === 1 && charIndex >= "MOHAMED ".length;
      insertChar(line[charIndex], isAccent);
      charIndex++;
      setTimeout(type, speed);
    } else {
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) {
        el.insertBefore(document.createElement("br"), cursorEl);
        setTimeout(type, speed * 2);
      } else {
        setTimeout(function () { if (cursorEl) cursorEl.remove(); }, 600);
      }
    }
  }

  buildDOM();
  setTimeout(type, 300);
})();

/* ─── 2. COUNT-UP ANIMATION ─── */
(function () {
  const counters = document.querySelectorAll(".count");
  if (!counters.length) return;

  const duration = 1400;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ─── 3. SECTION FADE-IN ─── */
(function () {
  const sections = document.querySelectorAll(".fade-section");
  if (!sections.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(function (el) { observer.observe(el); });
})();
