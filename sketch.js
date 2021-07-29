var player , enemy , playerBullet , enemyBullet
var back 
var enemy2 , bulletImg , enemyBulletImg
var playerImg , enemyImg, playerBImg, enemyBImg
var bgI1 , bgI2 , bgI3 
var gamestate = "stage1"
var score = 0
var flag = 1
var flag2 = 1 
var spaceShipImg
var enemySpaceShip , carImg
var backImg3
var people1 , people2 , people3 , people4 , gameOver , theEnd

function preload(){
bgI1 = loadImage("back 1.jpg")
bgI2 = loadImage("background.jpg")
bgI3 = loadImage("Back 3.jpg")
playerImg= loadAnimation("player1.png", "player2.png", "player3.png", "player4.png")
enemyImg = loadImage("enemy.png")
bulletImg = loadImage("image.png")
enemyBulletImg = loadImage("enemyBullet.png")
spaceShipImg = loadAnimation("spaceShip.png")
enemySpaceShip = loadImage("enemySpaceShip.png")
carImg = loadAnimation("car.png")
backImg3 = loadImage("track1.jpg")
petrolPumpImg = loadImage("petrolPump.png")
people1 = loadImage("people1.png")
people2 = loadImage("people5.png")
people3 = loadImage("people6.png")
people4 = loadImage("people4.png")
gameOver = loadAnimation("gameover.jpg")
theEnd = loadImage("theend.jpg")
}

function setup(){

createCanvas(500,800)
back = createSprite(250,450)
back.addImage(bgI2)

player = createSprite(200,800)
player.addAnimation("running", playerImg)
player.addAnimation("spaceShip" , spaceShipImg)
player.addAnimation("car", carImg)
player.addAnimation("over", gameOver)
player.addAnimation("end" , theEnd)

enemy = createSprite(70,100)
enemy.addImage(enemyImg)
enemy.scale = 0.2

enemy2 = createSprite(330,100)
enemy2.addImage(enemyImg)
enemy2.scale = 0.2
bulletGroup = new Group()
enemyGroup = new Group()
enemyGroup1 = new Group()
SpaceShipGroup = new Group()
PetrolPumpGroup = new Group()
PeoplesGroup = new Group()

}

function draw(){
 background(0)
 if(gamestate === "stage1"){
 
    back.velocityY = 5
 if(back.y > 700 ){
     back.y = 20
 }
    if(frameCount % 40 === 0){
 createBullets();
    }
 if(flag === 1){
 createEnemyBullet();
 }
 if(flag2 === 1){
 createEnemy1Bullet();
 }


  
  if(enemyGroup.isTouching(player) || enemyGroup1.isTouching(player)){
      enemyGroup.destroyEach();
      enemyGroup1.destroyEach();
      player.destroy();
      bulletGroup.destroyEach();
      gamestate = "over"
  }

  if(bulletGroup.isTouching(enemy)){
      score = score+1
      enemy.destroy();
      enemyGroup.destroyEach();
      flag = 0
  }

  if(bulletGroup.isTouching(enemy2)){
    score = score+1
      enemy2.destroy();
      enemyGroup1.destroyEach();
      flag2 = 0  
  }

   if(score === 2 ){
       score = 0
       gamestate = "stage2"
   }
  }
  if(gamestate === "stage2"){

    back.velocityY = 5
 if(back.y > 700 ){
     back.y = 20
 }
      back.addImage(bgI3)

      player.changeAnimation("spaceShip" , spaceShipImg)

      EnemySpaceShips()


      if(keyWentDown("space")){
        createBullets();
      }

      for( var i = 0 ; i < bulletGroup.length ; i++){
          for(var j = 0 ; j < SpaceShipGroup.length ; j++){
              if(bulletGroup.get(i).isTouching(SpaceShipGroup.get(j))){
                  bulletGroup.get(i).destroy()
                  SpaceShipGroup.get(j).destroy()
                  score = score + 1
              }
          }
      }
      
      if(score === 5){
          score = 0 
          enemyGroup.destroyEach()
          enemyGroup1.destroyEach()
          gamestate = "stage3"
          
           
      }
  }

  if(gamestate === "stage3"){

    back.velocityY = 5
 if(back.y > 700 ){
     back.y = 20
 }
     back.addImage(backImg3)
     back.scale = 2.2
           
     back.velocityY = -7

     player.changeAnimation("car", carImg)
     player.scale = 0.2

     PetrolPump()

     for( var i = 0 ; i < PetrolPumpGroup.length ; i++){
         if(PetrolPumpGroup.get(i).isTouching(player)){
             PetrolPumpGroup.get(i).destroy()
             score = score + 1
         }
     }

     for(var i = 0 ; i < PeoplesGroup.length ; i++){
         if(PeoplesGroup.get(i).isTouching(player)){
             PeoplesGroup.get(i).destroy()
             score = score - 1
         }
     }

    
   People()

   if(score === -1){
       gamestate = "over"
   }

   if(score === 10){
       gamestate = "end"
   }
  }

 else  if(gamestate === "over"){
    player.changeAnimation("over" , gameOver)
    player.x = 250 
    player.y = 400
    enemy.destroy()
    enemy2.destroy() 
    PeoplesGroup.destroyEach()
    PetrolPumpGroup.destroyEach()
    back.velocityY = 0   
    
}

 else if(gamestate === "end"){
    player.x = 250 
    player.y = 400
    player.changeAnimation("end", theEnd)
    PeoplesGroup.destroyEach()
    PetrolPumpGroup.destroyeach()

}
 console.log(gamestate)
  player.x =mouseX

  
drawSprites();

textSize(20)
fill("black")
text("score = "+ score , 400, 150)

}



