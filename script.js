/* ============================
   LOADER
============================ */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            setTimeout(() => {
                loader.remove();
            }, 700);

        }, 1800);

    }

});


/* ============================
   SCROLL ANIMATION
============================ */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("scroll-show");

        } else {

            entry.target.classList.remove("scroll-show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".scroll-hidden").forEach(el => {
    observer.observe(el);
});


/* ============================
   MOBILE NAVBAR
============================ */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    const hamburgerIcon = hamburger.querySelector("i");

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (hamburgerIcon) {
            const isOpen = navLinks.classList.contains("active");
            hamburgerIcon.classList.toggle("fa-bars", !isOpen);
            hamburgerIcon.classList.toggle("fa-xmark", isOpen);
        }

    });

    // Close the mobile menu after tapping a link
    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            if (hamburgerIcon) {
                hamburgerIcon.classList.add("fa-bars");
                hamburgerIcon.classList.remove("fa-xmark");
            }

        });

    });

}


/* ============================
   LIVE SEARCH
============================ */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const keyword = searchInput.value.toLowerCase();

        const cards = document.querySelectorAll(".lang-card-2");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(keyword)) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

}


/* ============================
   FAQ ACCORDION
============================ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    if (!btn) return;

    btn.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


/* ============================
   RUN CODE SIMULATION
============================ */

function runCode(language, btnElement) {

    const solutionBox = btnElement.closest(".solution-box");

    const outputBox = solutionBox.querySelector(".code-output");

    const outputText = solutionBox.querySelector(".output-text");

    outputBox.style.display = "block";

    outputText.style.color = "#ffffff";

    outputText.innerText = "Running code...";

    btnElement.disabled = true;

    setTimeout(() => {

        outputText.style.color = "#2ecc71";

        switch (language) {

            case "java":

                outputText.innerText =
`--- JAVA PROGRAM ---

Total Shopping : Rp50.000

Paid : Rp100.000

Change : Rp50.000

Process finished successfully.`;

                break;


            case "javascript":

                outputText.innerText =
`--- JAVASCRIPT ---

Dark Mode Activated

Website Theme Updated Successfully.`;

                document.body.classList.toggle("dark-mode-preview");

                break;


            case "cpp":

                outputText.innerText =
`--- C++ PROGRAM ---

Temperature

30°C

86°F

Conversion Success.`;

                break;


            case "python":

                outputText.innerText =
`--- PYTHON CHATBOT ---

Bot:

Hello!

Welcome to Nusantara Coder.`;

                break;

        }

        btnElement.disabled = false;

    }, 800);

}
/* ===========================
      ROADMAP PROGRESS
=========================== */

const roadmapChecks = document.querySelectorAll(".roadmap-check");

const progressFill = document.getElementById("progressFill");

const progressPercent = document.getElementById("progressPercent");

function updateRoadmap(){

const total = roadmapChecks.length;

let checked = 0;

roadmapChecks.forEach(check=>{

if(check.checked){

checked++;

}

});

const percent = Math.round((checked/total)*100);

progressFill.style.width = percent + "%";

progressPercent.innerText = percent + "%";

}

roadmapChecks.forEach(check=>{

check.addEventListener("change",updateRoadmap);

});

updateRoadmap();
/* ============================
   SCROLL PROGRESS BAR
============================ */

const scrollProgressBar = document.getElementById("scrollProgressBar");

if (scrollProgressBar) {

    window.addEventListener("scroll", () => {

        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        scrollProgressBar.style.width = percent + "%";

    });

}


/* ============================
   BACK TO TOP BUTTON
============================ */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}


/* ============================
   DARK / LIGHT MODE TOGGLE
============================ */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("nc-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight = document.body.classList.contains("light-mode");

        localStorage.setItem("nc-theme", isLight ? "light" : "dark");

        themeToggle.innerHTML = isLight
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

}


/* ============================
   STATISTICS COUNT-UP
============================ */

const statNumbers = document.querySelectorAll(".stat-number");

if (statNumbers.length) {

    const statObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !entry.target.dataset.done) {

                const el = entry.target;
                el.dataset.done = "true";

                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || "";
                const duration = 1500;
                const start = performance.now();

                function step(now) {

                    const progress = Math.min((now - start) / duration, 1);
                    const value = Math.floor(progress * target);

                    el.innerText = value + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.innerText = target + suffix;
                    }

                }

                requestAnimationFrame(step);

            }

        });

    }, { threshold: 0.4 });

    statNumbers.forEach(el => statObserver.observe(el));

}


/* ============================
   MINI QUIZ
============================ */

const quizForm = document.getElementById("quizForm");

if (quizForm) {

    quizForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const resultEl = document.getElementById("quizResult");
        const totalQuestions = 3;
        let score = 0;
        let answeredAll = true;

        for (let i = 1; i <= totalQuestions; i++) {

            const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);

            if (!selected) {
                answeredAll = false;
                continue;
            }

            if (selected.value === "correct") {
                score++;
            }

        }

        if (!answeredAll) {
            resultEl.style.color = "#e74c3c";
            resultEl.innerText = "Jawab semua pertanyaan dulu ya sebelum submit!";
            return;
        }

        if (score === totalQuestions) {
            resultEl.style.color = "#2ecc71";
            resultEl.innerText = `Sempurna! Skor kamu: ${score}/${totalQuestions} 🎉`;
        } else if (score > 0) {
            resultEl.style.color = "#d89a4d";
            resultEl.innerText = `Lumayan! Skor kamu: ${score}/${totalQuestions}`;
        } else {
            resultEl.style.color = "#e74c3c";
            resultEl.innerText = `Skor kamu: ${score}/${totalQuestions}. Coba lagi yuk!`;
        }

    });

}
