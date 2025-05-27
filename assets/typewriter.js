const typewriters = document.querySelectorAll('.typewriter');

for (const typewriter of typewriters) {
  const text = typewriter.textContent.trim();
  const steps = text.length;
  typewriter.style.animation = `typing 4s steps(${steps}), blink 1s step-end infinite`;
}