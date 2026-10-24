let baseBg = document.getElementById("gameScene");
let plasticCupSpawner = document.getElementById("plasticCupSpawner");
let plasticCupImg = "assets/coffee-page/plastic-cup.png"
let plasticCupPlacer = document.getElementById("plasticCupPlacer");
let plasticCupActive = false;
let plasticCupInAir = false;

let IceCupImg = "assets/coffee-page/cup-with-ice.png"
let MilkCupImg = "assets/coffee-page/cup-with-milk.png"

let iceSpawner = document.getElementById("iceSpawner");
let iceImg = "assets/coffee-page/ice-handful.png"
iceActive = false;

let oatMilkSpawner = document.getElementById("oatMilkSpawner");
let oatMilkActive = false;
oatMilkImg = "assets/coffee-page/oat-milk.png";
let oatMilkPlaced = false;
let plasticWithMilkActive = false;

let espressoEmptySpawner = document.getElementById("espressoSpawner");
let espressoEmptyActive = false;
let espressoEmptyImg = "assets/coffee-page/empty-esspresso.png";
let espressoPlacer = document.getElementById("espressoPlacer");
let espressoBrewer = document.getElementById("espressoBrewer");
let espressoEmptyPlaced = false;

let fullEspressoImg = "assets/coffee-page/full-espresso.png";
let fullEspressoInAir = false;
let fullEspressoActive = false;

let icedLatteImg = "assets/coffee-page/iced-latte.png"

let emptyLatteImg = "assets/coffee-page/empty-latte.png"
let latteSpawner = document.getElementById("latteSpawner");
let lattePlacer = document.getElementById("lattePlacer");
let latteBrewer = document.getElementById("latteBrewer");
let latteCupActive = false;
let latteEspressoImg = "assets/coffee-page/latte-espresso.png";

let frotherSpawner = document.getElementById("frotherSpawner");
let milkFrotherImg = "assets/coffee-page/milk-frother.png";
let frotherActive = true;
let frotherPlacer = document.getElementById("frotherPlacer");
let milkFrotherStartImg = "assets/coffee-page/milk-frother-start.png";
let frotherPlaced = false;

let currentItem = null;
let placedItem = null;

