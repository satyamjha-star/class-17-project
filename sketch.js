
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var bananaScore = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  //obstacleImage spelling is wrong
  obstacleImage = loadImage("obstacle.png");
 
}


function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
 
  
    
  ground = createSprite(300,295,900,10);
  
  
  
  
  
  
}

function draw(){
  background("skyblue");
  fill("black");
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    bananaScore = bananaScore + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+bananaScore*1.5/100);
    
    
  
    if(keyDown("space")&&monkey.collide(ground)) {
      monkey.velocityY = -13; 
      
      
    }
    bananas();
    obstacles();
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground); 
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      // define bananascore=0 in function setup
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15); 
  }
drawSprites(); 
  
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    //in the below line it should be addImage not add animation
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+bananaScore*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    //delete the below line
    bananaGroup.add(banana);
    } 
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    //in the below line it should be addImage not add animation
    obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+bananaScore*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
     }
}




