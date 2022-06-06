var intento = 0;
var endgame = false;
var acertados = 0;
var modoOscuro = false;
var listaPalabras = [
  "array",
  "GitHub",
  "boolean",
  "package",
  "static",
  "abstract",
  "throws",
  "default",
  "while",
  "software",
  "thread",
  "security",
  "function",
  "return",
  "float",
  "null",
  "method",
  "onclick",
  "char",
  "extends",
];

function play(dir) {
  var audio = new Audio(dir);
  audio.play();
}

function teclado(btn, palabra) {
  if (window.endgame == false) {
    let encontrado = false;
    let letra = btn.textContent;
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i].toUpperCase() == letra) {
        let correcta = document.querySelector("#letra" + i);
        correcta.textContent = palabra[i].toUpperCase();
        encontrado = true;
        window.acertados += 1;
      }
    }

    if (encontrado == true) {
      btn.disabled = true;
      btn.classList.remove("tecla");
      btn.classList = "teclaUsadaCorrecta";
      play("audio/acertada.mp3");
    } else {
      btn.disabled = true;
      btn.classList.remove("tecla");
      btn.classList = "teclaUsadaIncorrecta";
      play("audio/error.mp3");
      drawGame(palabra);
    }

    if (window.acertados == palabra.length) {
      youWin();
    }
  }
  return;
}

function initGame() {
  let indice = Math.floor(Math.random() * window.listaPalabras.length);
  let palabra = window.listaPalabras[indice];

  drawGame(palabra);

  let correctas = document.querySelector(".correctas");
  for (let i = 0; i < palabra.length; i++) {
    const letra = document.createElement("div");
    letra.id = "letra" + i;
    letra.classList = "letraCorrecta";
    letra.textContent = "";

    correctas.append(letra);
  }

  let teclado_f1 = "qwertyuiop";
  let teclado_f2 = "asdfghjklñ";
  let teclado_f3 = "zxcvbnm";

  let f1 = document.querySelector(".fila1");
  for (let i = 0; i < teclado_f1.length; i++) {
    const tecla = document.createElement("button");
    tecla.classList = "tecla";
    tecla.textContent = teclado_f1[i].toUpperCase();
    tecla.id = teclado_f1[i].toString();
    tecla.addEventListener("click", function () {
      teclado(this, palabra);
    });

    f1.append(tecla);
  }

  let f2 = document.querySelector(".fila2");
  for (let i = 0; i < teclado_f2.length; i++) {
    const tecla = document.createElement("button");
    tecla.classList = "tecla";
    tecla.textContent = teclado_f2[i].toUpperCase();
    tecla.id = teclado_f2[i].toString();
    tecla.addEventListener("click", function () {
      teclado(this, palabra);
    });

    f2.append(tecla);
  }

  let f3 = document.querySelector(".fila3");
  for (let i = 0; i < teclado_f3.length; i++) {
    const tecla = document.createElement("button");
    tecla.classList = "tecla";
    tecla.textContent = teclado_f3[i].toUpperCase();
    tecla.id = teclado_f3[i].toString();
    tecla.addEventListener("click", function () {
      teclado(this, palabra);
    });

    f3.append(tecla);
  }
  return;
}

function removeChilds(nodo) {
  if (nodo.hasChildNodes) {
    while (nodo.childNodes.length >= 1) {
      nodo.removeChild(nodo.firstChild);
    }
  }
  return;
}

function newGame() {
  let pantalla = document.querySelector("canvas");
  let pincel = pantalla.getContext("2d");

  pincel.clearRect(0, 0, pantalla.width, pantalla.height);

  window.intento = 0;
  window.endgame = false;
  window.acertados = 0;

  let f1 = document.querySelector(".fila1");
  removeChilds(f1);

  let f2 = document.querySelector(".fila2");
  removeChilds(f2);

  let f3 = document.querySelector(".fila3");
  removeChilds(f3);

  let correctas = document.querySelector(".correctas");
  removeChilds(correctas);

  if (document.querySelector(".stateAnimation") != null) {
    let gameOver = document.querySelector(".stateAnimation");
    gameOver.classList.remove(".gameOver");
    gameOver.classList.remove(".youWin");
    gameOver.classList.remove(".stateAnimation");
    gameOver.classList = "state-nodisplay";

    removeChilds(gameOver);
  }

  initGame();
  return;
}

