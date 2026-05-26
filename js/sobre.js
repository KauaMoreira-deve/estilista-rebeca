const mainModel = document.querySelector("#modelo-principal");
const currentReference = document.querySelector("#referencia-atual");
const lookTitle = document.querySelector("#look-atual");
const currentCounter = document.querySelector("#contador-atual");
const lookCards = Array.from(document.querySelectorAll(".look-card"));
const navButtons = document.querySelectorAll("[data-look-nav]");

let currentLookIndex = 0;

function formatLookNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function updateLook(index) {
  if (lookCards.length === 0) {
    return;
  }

  currentLookIndex = (index + lookCards.length) % lookCards.length;

  const selectedCard = lookCards[currentLookIndex];
  const modelSrc = selectedCard.dataset.modelSrc;
  const imageSrc = selectedCard.dataset.imageSrc;
  const lookName = selectedCard.dataset.lookName || `Look ${formatLookNumber(currentLookIndex)}`;

  if (mainModel && modelSrc) {
    mainModel.setAttribute("src", modelSrc);
    mainModel.setAttribute("alt", `Modelo 3D do ${lookName}`);
    mainModel.setAttribute("camera-orbit", "0deg 78deg 5m");
    mainModel.setAttribute("min-camera-orbit", "0deg 78deg 5m");
    mainModel.setAttribute("max-camera-orbit", "0deg 78deg 5m");
    mainModel.setAttribute("field-of-view", "22deg");
  }

  if (currentReference && imageSrc) {
    currentReference.setAttribute("src", imageSrc);
    currentReference.setAttribute("alt", `Referencia visual do ${lookName}`);
  }

  if (lookTitle) {
    lookTitle.textContent = lookName;
  }

  if (currentCounter) {
    currentCounter.textContent = formatLookNumber(currentLookIndex);
  }

  lookCards.forEach((card, cardIndex) => {
    card.classList.toggle("ativo", cardIndex === currentLookIndex);
  });

  selectedCard.scrollIntoView({
    block: "nearest",
    inline: "nearest"
  });
}

lookCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    updateLook(index);
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateLook(currentLookIndex + Number(button.dataset.lookNav));
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    updateLook(currentLookIndex - 1);
  }

  if (event.key === "ArrowRight") {
    updateLook(currentLookIndex + 1);
  }
});
