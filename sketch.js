// Create variables for accessing GUI objects
let b1, b_black, b3, t1, cf1, cb1, cb2, s_cross, s2d1, b_a,b_b,b_fx1,b_fx2,b_fx3;

// Create a variable for the gui context that we can use to change style
let gui;

// For framerate testing
let fps = [];
let imgs = []
let imgsA = []
let imgsB = []
let clip_a
let clip_b

const clipWidth = 640
const clipHeight = 360


function preload() {
  // imgs[0] = loadImage('https://media.giphy.com/media/3osxYhj4VNwxHdlE9G/giphy.gif');
  // imgs[1] = loadImage('https://media.giphy.com/media/xTiTnkZoCSqp3Dn6yk/giphy.gif');
  // imgs[2] = loadImage('https://media.giphy.com/media/AJ0eD0YBPoHXW/giphy.gif');
  // imgs[3] = loadImage('https://media.giphy.com/media/L73N7YlkzdrgI/giphy.gif');
  // imgs[4] = loadImage('https://media.giphy.com/media/uUl6xIoDXyceJ0j9Mf/giphy.gif');
  // imgs[5] = loadImage('https://media.giphy.com/media/l0Iyn0Tg9MpGpfWBa/giphy.gif');
  // imgs[6] = loadImage('https://media.giphy.com/media/4qO2dWoZL8Q8M/giphy.gif');
  // imgs[0] = loadImage('./clips/clip00.gif');
  // imgs[1] = loadImage('./clips/clip01.gif');
  // imgs[2] = loadImage('./clips/clip02.gif');
  // imgs[3] = loadImage('./clips/clip03.gif');
  // imgs[4] = loadImage('./clips/clip04.gif');
  // imgs[5] = loadImage('./clips/clip05.gif');

  // 同じgifを再生すると速度が変化してしまうので二重に読み込み
  imgsA[0] = loadImage('./clips/clip00.gif');
  imgsA[1] = loadImage('./clips/clip01.gif');
  imgsA[2] = loadImage('./clips/clip02.gif');
  imgsA[3] = loadImage('./clips/clip03.gif');
  imgsA[4] = loadImage('./clips/clip04.gif');
  imgsA[5] = loadImage('./clips/clip05.gif');
  imgsA[6] = loadImage('./clips/clip06.gif');
  imgsA[7] = loadImage('./clips/clip07.gif');
  imgsA[8] = loadImage('./clips/clip08.gif');
  imgsA[9] = loadImage('./clips/clip09.gif');


  imgsB[0] = loadImage('./clips/clip00.gif');
  imgsB[1] = loadImage('./clips/clip01.gif');
  imgsB[2] = loadImage('./clips/clip02.gif');
  imgsB[3] = loadImage('./clips/clip03.gif');
  imgsB[4] = loadImage('./clips/clip04.gif');
  imgsB[5] = loadImage('./clips/clip05.gif');
  imgsB[6] = loadImage('./clips/clip06.gif');
  imgsB[7] = loadImage('./clips/clip07.gif');
  imgsB[8] = loadImage('./clips/clip08.gif');
  imgsB[9] = loadImage('./clips/clip09.gif');

}

function setup() {
  // frameRate(30)
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  mobileLayout(); // <- uncomment for mobile layout  
  // Set style to Blue!
  gui.loadStyle("TerminalGreen");
  s_cross.val = 0
  s2.val = 1
  clip_a = 0
  clip_b = 1
}

let transformVal = 1;
let bright;

