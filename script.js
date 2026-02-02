// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const letterWindow = document.querySelector(".letter-window");

// Click Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// ===============================
// NO button movement (kept inside letter window)
// ===============================
function moveNoButtonInsideLetter() {
    if (!noBtn || !letterWindow) return;

    // Make sure the container can be the positioning reference
    // (If it's already positioned in CSS, this won't hurt.)
    const windowStyle = getComputedStyle(letterWindow);
    if (windowStyle.position === "static") {
        letterWindow.style.position = "relative";
    }

    // Make the button position absolute so it moves within the container
    noBtn.style.position = "absolute";
    noBtn.style.zIndex = "5";

    const containerRect = letterWindow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const padding = 10;

    // Available space inside the container
    const maxLeft = containerRect.width - btnRect.width - padding;
    const maxTop = containerRect.height - btnRect.height - padding;

    // If container is too small, do nothing
    if (maxLeft <= padding || maxTop <= padding) return;

    const left = Math.floor(Math.random() * (maxLeft - padding + 1)) + padding;
    const top = Math.floor(Math.random() * (maxTop - padding + 1)) + padding;

    noBtn.style.transition = "left 0.2s ease, top 0.2s ease";
    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
}

// Desktop hover
if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButtonInsideLetter);

    // Mobile touch
    noBtn.addEventListener(
        "touchstart",
        (e) => {
            e.preventDefault();
            moveNoButtonInsideLetter();
        },
        { passive: false }
    );

    // Pointer events (covers touch/mouse/pen)
    noBtn.addEventListener("pointerdown", (e) => {
        moveNoButtonInsideLetter();
    });
}

// Reposition after resize/rotation so it stays inside nicely
window.addEventListener("resize", () => {
    // only move it if the letter is visible/open
    if (letter && letter.style.display !== "none") {
        moveNoButtonInsideLetter();
    }
});

// ===============================
// YES is clicked
// ===============================
if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        title.textContent = "Yippeeee!";
        catImg.src = "cat_dance.gif";

        document.querySelector(".letter-window").classList.add("final");

        buttons.style.display = "none";
        finalText.style.display = "block";
    });
}
