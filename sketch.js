
let cam;
let BGmodel;
let ROflower=[],flower,leaf=[],emoji=[];
let leafTx,EmoTx;

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
  if(percent>=90){
    $(".loading").fadeOut();
    $(".alert-font").fadeIn();
    $(".alert").animate({opacity:'0.6'});
    $(".alert").click(function () {
      $('.alert').fadeOut();
    });
  }
  percent = parseInt(loadcount/17*100);
}

function preload() {
  BGmodel = loadModel('Img/BG.obj', Loaded);
  flower = loadModel('Img/flower.obj', Loaded);
  for(let j=0; j<6; j++){
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
}

function setup() {
  colorMode(HSB,360,100,100);
  imageMode(CENTER);
  angleMode(DEGREES);
  var canv = createCanvas(windowWidth, windowHeight, WEBGL);
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
  noStroke();
  roangle=roangle+3;
  //donutTurnel
  turn -= 1;
  push();
    rotateX(90);
    texture(leafTx);
    translate(0,-800,0);
    push();
      rotateY(-turn/8);
      tint(111,40,100);
      TorusCube(leaf[0],windowWidth/2+300,windowHeight/2-200,360,0,360,30,10,30);
      TorusCube(leaf[2],windowWidth/2+180,windowHeight/2-200,360,0,80,90,40,45);
    pop();
    push();
      rotateY(turn/2);
      translate(0,50,0);
      tint(140,20,100);
      TorusCube(leaf[1],windowWidth/2+400,windowHeight/2-200,360,0,360,30,30,0);
      tint(140,0,100);
      TorusSphere(flower,windowWidth/2+350,windowHeight/2-100,360,0,360,60,15,-20);
    pop();
    push();
      //TorusEmoji(ObjModel,r0,r1,thetaMax,cubeNum,size,offset)
      texture(EmoTx);
      TorusEmoji(emoji[0],windowWidth/2+550,windowHeight/2,360,25,30,0);
      rotateY(turn/3);
      TorusEmoji(emoji[1],windowWidth/2+550,windowHeight/2,360,20,30,0);
      rotateY(-turn/3+20);
      TorusEmoji(emoji[2],windowWidth/2+550,windowHeight/2,360,60,30,0);
    pop();
  pop();
  
  

  push();
    texture(cam);
    // push();
    // rotateZ(roangle);
    //   push();
    //   //MirrorFlower(rows,cols,bendShape,bloom,angleY,angleZ,HueFlower)
    //     translate(-windowWidth/4,-windowHeight/4,0);
    //     MirrorFlower(6,5+cos(roangle/2)*5,0.3,16*cos(roangle/2)*15,0,0,340);
    //     translate(windowWidth/2,0,0);
    //     MirrorFlower(6,5+cos(roangle/2)*5,0.3,16*cos(roangle/2)*15,0,0,340);
    //     translate(-windowWidth/2,windowHeight/2,0);
    //     MirrorFlower(6,5+cos(roangle/2)*5,0.3,16*cos(roangle/2)*15,0,0,340);
    //     translate(windowWidth/2,0,0);
    //     MirrorFlower(6,5+cos(roangle/2)*5,0.3,16*cos(roangle/2)*15,0,0,340);
    //   pop();
    // pop();
    push();
    rotateX(roangle/5);
    rotateY(roangle/6);
    scale(1+sin(roangle/2)*0.2);
      rotateX(120);
      rotateZ(-30);
      scale(56);
      smooth();
      translate(0,0,0);
      tint(286,40,90);
      model(ROflower[0]);
      tint(50,60,90);
      model(ROflower[1]);
      tint(20,30,90);
      model(ROflower[2]);
      tint(310,30,90);
      model(ROflower[3]);
      tint(220,30,90);
      model(ROflower[4]);
      tint(360,0,90);
      model(ROflower[5]);
      texture(leafTx)
      model(leaf[3]);
    pop();

  pop();

  push();
  noStroke();
  translate(0,0,-1200);
  texture(cam);
  scale(windowWidth*1.5,windowHeight*1.5,10);
  rotateX(90);
  tint(150,80,20);
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
      let x = (r0+r1*bump * cos(phi+turn+offset))*sin(theta);
      let y = r1*bump * sin(phi+turn+offset);
      let z = (r0+r1*bump * cos(phi+turn+offset))*cos(theta);
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
function MirrorFlower(rows,cols,bendShape,bloom,angleY,angleZ,HueFlower){
  rotateY(angleY);
  rotateZ(angleZ);
  push();
  rotateX(0);
  translate(0,0,bloom);
  //rows=rows+round(mouseX/360);
  //cols=cols+round(mouseY/180);
      for(theta = 0; theta<rows; theta+=1){
        v.push([]);
        for(let phi=0; phi<cols; phi+=1){
          let r = (80*pow(abs(sin(5/2*phi*360/cols)),1)+bloom)*theta/rows;
          let x = r * cos(phi*360/cols);
          let y = r * sin(phi*360/cols);
          // let bumpin = 2*pow(r/100,2)*sin(phi*12);
          // let z = 300*pow(Math.E,-0.1*pow(abs(r/100),1.5))*pow(abs(r/100),0.5)-180+bumpin;
          let z = vShape(300,r/100,0.5,bendShape,1.5)-180+bumpin(1,r/100,12,phi*360/cols);
          let pos = createVector(x,y,z);
          v[theta].push(pos);
        }
      }
      for(let theta = 0; theta<v.length; theta++){
        for(let phi = 0; phi<v[theta].length; phi++){
        tint(HueFlower,70-theta*10,80+theta*10);
          if(theta<v.length-1 && phi<v[theta].length-1){
            beginShape();
            vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z,0,1);
            vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z,0,0);
            vertex(v[theta+1][phi+1].x, v[theta+1][phi+1].y, v[theta+1][phi+1].z,1,0);
            vertex(v[theta][phi+1].x, v[theta][phi+1].y, v[theta][phi+1].z,1,1);
            endShape(CLOSE);
          }else if(theta<v.length-1 && phi == v[theta].length-1){
            beginShape();
            vertex(v[theta][phi].x, v[theta][phi].y, v[theta][phi].z,0,1);
            vertex(v[theta][0].x, v[theta][0].y, v[theta][0].z,1,1);
            vertex(v[theta+1][0].x, v[theta+1][0].y, v[theta+1][0].z,1,0);
            vertex(v[theta+1][phi].x, v[theta+1][phi].y, v[theta+1][phi].z,0,0);
            endShape(CLOSE);
          }
        }
      }
  v = [];
  pop();
}
function vShape(A,r,a,b,c){
  return A*pow(Math.E,-b*pow(abs(r),c))*pow(abs(r),a);
}
function bumpin(A,r,f,angle){
  return 1 + A*pow(r,2)*sin(f*angle);
}