function draw() {

  let w = width;
  let h = height;
  background(0);
  fill(0)
  drawGui();

  if (b1.isPressed) {
    s_cross.val = transformVal
    transformVal = -transformVal
  }

  if (b_black.isHeld) {
    bright = 0
  } else {
    bright = s2.val
  }


  if (b_aBack.isPressed) {
    clip_a --
    rect(30,800,10,10)
  }
  if (b_aNext.isPressed) {
    clip_a ++
    rect(30,820,10,10)
  }

  if(clip_a >= imgsA.length){
    clip_a = 0
  }else if(clip_a < 0){
    clip_a = imgsA.length-1
  }


  if (b_bBack.isPressed) {
    if (clip_b - 1 < 0) {
      clip_b = imgsA.length - 1
    } else {
      clip_b = (clip_b - 1) % imgsA.length
    }
  }
  if (b_bNext.isPressed) {
    clip_b = (clip_b + 1) % imgsA.length
  }

  noStroke()
  rect(0, 0, w, min(h * 0.38, w * 0.5625))



  if (b_a.isHeld) {
    bBright = 0
  }else if(b_b.isHeld){
    bBright = 255
  }else{
    bBright = (s_cross.val+1)/2 * 255
  }

  if (b_fx1.isHeld) {
    tint(255,255 * bright);
    image(imgsA[clip_a], 0, 0, w, min(h * 0.38, w * 0.5625), clipWidth/2, 0, 1, clipWidth);
    tint(255, bBright * bright);
    image(imgsB[clip_b], 0, 0, w, min(h * 0.38, w * 0.5625), clipWidth/2, 0, 1, clipWidth);
  } else if(b_fx2.isHeld){
    // let zoom = (sin(frameCount/3)+1)*100
    let zoom = random(300)-100
    tint(255,255 * bright);
    image(imgsA[clip_a], 0, 0, w, min(h * 0.38, w * 0.5625),zoom,zoom *0.5625,clipWidth-(zoom*2), clipHeight-(zoom *0.5625)*2);
    tint(255, bBright * bright);
    image(imgsA[clip_b], 0, 0, w, min(h * 0.38, w * 0.5625),zoom,zoom *0.5625,clipWidth-(zoom*2), clipHeight-(zoom *0.5625)*2);
  } else if(b_fx3.isHeld){
    tint(255,255 * bright);
    let rx = random(clipWidth)
    let ry = random(clipHeight)
    let rw = random(clipWidth-rx)
    let rh = random(clipHeight-ry)
    image(imgsA[clip_a], 0, 0, w, min(h * 0.38, w * 0.5625), rx,ry,rw,rh);
    tint(255, bBright * bright);
    image(imgsB[clip_b], 0, 0, w, min(h * 0.38, w * 0.5625), rx,ry,rw,rh);
  }else {
    tint(255,255 * bright);
    image(imgsA[clip_a], 0, 0, w, min(h * 0.38, w * 0.5625));
    tint(255, bBright * bright);
    image(imgsB[clip_b], 0, 0, w, min(h * 0.38, w * 0.5625));
  }
  stroke(255)
  noTint()
  image(imgsA[clip_a], w * 0.30, h * 0.75, w * 0.30, min(h * 0.1,w * 0.30 * 0.5625));
  image(imgsB[clip_b], w * 0.60, h * 0.75, w * 0.30, min(h * 0.1,w * 0.30 * 0.5625));

  if (b_strobo.isHeld) {
    noStroke()
    if (frameCount % 6 < 2) {
      fill(255, 130)
      rect(0, 0, w, min(h * 0.38, w * 0.5625))
    } else if (frameCount % 6 < 4) {
      fill(0)
      rect(0, 0, w, min(h * 0.38, w * 0.5625))
    }
  }

  // debug();

}

function mobileLayout() {
  let w = width;
  let h = height;
  
  b1 = createButton("Transform", 0, 0, w, min(h * 0.3, w * 0.56));

  b_a = createButton("A", w * 0.1, h * 0.4, w * 0.15, h * 0.08);
  b_b = createButton("B", w * 0.75, h * 0.4, w * 0.15, h * 0.08);
  s_cross = createCrossfader("SliderH", w * 0.25, h * 0.4, w * 0.5, h * 0.08, -1, 1);

  b_black = createButton("Black", w * 0.1, h * 0.85, w * 0.15, h * 0.1);


  b_aBack = createButton("<", w * 0.30, h * 0.85, w * 0.15, h * 0.1);
  b_aNext = createButton(">", w * 0.45, h * 0.85, w * 0.15, h * 0.1);
  b_bBack = createButton("<", w * 0.60, h * 0.85, w * 0.15, h * 0.1);
  b_bNext = createButton(">", w * 0.75, h * 0.85, w * 0.15, h * 0.1);

  b_strobo = createButton("strobo", w * 0.30, h * 0.50, w * 0.15, h * 0.1);
  b_fx1 = createButton("FX1", w * 0.45, h * 0.50, w * 0.15, h * 0.1);
  b_fx2 = createButton("FX2", w * 0.60, h * 0.50, w * 0.15, h * 0.1);
  b_fx3 = createButton("FX3", w * 0.75, h * 0.50, w * 0.15, h * 0.1);

  s2 = createSliderV("SliderV", w * 0.1, h * 0.5, w * 0.15, h * 0.35, 0, 1);
  // t1 = createToggle("Toggle 1", w * 0.05, h * 0.2, w * 0.4375, h * 0.125);
  // cb1 = createCheckbox("Checkbox 1", w * 0.275, h * 0.5, w * 0.2125, h * 0.2125);
  // s2d1 = createSlider2d("Slider2d 1", w * 0.5125, h * 0.5, w * 0.4375, h * 0.45);
}

function debug(){
  text(clip_a+"-"+clip_b,32,50)
  drawFps(2);
}
function drawFps(duration) {
  let avgFps = 0;

  fps.push(frameRate());
  if (fps.length > 60 * duration) {
    fps.splice(0, 1);
  }
  for (let i = 0; i < fps.length; i++) {
    avgFps += fps[i];
  }
  avgFps = avgFps / fps.length;
  push();
  textSize(20);
  text(int(avgFps), 32, 32);
  pop();
}

function touchMoved() {
  return false;
}
// document.addEventListener('touchmove', function(e) {
//   e.preventDefault();
// }, {
//   passive: false
// });
