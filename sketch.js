
let cam;
let screen;
let BGmodel,viewCube,noiseTx;
let ROflower=[],flower,leaf=[],emoji=[];
let leafTx,EmoTx,viewTx;

let v=[];
let rows = 6, cols=10, bendShape=0.1, bloom=300, angleY=0, angleZ=0, HueFlower=360;
let roangle = 0;

let loadcount = 0;
let percent = 0;

let ObjModel;
let r0=130,r1=80,phiMin=0,cubeNum=5,size=20;
let turn=0,offset=5;

function Loaded(){
  loadcount++;
  $("h3").text(percent+1+" %");
  if(percent>=92){
    $(".loading").fadeOut();
    $(".alert-font").fadeIn();
    $(".alert").animate({opacity:'0.6'});
    $(".alert").click(function () {
      $('.alert').fadeOut();
    });
  }
  percent = parseInt(loadcount/19*100);
}

function preload() {
  BGmodel = loadModel('Img/BG.obj', Loaded);
  flower = loadModel('Img/flower.obj', Loaded);
  viewCube = loadModel('Img/bgCube.obj', Loaded);
  for(let j=0; j<5; j++){
    ROflower[j] = loadModel('Img/ROflower'+j+'.obj', Loaded);
  }
  for(let i=0; i<4; i++){
    leaf[i] = loadModel('Img/leaf'+i+'.obj', Loaded);
  }
  for(let k=0; k<3; k++){
    emoji[k] = loadModel('Img/emoji'+k+'.obj', Loaded);
  }
  leafTx = loadImage('Img/Leaves_tex.png', Loaded);
  EmoTx = loadImage('Img/EmoTX.jpg', Loaded);
  noiseTx = loadImage('Img/glitch.png', Loaded);
  viewTx = loadImage('Img/ViewbgTx.jpg', Loaded);
}
function windowResized() {
  resizeCanvas(windowWidth-9, windowHeight-9, WEBGL);
}
function setup() {
  colorMode(HSB,360,100,100,100);
  imageMode(CENTER);
  angleMode(DEGREES);
  var canv = createCanvas(windowWidth-9, windowHeight-9, WEBGL);
  frameRate(24);
  camView = createCamera();
  camView.perspective();

  cam = createCapture(VIDEO);
  cam.size(20, 15);
  cam.hide();
  canv.parent("canvas-container");

  textureMode(NORMAL);
}

function draw() {
  background(330,0,0);
  screen = (windowWidth+windowHeight)/2;
  noStroke();
  roangle=roangle+3;
  blendMode(ADD);
  //donutTurnel
  turn -= 1;
  push();
    rotateX(90);
    texture(leafTx);
    translate(0,-800,0);
    push();
      rotateY(-turn/8);
      tint(111,40,100,100);
      TorusCube(leaf[0],screen,screen/2,360,0,360,45,20,30);
      TorusCube(leaf[2],screen,screen/4,360,0,80,90,30,45);
    pop();
    push();
      rotateY(turn/6);
      translate(0,50,0);
      tint(140,20,100,100);
      TorusCube(leaf[1],screen,screen/3,360,0,360,45,20,20);
      tint(140,0,100,100);
      TorusSphere(flower,screen,screen/3,360,0,360,60,15,-20);
    pop();
    push();
      //TorusEmoji(ObjModel,r0,r1,thetaMax,cubeNum,size,offset)
      texture(EmoTx);
      TorusEmoji(emoji[0],screen,screen/2,360,50,15,0);
      rotateY(turn/3);
      TorusEmoji(emoji[1],screen,screen/2,360,50,12,0);
      rotateY(-turn/3+20);
      TorusEmoji(emoji[2],screen,screen/2,360,50,12,0);
    pop();
  pop();
  
  

  push();
    push();
    texture(cam);
    rotateX(roangle/5);
    rotateY(roangle/6);
    scale(0.7+sin(roangle/3)*0.3);
      rotateX(120);
      rotateZ(-30);
      scale(56);
      smooth();
      tint(100,60,60,100);
      sphere(4.8,16,16);
      tint(0,25,100,100);
      model(ROflower[0]);
      tint(50,90,100,100);
      model(ROflower[1]);
      tint(20,0,100,100);
      model(ROflower[2]);
      tint(310,60,80,100);
      model(ROflower[3]);
      tint(230,20,90,100);
      model(ROflower[4]);
      texture(leafTx)
      model(leaf[3]);
    pop();
    push();
        rotateZ(roangle/10);
        TorusDot(screen);
    pop();
  pop();
  push();
  noStroke();
  translate(0,0,-550);
  texture(viewTx);
  scale((windowHeight/4)*3,-windowHeight,10);
  rotateX(90);
  model(viewCube);
  pop();

  push();
  noStroke();
  translate(0,0,500);
  texture(noiseTx);
  scale(windowWidth,windowHeight,10);
  rotateX(90);
  tint(150,30,100,30);
  model(BGmodel);
  pop();
}