function gameOver(palabra) {
  if (document.querySelector(".state-nodisplay") != null) {
    let gameOver = document.querySelector(".state-nodisplay");
    gameOver.classList.remove("state-nodisplay");

    const game = document.createElement("div");
    game.textContent = "PERDISTE"; /*palabra[i].toUpperCase()*/

    const over = document.createElement("div");
    over.textContent = "Fin del Juego"; /*palabra[i].toUpperCase()*/

    gameOver.append(game);
    gameOver.append(over);

    gameOver.classList.add("stateAnimation", "gameOver");

    let finalWord = document.querySelector("#final-word");
    finalWord.classList.remove("hidden");
    finalWord.textContent = `La palabra era: "${palabra.toUpperCase()}"`;

    window.endgame = true;
    play("audio/loser.mp3");
  }
  return;
}

function drawGame(palabra) {
  let pantalla = document.querySelector("canvas");
  let pincel = pantalla.getContext("2d");

  pincel.beginPath();

  if (window.intento == 0) {
    // BASE
    pincel.moveTo(355, 350);
    pincel.lineTo(0, 350);
  }

  if (window.intento == 1) {
    // COL
    pincel.moveTo(105, 0);
    pincel.lineTo(105, 350);
    pincel.moveTo(135, 350);
    pincel.lineTo(105, 320);
    pincel.moveTo(75, 350);
    pincel.lineTo(105, 320);
  }

  if (window.intento == 2) {
    // VIGA
    pincel.moveTo(155, 0);
    pincel.lineTo(105, 50);
    pincel.moveTo(257, 3);
    pincel.lineTo(103, 3);
  }

  if (window.intento == 3) {
    // CUERDA
    pincel.moveTo(255, 80);
    pincel.lineTo(255, 0);
  }

  if (window.intento == 4) {
    // CABEZA
    pincel.moveTo(255, 50);
    pincel.arc(255, 110, 30, -Math.PI / 2, (Math.PI * 3) / 2, true);
  }
  if (window.intento == 5) {
    // TORSO
    pincel.moveTo(255, 225);
    pincel.lineTo(255, 140);
  }

  if (window.intento == 6) {
    // BR_I
    pincel.moveTo(275, 200);
    pincel.lineTo(255, 150);
  }

  if (window.intento == 7) {
    // BR_D
    pincel.moveTo(235, 200);
    pincel.lineTo(255, 150);
  }

  if (window.intento == 8) {
    // PI_I
    pincel.moveTo(275, 270);
    pincel.lineTo(255, 225);
  }

  if (window.intento == 9) {
    // PI_D
    pincel.moveTo(235, 270);
    pincel.lineTo(255, 225);
    gameOver(palabra);
  }

  pincel.lineWidth = 6;
  var r = document.querySelector(":root");
  var rs = getComputedStyle(r);

  if (window.modoOscuro == false) {
    pincel.strokeStyle = rs.getPropertyValue("--color5");
  } else {
    pincel.strokeStyle = rs.getPropertyValue("--color1");
  }

  pincel.stroke();
  window.intento += 1;

  return;
}

function youWin() {
  if (document.querySelector(".state-nodisplay") != null) {
    const youWin = document.querySelector(".state-nodisplay");
    youWin.classList.remove("state-nodisplay");

    const you = document.createElement("div");
    you.textContent = "GANASTE"; /*palabra[i].toUpperCase()*/

    const win = document.createElement("div");
    win.textContent = "¡Felicidades!"; /*palabra[i].toUpperCase()*/

    youWin.append(you);
    youWin.append(win);

    youWin.classList.add("stateAnimation", "youWin");
    window.endgame = true;
    play("audio/winner.mp3");
  }
  return;
}

document.addEventListener(
  "keydown",
  (event) => {
    let name = event.key;
    if (document.getElementById(name.toLowerCase()) != null) {
      document.getElementById(name.toLowerCase()).click();
    }
  },
  false
);

const newgame = document.querySelector("#new");
newgame.addEventListener("click", function () {
  newGame();
});

