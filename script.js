const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const questionText = document.getElementById("questionText");
const buttons = document.getElementById("buttons");
const result = document.getElementById("result");

let noClicks = 0;
let accepted = false;
let cooldown = false;

const messages = [
  "Oké, első reakció. Adj még egy esélyt az Igen-nek."
];

const questions = [
  "Tényleg nemet mondanál valakire, aki külön oldalt csinált neked?"
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const size = random(10, 22);
  heart.style.width = size + "px";
  heart.style.height = size + "px";

  heart.style.left = random(5, 95) + "vw";
  heart.style.bottom = "-40px";
  heart.style.animationDuration = random(2.8, 4.2) + "s";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4500);
}

noBtn.addEventListener("click", () => {
  if (accepted || cooldown) return;

  cooldown = true;
  setTimeout(() => (cooldown = false), 120);

  noClicks++;

  message.textContent = messages[(noClicks - 1) % messages.length];
  questionText.textContent = questions[(noClicks - 1) % questions.length];

  message.classList.add("show");

  // limitált növekedés (max 1.6x)
  const scale = clamp(1 + noClicks * 0.08, 1, 1.6);
  yesBtn.style.transform = `scale(${scale})`;

  // limitált elmozdulás
  const dx = clamp(random(-18, 18), -18, 18);
  const dy = clamp(random(-8, 8), -8, 8);

  noBtn.style.transform = `translate(${dx}px, ${dy}px) scale(0.92)`;
});

yesBtn.addEventListener("click", () => {
  if (accepted) return;
  accepted = true;

  questionText.textContent =
    "Köszönöm. Erre nem számítottam XDD nem tudom ki járt rosszul én fix nem XDDD";

  buttons.classList.add("hidden");
  message.classList.remove("show");

  setTimeout(() => result.classList.add("show"), 200);

  for (let i = 0; i < 40; i++) {
    setTimeout(createHeart, i * 80);
  }
});
