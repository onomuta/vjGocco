// Create variables for accessing GUI objects
let b1, b2, b3, t1, cf1, cb1, cb2, s1, s2d1;

// Create a variable for the gui context that we can use to change style
let gui;

// For framerate testing
let fps = [];
let imgs = []
let clip_a
let clip_b

function preload() {
  imgs[0] = loadImage('https://media.giphy.com/media/3osxYhj4VNwxHdlE9G/giphy.gif');
  imgs[1] = loadImage('https://media.giphy.com/media/xTiTnkZoCSqp3Dn6yk/giphy.gif');
  imgs[2] = loadImage('https://media.giphy.com/media/AJ0eD0YBPoHXW/giphy.gif');


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  mobileLayout(); // <- uncomment for mobile layout  
  // Set style to Blue!
  gui.loadStyle("TerminalGreen");
  s1.val = 0
  s2.val = 1
  clip_a = 0
  clip_b = 1
}

let transformVal = 1;
let latestBright;

function draw() {

  let w = width;
  let h = height;
  background(0);
  fill(0)
  drawGui();

  if (b1.isPressed) {
    s1.val = transformVal
    transformVal = -transformVal
  }

  if (b2.isPressed) {
    latestBright = s2.val
    s2.val = 0;
  } else if (b2.isReleased) {
    s2.val = latestBright;
  }

  if (b_aBack.isPressed) {
    clip_a = abs(clip_a - 1) % imgs.length
  } else if (b_aNext.isPressed) {
    clip_a = (clip_a + 1) % imgs.length
  }

  if (b_bBack.isPressed) {
    clip_b = abs(clip_b - 1) % imgs.length
  } else if (b_bNext.isPressed) {
    clip_b = (clip_b + 1) % imgs.length
  }


  if (s1.isChanged) {
    print(s1.label + " = " + s1.val);
  }
  if (s2.isChanged) {
    print(s2.label + " = " + s2.val);
  }

  noStroke()
  rect(0, 0, w, w * 0.5625)

  tint(255, (255 - s1.val * 255) * s2.val);
  image(imgs[clip_a], 0, 0, w, w * 0.5625);
  tint(255, s1.val * 255 * s2.val);
  image(imgs[clip_b], 0, 0, w, w * 0.5625);

  stroke(255)
  rect(w * 0.30, h * 0.74, w * 0.30, w * 0.30 * 0.5625);
  noTint()
  image(imgs[clip_a], w * 0.30, h * 0.74, w * 0.30, w * 0.30 * 0.5625);
  image(imgs[clip_b], w * 0.60, h * 0.74, w * 0.30, w * 0.30 * 0.5625);

  drawFps(2);
}

function mobileLayout() {
  let w = width;
  let h = height;

  b1 = createButton("Transform", 0, 0, w, w * 0.56);
  b2 = createButton("Black", w * 0.1, h * 0.85, w * 0.15, h * 0.1);


  b_aBack = createButton("<", w * 0.30, h * 0.85, w * 0.15, h * 0.1);
  b_aNext = createButton(">", w * 0.45, h * 0.85, w * 0.15, h * 0.1);
  b_bBack = createButton("<", w * 0.60, h * 0.85, w * 0.15, h * 0.1);
  b_bNext = createButton(">", w * 0.75, h * 0.85, w * 0.15, h * 0.1);

  b_fx1 = createButton("strobo", w * 0.30, h * 0.50, w * 0.15, h * 0.1);
  b_fx1 = createButton("FX1", w * 0.45, h * 0.50, w * 0.15, h * 0.1);
  b_fx1 = createButton("FX2", w * 0.60, h * 0.50, w * 0.15, h * 0.1);
  b_fx1 = createButton("FX3", w * 0.75, h * 0.50, w * 0.15, h * 0.1);



  // t1 = createToggle("Toggle 1", w * 0.05, h * 0.2, w * 0.4375, h * 0.125);
  // cf1 = createCrossfader("Crossfader 1", w * 0.5125, h * 0.2, w * 0.4375, h * 0.125);
  s1 = createCrossfader("SliderH", w * 0.1, h * 0.35, w * 0.8, h * 0.125, 0, 1);
  s2 = createSliderV("SliderV", w * 0.1, h * 0.5, w * 0.15, h * 0.35, 0, 1); // Last two args are min and max
  // cb1 = createCheckbox("Checkbox 1", w * 0.275, h * 0.5, w * 0.2125, h * 0.2125);
  // cb2 = createCheckbox("Checkbox 2", w * 0.275, h * 0.7375, w * 0.2125, h * 0.2125);
  // s2d1 = createSlider2d("Slider2d 1", w * 0.5125, h * 0.5, w * 0.4375, h * 0.45);
}

// TESTING ONLY - Draws an FPS averaged over a duration in seconds
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