const des = document.querySelector("#des");
des.addEventListener("click", function () {
  const menu = document.querySelector("#menu");
  menu.classList.remove("no-display");
  menu.classList.add("menu");

  const juego = document.querySelector("#juego");
  juego.classList.remove("juego");
  juego.classList.add("no-display");
});

//Iniciar nuevo juego
const start = document.querySelector("#start");
start.addEventListener("click", function () {
  const menu = document.querySelector("#menu");
  menu.classList.remove("menu");
  menu.classList.add("no-display");

  const juego = document.querySelector("#juego");
  juego.classList.remove("no-display");
  juego.classList.add("juego");

  newGame();
});

//Agregar una nueva palabra
const add = document.querySelector("#add");
add.addEventListener("click", function () {
  const menu = document.querySelector("#menu");
  menu.classList.remove("menu");
  menu.classList.add("no-display");

  const addWord = document.querySelector("#addWord");
  addWord.classList.remove("no-display");
  addWord.classList.add("addWord");
});

//Guardar la letra escogida en el juego
const save = document.querySelector("#save");
save.addEventListener("click", function () {
  let textarea = document.querySelector("#texto");
  const texto = textarea.value.toUpperCase();
  let error = false;

  if (texto != "" && texto.length <= 8) {
    for (var i = 0; i < texto.length; i++) {
      if ((texto[i] < "A" || texto[i] > "Z") && texto[i] != " ") {
        error = true;
      }
    }

    if (error == false) {
      window.listaPalabras.push(texto);
      textarea.value = "";

      const addWord = document.querySelector("#addWord");
      addWord.classList.remove("addWord");
      addWord.classList.add("no-display");

      const juego = document.querySelector("#juego");
      juego.classList.remove("no-display");
      juego.classList.add("juego");

      newGame();
    } else {
      const dialogo = document.querySelector("#dialog");
      dialogo.show();
      dialogo.addEventListener("click", () => dialogo.close());
    }
  } else {
    const dialogo = document.querySelector("#dialog2");
    dialogo.show();
    dialogo.addEventListener("click", () => dialogo.close());
  }
});

//Cancelar el juego
const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", function () {
  let textarea = document.querySelector("#texto");
  textarea.value = "";

  //Identificar el id addWord y agregarle clases
  const addWord = document.querySelector("#addWord");
  addWord.classList.remove("addWord");
  addWord.classList.add("no-display");

  //Identificar el id menu y agregarle clases
  const menu = document.querySelector("#menu");
  menu.classList.remove("no-display");
  menu.classList.add("menu");
});

//Color del tema de la aplicación
const modo = document.querySelector("#modo");
modo.addEventListener("click", function () {
  if (window.modoOscuro == false) {
    let r = document.querySelector(":root");

    r.style.setProperty("--color1", "#A2ABC8");
    r.style.setProperty("--color2", "#6F7488");
    r.style.setProperty("--color3", "#3B3E49");
    r.style.setProperty("--color4", "#292B33");
    r.style.setProperty("--color5", "#31333C");

    window.modoOscuro = true;
    this.src = "./assets/img/off.png";

    let intento_back = window.intento;
    window.intento = 0;
    console.log(intento_back);
    for (let i = 0; i < intento_back; i++) {
      drawGame();
    }
    const exclam = document.querySelector("#exclamacion");
    exclam.style.fill = "#A2ABC8";

    const text_modo = document.querySelector("#text_modo");
    text_modo.textContent = "Modo Oscuro 🌙";
  } else {
    let r = document.querySelector(":root");

    r.style.setProperty("--color1", "#C7FFED");
    r.style.setProperty("--color2", "#D8FFDB");
    r.style.setProperty("--color3", "#e045f5");
    r.style.setProperty("--color4", "#015958");
    r.style.setProperty("--color5", "#023535");

    window.modoOscuro = false;
    this.src = "./img/on.png";

    let intento_back = window.intento;
    window.intento = 0;
    for (let i = 0; i < intento_back; i++) {
      drawGame();
    }

    const exclam = document.querySelector("#exclamacion");
    exclam.style.fill = "#C7FFED";

    const text_modo = document.querySelector("#text_modo");
    text_modo.textContent = "Modo Claro ☀️";
  }
});