window.onload = function() {
  plasticCupSpawner.addEventListener("click", (e) => {

    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;
    
    if (plasticCupActive == false) { 
      currentItem = spawnCup(Xposition, Yposition); 
    };

    plasticCupActive = true;
    plasticCupInAir = true;
  });


  document.addEventListener("mousemove", (e) => {
    if (!currentItem) return;

    let documents = baseBg.getBoundingClientRect();

    x = e.clientX - documents.left
    y = e.clientY - documents.top

    if (oatMilkActive) {
      x -= 60;
      y -= 50;
    }

    currentItem.style.left = x + "px";
    currentItem.style.top = y + "px";
  });

  plasticCupPlacer.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;
    
    if (plasticCupInAir) {
      cupXposition = Xposition;
      cupYposition = Yposition;
      
      // placedItem = spawnCup(Xposition, Yposition);
    };

    if (iceActive) {
      document.getElementById("ice-handful").remove();
      document.getElementById("empty-cup").remove();
      plasticCupActive = false;

      let plasticWithIce = document.createElement("div");
      plasticWithIce.id = "ice-cup";
      plasticWithIce.classList.add("plasticCup");

      plasticWithIce.style.left = cupXposition + "px";
      plasticWithIce.style.top = cupYposition + "px";
      plasticWithIce.style.backgroundImage = `url(${IceCupImg})`;

      baseBg.appendChild(plasticWithIce);
      iceActive = false;
    }

    if (oatMilkActive && !oatMilkPlaced) {
      document.getElementById("oat-milk").remove();
      document.getElementById("ice-cup").remove();

      let plasticWithMilk = document.createElement("div");
      plasticWithMilk.id = "milk-cup";
      plasticWithMilk.classList.add("plasticCup");

      plasticWithMilk.style.left = cupXposition + "px";
      plasticWithMilk.style.top = cupYposition + "px";
      plasticWithMilk.style.backgroundImage = `url(${MilkCupImg})`;
      plasticWithMilk.style.zIndex = 999999;

      baseBg.appendChild(plasticWithMilk);

      oatMilkActive = false;
      oatMilkPlaced = true;
      currentItem = null;
      plasticWithMilkActive = true;
    
      oatMilkActive = false;
      }

    fullEspresso = document.getElementById("full-espresso");
    plasticWithMilk = document.getElementById("milk-cup");
    if (plasticWithMilkActive == true && fullEspressoActive == true) {
      plasticWithMilk.remove();
      fullEspresso.remove();

      let icedLatte = document.createElement("div");
      icedLatte.id = "iced-latte";
      icedLatte.classList.add("plasticCup");

      icedLatte.style.left = cupXposition + "px";
      icedLatte.style.top = cupYposition + "px";
      icedLatte.style.backgroundImage = `url(${icedLatteImg})`;
      icedLatte.style.zIndex = 999999;

      baseBg.appendChild(icedLatte);
    }


    plasticCupActive = true;
    currentItem = null;
    plasticCupInAir = false;
  })

  iceSpawner.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    if (currentItem == null && plasticCupActive == true) { 
      currentItem = spawnIce(Xposition, Yposition); 
    };

    iceActive = true;
  })

  oatMilkSpawner.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    if (currentItem == null) { 
      currentItem = spawnOatMilk(Xposition, Yposition); 
    };

    oatMilkActive = true;
  })

  espressoEmptySpawner.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    if (currentItem == null) {
      currentItem = spawnEspresso(Xposition, Yposition);
    };

    espressoEmptyActive = true;
  })

  espressoPlacer.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;
    
    if (espressoEmptyActive) {
      currentItem = null;
      let espressoEmpty = document.getElementById("empty-espresso");
      espressoEmpty.style.left = Xposition + "px";
      espressoEmpty.style.top = Yposition + "px";
      espressoEmpty.style.zIndex = 1000000;

      espressoXposition = Xposition;
      espressoYposition = Yposition;
    }

    espressoEmptyPlaced = true;
  })

  if (espressoEmptyPlaced) {
    espressoXposition = Xposition;
    espressoYposition = Yposition;
  }

  espressoBrewer.addEventListener("click", (e) => {
    if (espressoEmptyPlaced) {
      let espressoEmpty = document.getElementById("empty-espresso");
      espressoEmpty.remove();

      let fullEspresso = document.createElement("div");
      fullEspresso.id = "full-espresso";
      fullEspresso.classList.add("espresso-class");

      fullEspresso.style.left = espressoXposition + "px";
      fullEspresso.style.top = espressoYposition + "px";
      fullEspresso.style.backgroundImage = `url(${fullEspressoImg})`;
      fullEspresso.style.zIndex = 99999999;

      baseBg.appendChild(fullEspresso);

      espressoEmptyActive = false;
      espressoEmptyPlaced = false;
      fullEspressoActive = true;

      fullEspresso.addEventListener("click", (e) => {
        currentItem = fullEspresso;
        fullEspressoInAir = true;
      })
      
      espressoEmptyPlaced = false;
    }
  })

  latteSpawner.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    if (currentItem == null) {
      currentItem = spawnLatte(Xposition, Yposition);
    };

    latteActive = true;
  })

  lattePlacer.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    latteCup = document.getElementById("latte-cup");
    if (currentItem == latteCup) {
      latteCup.style.left = Xposition;
      latteCup.style.top = Yposition;
      currentItem = null;
      latteCupActive = true;
      latteXposition = Xposition;
      latteYposition = Yposition;
    }
  })

  latteBrewer.addEventListener("click", (e) => {
    if (latteCupActive) {
      latteCup = document.getElementById("latte-cup");
      latteCup.remove()
      
      let latteEspresso = document.createElement("div");
      latteEspresso.id = "latte-espresso";
      latteEspresso.classList.add("latte-class");

      latteEspresso.style.left = latteXposition + "px";
      latteEspresso.style.top = latteYposition + "px";
      latteEspresso.style.backgroundImage = `url(${latteEspressoImg})`;
      latteEspresso.style.zIndex = 99999999;

      baseBg.appendChild(latteEspresso);

    }
  })

  frotherSpawner.addEventListener("click", (e) => {
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;

    spawnFrother(Xposition, Yposition);
    currentItem = document.getElementById("milk-frother");
  })

  frotherPlacer.addEventListener("click", (e) =>{
    let documents = baseBg.getBoundingClientRect();
    Xposition = e.pageX - documents.left;
    Yposition = e.pageY - documents.top;
    
    if(frotherActive) {
      frotherPlaced = true;
      currentItem = null;
      milkFrother = document.getElementById("milk-frother");
      milkFrother.style.zIndex = 99999;
      let frotherXposition = Xposition;
      let frotherYposition = Yposition;

    milkFrother.addEventListener("click", (e) => {
      if (oatMilkActive) {
        milkFrother.style.backgroundImage = `url(${milkFrotherStartImg}`;
      oatMilk = document.getElementById("oat-milk");
      oatMilk.remove();
      }
    })
    }
  })



}

