let baseBg = document.getElementById("gameScene");
let plasticCupSpawner = document.getElementById("plasticCupSpawner");
let plasticCupImg = "assets/coffee-page/plastic-cup.png"

let currentItem = null;
let plasticCupActive = false;

window.onload = function() {
  plasticCupSpawner.addEventListener("click", (e) => {

    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;
    
    if (!plasticCupActive) { 
      currentItem = spawnCup(Xposition, Yposition); 
    };

    plasticCupActive = true;
      });
  
  document.addEventListener("mousemove", (e) => {
    if (!currentItem) return;

    let documents = baseBg.getBoundingClientRect();

    currentItem.style.left = e.clientX - documents.left + "px";
    currentItem.style.top = e.clientY - documents.top + "px";
  });
}

function spawnCup(x, y) {
  let plasticCup = document.createElement("div");
  plasticCup.classList.add("plasticCup");

  plasticCup.style.left = x + "px";
  plasticCup.style.top = y + "px";
  plasticCup.style.backgroundImage = `url(${plasticCupImg})`;

  baseBg.appendChild(plasticCup);

  return plasticCup;
}