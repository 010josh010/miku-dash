mikuDash.Game = function(game){
    this.player; 
    this.level; 
    this.floor;
    this.tile;
    this.startText; 
}; 

mikuDash.Game.prototype = {
    
    
    
    //for adding character animation frames
    addFrames :function(name, f1, f2){
            var frames = []; 
            for(var i = f1; i<=f2 ; i++){
                if(!isNaN(f1) && !isNaN(f2)){
                    frames.push(name +i+'.png'); 
                } else {
                    console.error('must pass a number to the addFrames function'); 
                }
            }
            return frames; 
        }, 
    
    create:function(){
    
        //setting boundaries in the world 
        this.world.setBounds(0, 0, 1500, 1080);
        
        //for adding the level and floor 
        this.level = this.add.tileSprite(0,0 ,1920 , 1080, 'level_1' , 3); 
        this.level.scale.setTo(0.8 , 0.8);
    
        
        this.floor = this.add.tileSprite(0 , 800, 1920 , 140, 'level_1' , 1);
        this.floor.scale.setTo(0.8 , 0.8);
        this.floor.physicsType = Phaser.SPRITE;
        
        this.floorTile = this.add.sprite(0, 250, 'level_1' , 2); 
        this.floorTile.scale.setTo(0.5, 0.5);
        this.floorTile.pysicsType = Phaser.SPRITE;
        
        
        //for adding the player character
        this.player = this.add.sprite(0,0 , 'miku');
        this.player.anchor.setTo(0.5 , 1);
        
        //adding player direction 
        this.player.direction = 'right';
        
        //adding player disposition 
        this.player.isOnFloor = false;
        this.player.jumping = false;
        this.player.falling = true;
        
        //for enabling physics 
        this.physics.arcade.enable([this.player , this.floor , this.floorTile]);
        
        //for setting gravity and body properties 
        //this.player.enableBody = true;
        this.player.body.gravity.y = 1000 ;
        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        
        this.floor.body.allowGravity = false;
        this.floor.body.checkCollision.down = false;
        this.floor.body.immovable = true;
        
        //this.floorTile.enableBody = true;
        this.floorTile.body.allowGravity = false; 
        this.floorTile.body.immovable = true;
       
        
        //player animations 
        this.player.animations.add('idle' , this.addFrames('miku_idle_', 0,19));
        this.player.animations.add('walk' , this.addFrames('miku_walk_', 0, 7));
        this.player.animations.add('dance' , this.addFrames('miku_dance_' , 0 ,11)); 
        this.player.animations.add('land' , this.addFrames('miku_land_', 0 , 1)); 
        this.player.animations.add('beginFalling' , this.addFrames('miku_beginFalling_' , 0 ,2)); 
        this.player.animations.add('falling' , this.addFrames('miku_falling_' , 0 ,1));
        this.player.animations.add('hurt' , this.addFrames('miku_hurt_' , 0, 2)); 
        this.player.animations.add('turn' , this.addFrames('miku_turn_' , 0 , 0)); 
        this.player.animations.add('jump' , this.addFrames('miku_jump_' , 0 , 1));
        
        //start the idle animation on start 
        this.player.animations.play('idle' , 11 , true);
        
        //for player movement speed 
        this.player.walkSpeed = 250 ; 
        this.player.runSpeed = 500; 
        this.player.jumpHeight = -550;
        
        //background speed
        this.backgroundSpeed = 4.5;
        
        //for camera 
        this.game.camera.follow(this.player ,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        
        //for controls 
        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.fireBtn = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
        //to stop keyboard events from propagating to the browser
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
        
        //for start text 
        this.startText = this.add.bitmapText(this.player.body.position.x+300, this.world.centerY-450, 'Idroid' , 'Start!' , 48); 
        this.time.events.add(2000, function() { this.add.tween(this.startText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    this.add.tween(this.startText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
        
        
        
    }, 
    
    
    playerOnLand: function(){
        if(!this.player.isOnFloor){
            console.log('on floor')
            this.player.body.y -=30;
            this.player.isOnFloor = true;
            this.player.jumping = false; 
            this.player.falling = false;
            console.log('jumping:' , this.player.jumping)
            
        }
    }, 

    
    update:function(){
        //for collisions 
        this.physics.arcade.collide(this.player, this.floor , this.playerOnLand , null , this);
        this.physics.arcade.collide(this.player, this.floorTile , this.playerOnLand , null , this );
        
        
        //basic movement 
        if(this.cursors.right.isDown && !this.player.jumping){
            
            if(this.player.direction === 'left'){
                this.player.body.y -=2;
                this.player.scale.x = 1 ;
                
            }
            
            if(this.player.body.position.x >= this.world.width /2){
                
                this.level.tilePosition.x -=this.backgroundSpeed; 
                this.floor.tilePosition.x -=this.backgroundSpeed;
                this.floorTile.destroy(); 
                
                this.player.body.velocity.x = 0;
                this.player.direction = 'right';
                this.player.animations.play('walk' , 11, true); 

            } else {
                this.player.direction = 'right';
                this.player.animations.play('walk' , 11, true); 
                this.player.body.velocity.x = this.player.walkSpeed;
            }
          
          
            
        } else if (this.cursors.left.isDown && !this.player.jumping){
            
            if(this.player.direction === 'right'){
                this.player.body.y -=2;
                this.player.scale.x = -1; 
            }
            
            this.player.direction = 'left';
            this.player.animations.play('walk' , 11, true); 
            this.player.body.velocity.x = -this.player.walkSpeed; 
            
            
        }  else if (this.cursors.up.isDown){
            
               this.player.isOnFloor = false;
                this.player.jumping = true;
                console.log('jumping:' , this.player.jumping)
            
            if(this.player.body.touching.down){
                this.player.animations.stop(null , true);
                this.player.animations.play('jump' , 7, false).onComplete.add(function(){
                    this.player.animations.play('beginFalling' , 7 , false).onComplete.add(function(){
                        this.player.animations.play('falling' , 7 , true);
                    } , this)
                } , this);
                
                this.player.body.velocity.y = this.player.jumpHeight; 
            }
            
        } else if(!this.player.jumping && !this.player.body.touching.down && this.player.falling){
            
            this.player.isOnFloor = false;
            this.player.animations.play('beginFalling' , 7 , false).onComplete.add(function(){
                this.player.animations.play('falling' , 7 , true);
            } , this)
            console.log('falling')
            this.player.falling = false;
        }
        
        
        else {
            
            if(this.player.body.touching.down){
                this.player.animations.play('idle' ,11 ,true);
                this.player.body.velocity.x = 0 ; 
                
            } 
        }
        
        //advanced movement----------------------------------------
        
        //when player is jumping 
        if(this.player.jumping){
           if(this.cursors.right.isDown){
                if(this.player.direction === 'left'){
                this.player.body.y -=2;
                this.player.scale.x = 1 ;
                
            }
            
            if(this.player.body.position.x >= this.world.width /2){
                
                this.level.tilePosition.x -=this.backgroundSpeed; 
                this.floor.tilePosition.x -=this.backgroundSpeed;
                this.floorTile.destroy(); 
                
                this.player.body.velocity.x = 0;
                this.player.direction = 'right'; 

            } else {
                this.player.direction = 'right';
                this.player.body.velocity.x = this.player.walkSpeed;
            }
               
           }
            
            if(this.cursors.left.isDown){
                if(this.player.direction === 'right'){
                this.player.body.y -=2;
                this.player.scale.x = -1; 
            }
            
                this.player.direction = 'left';
                this.player.body.velocity.x = -this.player.walkSpeed; 
            }
        }
        
        
        
       //when player is already moving
        if(this.cursors.right.isDown && this.cursors.up.isDown && !this.player.jumping && this.player.isOnFloor){
            
                this.player.isOnFloor = false;
                this.player.jumping = true;
            
             this.player.animations.stop(null , true);
                this.player.animations.play('jump' , 7, false).onComplete.add(function(){
                    this.player.animations.play('beginFalling' , 7 , false).onComplete.add(function(){
                        this.player.animations.play('falling' , 7 , true);
                    } , this)
                } , this);
                
                this.player.body.velocity.y = this.player.jumpHeight; 
             
            
        } else if (this.cursors.left.isDown && this.cursors.up.isDown && !this.player.jumping){
            
                this.player.isOnFloor = false;
                this.player.jumping = true;
            
                 this.player.animations.stop(null , true);
                this.player.animations.play('jump' , 7, false).onComplete.add(function(){
                    this.player.animations.play('beginFalling' , 7 , false).onComplete.add(function(){
                        this.player.animations.play('falling' , 7 , true);
                    } , this)
                } , this);
                
                this.player.body.velocity.y = this.player.jumpHeight; 
        } 
        
    }, 
    
    render:function(game){
        
        //for debugging 
       game.debug.spriteInfo(this.player , 32 , 32)
       game.debug.cameraInfo(game.camera , 500 , 32)
    }
}