function spawnCup(x, y) {
  let plasticCup = document.createElement("div");
  plasticCup.id = "empty-cup";
  plasticCup.classList.add("plasticCup");

  plasticCup.style.left = x + "px";
  plasticCup.style.top = y + "px";
  plasticCup.style.backgroundImage = `url(${plasticCupImg})`;

  baseBg.appendChild(plasticCup);

  return plasticCup;
}

function spawnIce(x, y) {
  let ice = document.createElement("div");
  ice.id = "ice-handful";
  ice.classList.add("ice-handful");

  ice.style.left = x + "px";
  ice.style.top = y + "px";
  ice.style.backgroundImage = `url(${iceImg})`;

  baseBg.appendChild(ice);

  return ice;
}

function spawnOatMilk(x, y) {
  let oatMilk = document.createElement("div");
  oatMilk.id = "oat-milk";
  oatMilk.classList.add("oat-milk-class");

  oatMilk.style.left = x - 60 + "px";
  oatMilk.style.top = y - 50 + "px";
  oatMilk.style.backgroundImage = `url(${oatMilkImg})`;
  oatMilk.style.zIndex = 99999999;

  baseBg.appendChild(oatMilk);

  oatMilkActive = true;
  oatMilkPlaced = false;

  return oatMilk;
}

function spawnEspresso(x, y) {
  let emptyEspresso = document.createElement("div");
  emptyEspresso.id = "empty-espresso";
  emptyEspresso.classList.add("espresso-class");

  emptyEspresso.style.left = x - 60 + "px";
  emptyEspresso.style.top = y - 50 + "px";
  emptyEspresso.style.backgroundImage = `url(${espressoEmptyImg})`;

  baseBg.appendChild(emptyEspresso);

  espressoEmptyActive = true;
  espressoEmptyPlaced = false;

  return emptyEspresso;
}

function spawnLatte(x,y) {
  let latteCup = document.createElement("div");
  latteCup.id = "latte-cup";
  latteCup.classList.add("latte-class");

  latteCup.style.left = x + "px";
  latteCup.style.top = y + "px";
  latteCup.style.backgroundImage = `url(${emptyLatteImg})`;

  baseBg.appendChild(latteCup);

  return latteCup;
}

function spawnFrother(x,y) {
  let milkFrother = document.createElement("div");
  milkFrother.id = "milk-frother";
  milkFrother.classList.add("frother-class");

  milkFrother.style.left = x + "px";
  milkFrother.style.top = y + "px";
  milkFrother.style.backgroundImage = `url(${milkFrotherImg})`;

  frotherActive = true;

  baseBg.appendChild(milkFrother);

  return milkFrother;

}