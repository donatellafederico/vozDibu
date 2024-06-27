// let IMG;
let curvas = [];
let claras = [];
let oscuras = [];

let listoClaras = false;
let listoOscuras = false;
let listoCurvas = false;
let veces = 0;
let veces2 = 0;
let veces3 = 0;

let monitorear = false;
let pitch;
let audioContext;
let gestorAmp;
let gestorPitch;
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

let FREC_MIN = 130;
let FREC_MAX = 1400;
let frec_min = FREC_MIN;
let frec_max = FREC_MAX;

let AMP_MIN = 0.04;
let AMP_MAX = 0.5;
let mic;
let amp; //amplitud/volumen
let IMPRIMIR = true;
let silbar;
let grito;
let haySonido;
let frecuencia;
let antesHabiaSonido;
let playing = true;

let m = 0;

let empece = 0;

function setup() {
  createCanvas (windowWidth, windowHeight);

  //-----claras
  for(let i=0; i<7; i++ ) {
    let nombre2 = "data/claras/c"+nf( i, 2)+".webm";
    claras[i] = new m_Video(nombre2);
  }

  //------oscuras
  for(let i=0; i<6; i++ ) {
    let nombre3 = "data/oscuras/osc"+nf( i, 2)+".webm";
    oscuras[i] = new m_Video(nombre3);
  }

  
    //-----curvas
    for(let i=0; i<6; i++ ) {
      let nombre1 = "data/curvas/cur"+nf( i, 2)+".webm";
      curvas[i] = new v_Video(nombre1);
    } 

  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();
  
  
  gestorAmp =  new GestorSenial( AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial( FREC_MIN, FREC_MAX);

  background(225, 225, 192);

}

function draw() {
   fill(225, 225, 192);
   rect(0, 0, 400, 50);
  if (monitorear){
    gestorAmp.dibujar(100, 100);
    gestorPitch.dibujar(100, 300);
  }

  amp = mic.getLevel();
  gestorAmp.actualizar(amp);

  if (IMPRIMIR){
    printData();
  }
  haySonido = gestorAmp.filtrada > AMP_MIN;  //haySonido=true

  grito = gestorAmp.filtrada > AMP_MAX; // grito = true

  // grito = gestorAmp.filtrada > AMP_ALTA; //grito = true


  let empezoElSonido = haySonido && !antesHabiaSonido;
  let finDelSonido = !haySonido && antesHabiaSonido;
  
      if (empezoElSonido){  
        console.log("empezo sonido");
        empece = Date.now() ;

      }

      if (finDelSonido){  
        console.log("termino sonido");
        let cuantoDuro = (Date.now()-empece)/1000.0;
        console.log(cuantoDuro)
        if(cuantoDuro>4){
          // --------------- CURVAS --------------------
          if(cuantoDuro>7){
            console.log("sonido largo");
            // let rand = random(0, 5);
            // curvas[rand].dibujar();
            // curvas[rand].play();

            if(m < 2){
              curvas[0].dibujar();
              curvas[0].play();
              curvas[1].dibujar();
              curvas[1].play();
              m = m+1;
            } else if (m < 4){
              // curvas[1].pause();
              // curvas[2].pause();
              curvas[2].dibujar();
              curvas[2].play();
              curvas[3].dibujar();
              curvas[3].play();
              m = m+1;
            }else if(m <6){
              curvas[4].dibujar();
              curvas[4].play();
              curvas[5].dibujar();
              curvas[5].play();
              m = m+1;
            }

            // for(let i=0; i<6; i++ ) {
            //   curvas[i].dibujar();
            // }    
            // for(let i=0; i<6; i++ ) {
            //   curvas[i].play();
            // }   

          //-------------- LINEAS OSCURAS ------------------ 
          }else{
            console.log("sonido corto");
            for(let i=0; i<6; i++ ) {
              oscuras[i].dibujar();
            }     
            for(let i=0; i<5; i++ ) {
              oscuras[i].play();
            }  
          }
        } else  {
        }

      }
      // ----------LINEAS CLARAS-----------
    if (grito){
      for(let i=0; i<7; i++ ) {
        claras[i].dibujar();
      }    
      for(let i=0; i<7; i++ ) {
        claras[i].play();
      }
      console.log("GRITO");
    }
    

    
  antesHabiaSonido = haySonido; //guardo el estado del fotograma anterior en "antesHabiaSonido" ---> pasa a ser true
}

//------------------- PITCH -----------------------

function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      gestorPitch.actualizar(frequency);
    } 
    getPitch();
  })
}

function printData(){
  push();
  textSize(16);
  fill(0);
  let texto;
  texto = 'amplitud: ' + amp;
  text (texto, 20, 20);
  pop();
}

// function numeroRandom(num){
//   return num[Math.floor(Math.random() * num.length)];
// }
