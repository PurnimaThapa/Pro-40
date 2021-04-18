var canvas, backgroundImage;

var gameState = 0,finishedPlayers;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var obstacles
var s
var form, player, game;
var swimmers, swimmer1, swimmer2
var ocean, swimmer_img, swimmer2_img;
var i
var f2,f1
function preload(){
  ocean = loadImage("../images/ocean.jpg");
  f2 = loadImage("images/shark.png")
  s = loadSound("sound/sharkS.mp3")
  swimmer_img = loadImage("../images/swimmer1.png");
  swimmer2_img = loadImage("../images/swimmer2.png");
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
  finishedPlayers = 0;
  yVel = 0;
  xVel = 0;
  obstacles=createGroup()
  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  for(i=0;i<5;i++){
    w=random(700,500)
    h=random(-height*4,height-300)
    f1=createSprite(w,h)
    f1.addImage("f1",f2)
    f1.scale=0.3
    obstacles.add(f1)
  }
}


function draw(){
   //start the game
   background(200, 200, 255);

   if (playerCount === 2 ) {
     game.update(1);
   }
 
   //start the game for real
   if (gameState === 1) {
     game.play();
   }
   if (gameState === 2) {
    game.end();
   }}
 
  