function TorusCube(ObjModel,r0,r1,thetaMax,phiMin,phiMax,cubeNum,size,offset){
  for(let theta=0; theta<thetaMax; theta+=cubeNum){
    for(let phi=phiMin; phi<phiMax; phi+=cubeNum){
      push();
      let bump = 1+0.2*sin(phi*5)*sin(theta*5);
      
      let x = (r0+r1*bump * cos(phi+turn+offset))*sin(theta);
      let y = r1*bump * sin(phi+turn+offset);
      let z = (r0+r1*bump * cos(phi+turn+offset))*cos(theta);
      translate(x,y,z);
      rotateY(y);
      rotateZ(z);
      scale(size*(windowWidth*0.003)+phi*0.3);
      model(ObjModel);
      pop();
    }
  }
}
function TorusSphere(ObjModel,r0,r1,thetaMax,phiMin,phiMax,cubeNum,size,offset){
  for(let theta=0; theta<thetaMax; theta+=cubeNum){
    for(let phi=phiMin; phi<phiMax; phi+=cubeNum){
      push();
      let bump = 1+0.1*sin(phi*8)*sin(theta*6);
      let x = (r0+r1*bump * cos(phi+(turn/4)+offset))*sin(theta);
      let y = r1*bump * sin(phi+(turn/4)+offset);
      let z = (r0+r1*bump * cos(phi+(turn/4)+offset))*cos(theta);
      translate(x,y,z);
      scale(size*(windowWidth*0.003)+phi*0.5);
      rotateX(x);
      model(ObjModel);
      pop();
    }
  }
}
function TorusEmoji(ObjModel,r0,r1,thetaMax,cubeNum,size,offset){
  for(let theta=0; theta<thetaMax; theta+=cubeNum){
    push();
      let x = (r0+r1* cos(theta*6+turn+offset))*sin(theta);
      let y = r1 * sin(theta*6+turn+offset);
      let z = (r0+r1* cos(theta*6+turn+offset))*cos(theta);
      translate(x,y,z);
      scale(size*(windowWidth*0.003));
      rotateY(90);
      rotateZ(90);
      rotateX(x);
      model(ObjModel);
    pop();
  }
}
function TorusDot(r0){
  for(let theta=0; theta<360; theta+=30){
    for(let phi=0; phi<360; phi+=30){
      beginShape(POINTS);
      let bump = 1+0.6*sin(phi*3)*sin(theta*6);
      let x = (r0/4+r0*bump * cos(phi+(turn/5)))*sin(theta);
      let y = r0*bump * sin(phi+(turn/5));
      let z = (r0/4+r0*bump * cos(phi+(turn/5)))*cos(theta);
      vertex(x,y,z);
      endShape();
      stroke(50,100,100,20);
      strokeWeight(1);
    }
  }
}
