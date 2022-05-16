var caracter, caracterImg;
var obstaclesGroup, obstacle1, obstacle2;
var background, backgroundImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var ground, invisibleGround, groundImage;
var gameOver, restart;

function preload(){

    obstacle1 = loadImage("pedra1.png");
    obstacle2 = loadImage("matagal1.webp");
    groundImage = loadImage("");
    caracterImg = loadImage("fada.notPng.png");
    backgroundImg = loadImage("floresta.webp");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    invisibleGround = createSprite(width/2,height-10,width,125);  
    invisibleGround.shapeColor = "#f4cbaa";
    
    //ground
    ground = createSprite(width/2,height,width,2);
    ground.x = width/2
    ground.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(width/2,height/2- 50);

    restart = createSprite(width/2,height/2);

    gameOver.visible = false;
    restart.visible = false;

    score=0;

}

function draw() {
    background(backgroundImg);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);
    
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
      
      if((touches.length > 0 || keyDown("SPACE")) && caracter.y  >= height-120) {
        jumpSound.play( )
        caracter.velocityY = -10;
         touches = [];
      }
      
      caracter.velocityY = caracter.velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      caracter.collide(invisibleGround);
      spawnObstacles();
    
      if(obstaclesGroup.isTouching(caracter)){
          collidedSound.play()
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      caracter.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      
      //change the caracter animation
      caracter.changeAnimation("");
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      
      
      if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
      }
    }

    drawSprites();   
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.setCollider('circle',0,0,45) 
    
      obstacle.velocityX = -(6 + 3*score/100);
    
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }

    }
    }