function createBullets(){
    
    var bullet = createSprite(player.x,650,10,20)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityY = -5
    bullet.lifetime= 130
    bullet.shapeColor="red"
    bulletGroup.add(bullet)
    
}

function createEnemyBullet(){
    if(frameCount % 40 === 0){
        var eBullet = createSprite(enemy.x,120,10,10)
        eBullet.addImage(enemyBulletImg)
        eBullet.scale = 0.2
        eBullet.velocityY = 10
        var r = Math.round(random(2,6))
        eBullet.velocityX = r
        eBullet.lifetime = 130 
        eBullet.shapeColour = "red"
        enemyGroup.add(eBullet)
    }
}

function createEnemy1Bullet(){
    if(frameCount % 40 === 0){
        var Bullet1 = createSprite(enemy2.x,120,10,10)
        Bullet1.addImage(enemyBulletImg)
        Bullet1.scale = 0.2 
        Bullet1.velocityY = 10
        var ra = Math.round(random(-6,-2))
        Bullet1.velocityX = ra
        Bullet1.lifetime = 130
        Bullet1.shapeColor = "red"
        enemyGroup1.add(Bullet1)
    }
}

function EnemySpaceShips(){
    if(frameCount % 80 === 0){
        var spaceShip = createSprite(0,0)
        var r = Math.round(random(50,450))
        spaceShip.x = r
        spaceShip.addImage(enemySpaceShip)
        spaceShip.scale = 0.2
        spaceShip.velocityY = 10
        spaceShip.lifetime = 130
        spaceShip.shapeColor = "red"
        SpaceShipGroup.add(spaceShip)
    }
}

function PetrolPump(){
    if(frameCount % 200 === 0 ){
        var petrolPump = createSprite(0,0)
        var r =Math.round(random(50 , 450))
        var x = Math.round(random(50,450))
        petrolPump.velocityY = 7
        petrolPump.x = r
        petrolPump.y = x
        petrolPump.addImage(petrolPumpImg)
        petrolPump.scale = 0.5
        petrolPump.shapeColor = "red"
        PetrolPumpGroup.add(petrolPump)
    }
}

function People(){
    if (frameCount % 100 === 0){
        var people = createSprite(0,0);
         
         var r = Math.round(random(50,450))
         var ra = Math.round(random(50,450))
         people.velocityY = 7

          
         people.setCollider("rectangle",0,0,50,130)
        
         people.x = r
         people.y = ra
         
         var rand = Math.round(random(1,4));
         switch(rand) {
           case 1: people.addImage(people1);
                   break;
           case 2: people.addImage(people2);
                   break;
           case 3: people.addImage(people3);
                   break;
           case 4: people.addImage(people4);
                
            
                   
            ;
                   break;
           default: break;
         }
        
                   
         people.scale = 0.5;
         people.lifetime = 300;
        
        
       PeoplesGroup.add(people);
}
}