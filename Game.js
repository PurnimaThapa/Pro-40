class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
            
            swimmer1 = createSprite(100,50);
            swimmer1.debug="true"
            swimmer1.addImage("swimmer1",swimmer_img);
            swimmer1.scale=0.3
            swimmer2 = createSprite(5000,50);
            swimmer2.debug="true"
            swimmer2.addImage("swimmer2",swimmer2_img);
            swimmer2.scale=0.3
            swimmers = [swimmer1,swimmer2];
          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();
            
            if(allPlayers !== undefined){
              //var display_position = 100;
              image(ocean, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
              //index of the array
              var index =0;
        
        
              var x =200;
              var y;
        
              for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
                x = 200 + (index * 200) + allPlayers[plr].xPos;
                y = displayHeight - allPlayers[plr].distance ;
                
                swimmers[index-1].x = x;
                swimmers[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, swimmers[index - 1].x, swimmers[index - 1].y + 75);
                if (index === player.index){
                  swimmers[index - 1].shapeColor = "red";
                  camera.position.x = displayWidth/2;
                  camera.position.y = swimmers[index-1].y
                  if(swimmers[index-1].isTouching(obstacles)){
                  s.play()
                  yVel -=0.9                            
                  }
                }
               
              }
        
            }
        
            
            if(player.distance < 3700){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
                  if(keyIsDown(37)){
                      xVel -= 0.2;
                  }
                  if(keyIsDown(39)){
                      xVel += 0.2;
                  }
              }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }
        
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
    
          drawSprites();
        }
           
      
        }
        
           
      
        
