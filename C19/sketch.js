var trex,ground,score,inviG;
var trex_running,trex_collided,ground_image,cloud_image,bird_image;
var ob1,ob2,ob3,ob4,ob5,ob6;
var gameOver,gameOver_image,restart,restart_image;
var birdsGroup,cloudsGroup,obstaclesGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var bird_image,trex_duck;

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  
trex_collided=loadAnimation("trex_collided.png"); 
  
ground_image=loadImage("ground2.png");
  
  ob1=loadImage("obstacle1.png");
  
  ob2=loadImage("obstacle2.png");
  
  ob3=loadImage("obstacle3.png");
  
  ob4=loadImage("obstacle4.png");
  
  ob5=loadImage("obstacle5.png");
  
  ob6=loadImage("obstacle6.png");
  
  gameOver_image=loadImage("gameOver.png");
  
  restart_image=loadImage("restart.png");
  
  cloud_image=loadImage("cloud.png");
  
  bird_image=loadImage("Bird.png");
  
  trex_duck=loadAnimation("Dino 1.png");
}

function setup() {
  createCanvas(600, 300);
  
  trex=createSprite(50,260,30,50);
  
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.addAnimation("ducking",trex_duck);
  trex.scale=0.5;
  
  ground=createSprite(300,285,600,30);
  ground.x=ground.width/2;
  
  ground.addImage(ground_image);
  
  inviG=createSprite(300,290,600,10);
  inviG.visible=false;
  
  gameOver=createSprite(300,120);
  gameOver.visible=false;
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;
  
  restart=createSprite(300,150);
  restart.visible=false;
  restart.addImage(restart_image);
  restart.scale=0.5;
  
  cloudsGroup=new Group();
  birdsGroup=new Group();
  obstaclesGroup=new Group();
  
}

function draw() {
   background(180);
  
  text("SCORE "+score,300,30);
  
  if(gameState===PLAY){

  trex.collide(inviG);
  
  ground.velocityX=-3;
  
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&trex.y>261){
  trex.velocityY=-13;
  }
  
  trex.velocityY=trex.velocityY+0.8;
  
  if(keyWentDown(DOWN_ARROW)){
   trex.changeAnimation("ducking",trex_duck);
   trex.scale=0.15; 
  }
    
  if(keyWentUp(DOWN_ARROW)){
  trex.changeAnimation("running",trex_running);
    trex.scale=0.5;
  }
    
  score=score+Math.round(getFrameRate()/60);  
    
  clouds();
   
    //score
  if(score%800>1&&score%800<400){
    obstacles();
 }
 if(score%800>401&&score%800<799){
    birds(); 
 }
    
  if(obstaclesGroup.isTouching(trex)||birdsGroup.isTouching(trex)){
    gameState=END;
  }
  }
  else
    if(gameState===END){
     gameOver.visible=true;
     restart.visible=true;
      trex.velocityY=0;
      trex.changeAnimation("collided",trex_collided);
      trex.scale=0.5;
      cloudsGroup.setVelocityXEach(0);
      cloudsGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      inviG.velocityX=0;
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      birdsGroup.setVelocityXEach(0);
      birdsGroup.setLifetimeEach(-1);
       if(mousePressedOver(restart)){
         reset();
       }
    }
 
  drawSprites();
}


function clouds(){
if(frameCount%50===0){
  var cloud=createSprite(600,200);
  cloud.addImage(cloud_image);
  cloud.scale=0.7;
  cloud.velocityX=-10;
  cloud.y=Math.round(random(120,220));
  cloud.lifetime=80;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudsGroup.add(cloud);
} 
}

function obstacles(){
 if(frameCount%60===0){
  var obstacle=createSprite(600,270);
  var r=Math.round(random(1,6));
  switch(r){
    case 1:obstacle.addImage(ob1);
      break;
    case 2:obstacle.addImage(ob2);
      break;
    case 3:obstacle.addImage(ob3);
      break;
    case 4:obstacle.addImage(ob4);
      break;
    case 5:obstacle.addImage(ob5);
      break;
    case 6:obstacle.addImage(ob6);
      break;
      default:break;
  }
   obstacle.scale=0.5;
   obstacle.velocityX=-7;
   obstacle.lifetime=110;
   obstaclesGroup.add(obstacle);
 }
}

function birds(){
 if(frameCount%60===0){
  var bird=createSprite(600,230);
   bird.addImage(bird_image);
   bird.y=Math.round(random(220,270));
   bird.scale=0.1;
   bird.velocityX=-7;
   bird.lifetime=150;
   birdsGroup.add(bird); 
 }
  
}

function reset(){
 gameState=PLAY;
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
}