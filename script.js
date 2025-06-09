function openTab(tabName) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-section").forEach(section => section.classList.remove("active-tab"));
  document.querySelector(`.tab[onclick="openTab('${tabName}')"]`).classList.add("active");
  document.getElementById(`tab-${tabName}`).classList.add("active-tab");

  // Reset module view to first one per tab
  const visibleTab = document.getElementById(`tab-${tabName}`);
  const firstButton = visibleTab.querySelector(".module-button");
  if (firstButton) {
    firstButton.click();
  }
}

function showModule(id) {
  const allSections = document.querySelectorAll(".tab-section.active-tab");
  if (allSections.length === 0) return;

  const section = allSections[0];
  section.querySelectorAll(".module-content").forEach(m => m.classList.remove("active-module"));
  section.querySelectorAll(".module-button").forEach(b => b.classList.remove("active"));
  const target = section.querySelector(`#${id}`);
  const button = Array.from(section.querySelectorAll(".module-button")).find(btn => btn.getAttribute("onclick").includes(id));

  if (target && button) {
    target.classList.add("active-module");
    button.classList.add("active");
  }
}

function captureKey(inputElement) {
  inputElement.value = "Press a key...";
  inputElement.focus();

  function keyHandler(event) {
    event.preventDefault();
    const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;
    inputElement.value = key;
    document.removeEventListener("keydown", keyHandler);
  }

  document.addEventListener("keydown", keyHandler);
}

const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");
const toggleButton = document.getElementById("drawToggle");

let drawing = false;
let drawEnabled = false;

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Toggle canvas visibility
toggleButton.addEventListener("click", () => {
  drawEnabled = !drawEnabled;
  canvas.style.display = drawEnabled ? "block" : "none";
});

// Drawing logic
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
});
canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.lineTo(e.clientX, e.clientY);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();
});
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.closePath();
});
canvas.addEventListener("mouseleave", () => {
  drawing = false;
});
