import './style.css'
import { Stave, StaveNote, Beam, Formatter, Renderer, Accidental } from 'vexflow'
document.querySelector('#app').innerHTML = `
  <div>
    <audio src="./dic1.wav" id="dic1"></audio>
	  <audio src="./dic2.wav" id="dic2"></audio>
	  <audio src="./dic3.wav" id="dic3"></audio>
	  <audio src="./dic4.wav" id="dic4"></audio>
	  <audio src="./dic5.wav" id="dic5"></audio>
	  <audio src="./dic6.wav" id="dic6"></audio>
	  <audio src="./dic7.wav" id="dic7"></audio>
	  <audio src="./dic8.wav" id="dic8"></audio>
	  <audio src="./dic9.wav" id="dic9"></audio>
	  <audio src="./dic10.wav" id="dic10"></audio>
	  <audio src="./dic11.wav" id="dic11"></audio>
	  <audio src="./dic12.wav" id="dic12"></audio>
	  <h1 id="resul"></h1>
	  <button id="empezarBoton">play</button>
    <span id="ss1"></span>
    <div id='output'></div>
  </div>
`

let empezarBoton = document.querySelector('#empezarBoton')
var duracion = '4';
var valores = ['blanca', 'negra', 'corchea']
var sDuracion = 1
let s1 = document.querySelector('#ss1')
s1.textContent = valores[sDuracion]
let contador;
let $resul = document.getElementById('resul')
var proceso = 0;
let dic = ['dic1', 'dic2', 'dic3', 'dic4', 'dic5', 'dic6', 'dic7', 'dic8', 'dic9', 'dic10', 'dic11', 'dic12']
let dicta = ['asdf', 'asds', 'asdfd', 'asds', 'afds', 'asdsg', 'agds', 'afdsds', 'asdfgs', 'agsds', 'agaf', 'agdsgs']
let du = ['4444', '4444', '48844', '2884', '2884', '48844', '2884', '488884', '488884', '44884', '2884', '488884']
let ale;
var notesMeasure1 = [];
var notesMeasure2 = [];
var notesMeasure3 = [];

var a;    // poner nombre descriptivo a de audio
let dictado = [];
function empezar() {
  contador = 0
  $resul.textContent = ''
  x = 0; z = 0; y = 0
  notesMeasure1 = [];
  notesMeasure2 = [];
  notesMeasure3 = [];
  proceso = 0
  ale = Math.floor(Math.random() * dic.length)
  a = document.getElementById(dic[ale])
  a.play()
  dictado = dicta[ale]
  output.innerHTML = ''
}
let x = 0
let correcto = ''
x = 0; let y = 0; let z = 0

empezarBoton.addEventListener('click',()=>empezar())

document.body.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowRight' && duracion < 8) {
    e.preventDefault()
    duracion = (duracion * 2).toString()
    sDuracion++
    s1.textContent = valores[sDuracion]
  }
  if (e.key == 'ArrowLeft' && duracion > 2) {
    duracion = (duracion / 2).toString()
    sDuracion--
    s1.textContent = valores[sDuracion]
  }

  output.innerHTML = ''
  // This approach to importing classes works in CJS contexts (i.e., a regular <script src="..."> tag).
  // const { Stave, StaveNote, Beam, Formatter, Renderer, Accidental } = Vex;

  // Create an SVG renderer and attach it to the DIV element with id="output".
  const div = document.getElementById("output");
  const renderer = new Renderer(div, Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(720, 730);
  const context = renderer.getContext();


  const staveMeasure1 = new Stave(0, 0, 250);
  staveMeasure1.addClef("treble").addTimeSignature("4/4");
  staveMeasure1.setContext(context).draw();

  const staveMeasure2 = new Stave(250, 0, 250);
  staveMeasure2.setContext(context).draw();

  const staveMeasure3 = new Stave(500, 0, 250);
  staveMeasure3.setContext(context).draw();
        
        const mapear = {a:'c/4',s:'d/4',d:'e/4',f:'f/4',g:'g/4'}

  if (dictado[x] != e.key || duracion != du[ale][x]) {
    // console.log(du[ale][x], duracion)
    if (e.key == '0') {
                notesMeasure1[x] = new StaveNote({ keys: [mapear[dictado[x]]], duration: du[ale][x] })

      contador++
      x++
    }
    if (notesMeasure1[0] != undefined) {
      Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
    }
    // Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2)

  } else {
    contador++
    console.log(contador)
    console.log(dicta[ale].length)
    if (contador == dicta[ale].length) { $resul.textContent = 'bien hecho' }
  
            var b = new StaveNote({ keys: [mapear[e.key]], duration: duracion })
            console.log(mapear[e.key])				

    proceso += 1 / duracion

    if (proceso < 1.0001) {
      notesMeasure1[x] = b
    } else if (proceso < 2.001) {
      notesMeasure2[y] = b
      y++
    } else {
      notesMeasure3[z] = b
      z++
    }

    if (notesMeasure1[0] != undefined) {
      Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
    }
    if (proceso > 1) {
      Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2)
    };
    if (proceso > 2) {
      Formatter.FormatAndDraw(context, staveMeasure3, notesMeasure3);
    }
    x++
  }
})

