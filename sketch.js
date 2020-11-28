var ghost,ghost_pic;
var tower,tower_pic;
var climber,climber_pic,climberGroup;
var door,door_pic,DG;
var gameState = "PLAY";
var invisibleblock;

function preload(){
  
  ghost_pic = loadImage("ghost-standing.png");
  tower_pic = loadImage("tower.png");
  climber_pic = loadImage("climber.png");
  door_pic = loadImage("door.png");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,100,100);
  tower.addImage("gg", tower_pic);
  tower.velocityY = 1 ;
  
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ff", ghost_pic);
  ghost.scale = 0.5;
  
  DG = new Group();
  climberGroup = new Group();
  
  invisibleblock = createSprite(300,500,200,5);
  invisibleblock.lifetime = 800;

  invisibleblock.visible = false;
  
}

function draw(){
  background(0);
  ghost.collide(invisibleblock);  
  if(gameState==="PLAY"){
  
  spawndoors();
  
  if(keyDown("space")){
   ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY +0.8;
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x +3;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    
    if(ghost.y > 600){
      
      gameState = "END";
    }
    if(tower.y > 400){
    tower.y = 300;
  }
  }
  if(gameState==="END"){
    
    textSize(20);
    fill("red");
    text("Game Over",250,100);
  }
  
  
  
    drawSprites();
}

function spawndoors(){
  
  if(frameCount % 220===0){

  door = createSprite(200,50,20,20);
  door.addImage("yy",door_pic);
  
  climber = createSprite(200,100,20,20);
  climber.addImage("ii", climber_pic);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    
    door.x = Math.round(random(100,400));
    climber.x = door.x;
    
    door.depth =  ghost.depth;
    ghost.depth = ghost.depth +1;
    
    climberGroup.add(climber);
    DG.add(door);
    
    climberGroup.lifetime = 600;
    DG.lifetime = 600;
   }
  }
