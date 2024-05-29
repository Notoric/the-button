let press = 0;
let total_press = 0;
let reset = 0;
let high_score = 0;
let isAnimating = false;
let isDown = false;
let waitDown = false;
const timeout = 250;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateScoreBoard() {
  const highscore = document.getElementById("highscore");
  const totalpress = document.getElementById("totalpress");
  const resets = document.getElementById("resets");
  const buttonText = document.getElementById("buttonText")
  
  highscore.innerHTML = "Your highest score is " + high_score + ".";
  totalpress.innerHTML = "You pressed the button " + total_press + " times."
  resets.innerHTML = "You reset " + reset + " times."
  buttonText.innerHTML = press;
  
  saveData();
}

function calculateSuccess() {
  let randint = Math.floor(Math.random() * 100) + 1;
  if (randint <= press) {
    failPress();
  } else {
    succeedPress();
  }
  return;
}

function failPress() {
  press = 0;
  ++reset;
  ++total_press;
  background.className = "";
  return;
}

function succeedPress() {
  ++press;
  ++total_press;
  if (press > high_score) {
    high_score = press;
  }
  if(press >= 20) {
    const bg = document.getElementById("background");
    background.className = "starburst";
  }
  return;
}

async function buttonDown() {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  const buttonTop = document.getElementById("buttonTop");
  buttonTop.style.transform = "translateY(1.5em)";
  setTimeout(() => {
    isDown = true;
  }, timeout);
}

async function buttonUp() {
  if (!isAnimating || waitDown) {
    return;
  }
  waitDown = true;
  while(!isDown) {
    await sleep(10);
  }
  const buttonTop = document.getElementById("buttonTop");
  buttonTop.style.transform = "translateY(0em)";
  calculateSuccess();
  updateScoreBoard();
  setTimeout(() => {
    isDown = false;
    isAnimating = false;
    waitDown = false;
  }, timeout);
}

function loadData() {
  press = localStorage.getItem("press") || 0;
  high_score = localStorage.getItem("high_score") || 0;
  reset = localStorage.getItem("reset") || 0;
  total_press = localStorage.getItem("total_press") || 0;
  
  const primary = localStorage.getItem("primary");
  const secondary = localStorage.getItem("secondary");
  const darkmode = localStorage.getItem("darkmode");
  
  if (darkmode === "false") {
      document.documentElement.style.setProperty('--background', '#dfdfdf');
      document.documentElement.style.setProperty('--backgroundAlt', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#202020');
      document.documentElement.style.setProperty('--foregroundAlt', 'white');
    document.getElementById("dark").checked = true;
  }
  
  if (primary != null) {
    document.documentElement.style.setProperty('--primary', primary);
  }
    if (secondary != null) {
    document.documentElement.style.setProperty('--secondary', secondary);
  }
  if(press >= 20) {
    const bg = document.getElementById("background");
    background.className = "starburst";
  }
}

function saveData() {
  localStorage.setItem("press", press)
  localStorage.setItem("high_score", high_score)
  localStorage.setItem("reset", reset)
  localStorage.setItem("total_press", total_press)
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('keypress', function(event) {
    if (event.key === ' ') {
      buttonDown();
      setTimeout(() => {
        buttonUp();
      }, 410)
    }
  });
});

const darkToggle = document.getElementById("dark");

darkToggle.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.style.setProperty('--background', '#dfdfdf');
      document.documentElement.style.setProperty('--backgroundAlt', '#ffffff');
      document.documentElement.style.setProperty('--foreground', '#202020');
      document.documentElement.style.setProperty('--foregroundAlt', 'white');
      localStorage.setItem("darkmode", false)
    } else {
      document.documentElement.style.setProperty('--background', '#101010');
      document.documentElement.style.setProperty('--backgroundAlt', '#202020');
      document.documentElement.style.setProperty('--foreground', '#dfdfdf');
      document.documentElement.style.setProperty('--foregroundAlt', 'black');
      localStorage.setItem("darkmode", true)
    }
  });

const buttonTop = document.getElementById("buttonTop");
buttonTop.addEventListener('mousedown', () => {
  buttonDown();
})
buttonTop.addEventListener('mouseup', () => {
  buttonUp();
})

const settings = document.getElementById("color_picker");
settings.addEventListener('click', () => {
  const menu = document.getElementById("color_menu");
  menu.classList.toggle("hidden");
})

const redButton = document.getElementById("red");
redButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#ff0050');
  document.documentElement.style.setProperty('--secondary', '#880028');
  localStorage.setItem("primary", '#ff0050')
  localStorage.setItem("secondary", '#880028')
})

const greenButton = document.getElementById("green");
greenButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#50ff00');
  document.documentElement.style.setProperty('--secondary', '#288800');
  localStorage.setItem("primary", '#50ff00')
  localStorage.setItem("secondary", '#288800')
})

const blueButton = document.getElementById("blue");
blueButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#0050ff');
  document.documentElement.style.setProperty('--secondary', '#002888');
  localStorage.setItem("primary", '#0050ff')
  localStorage.setItem("secondary", '#002888')
})

const cyanButton = document.getElementById("cyan");
cyanButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#50ffff');
  document.documentElement.style.setProperty('--secondary', '#288888');
  localStorage.setItem("primary", '#50ffff')
  localStorage.setItem("secondary", '#288888')
})

const yellowButton = document.getElementById("yellow");
yellowButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#ffff50');
  document.documentElement.style.setProperty('--secondary', '#888828');
  localStorage.setItem("primary", '#ffff50')
  localStorage.setItem("secondary", '#888828')
})

const magentaButton = document.getElementById("magenta");
magentaButton.addEventListener('click', () => {
  document.documentElement.style.setProperty('--primary', '#ff50ff');
  document.documentElement.style.setProperty('--secondary', '#882888');
  localStorage.setItem("primary", '#ff50ff')
  localStorage.setItem("secondary", '#882888')
})

loadData();
updateScoreBoard();