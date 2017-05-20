mikuDash.Game = function(game){
   this.player; 
   this.level; 
   this.floor;
   this.tile;
   this.startText; 
}; 

mikuDash.Game.prototype = {
    
    create:function(){
    
        //setting boundaries in the world 
        this.world.setBounds(0, 0, 1920, 1080);
        
        //for adding the level and floor 
        this.level = this.add.tileSprite(0,0 ,1920 , 1080, 'level_1' , 3); 
        this.level.scale.setTo(0.8 , 0.8);
    
        
        this.floor = this.add.sprite(0 , 800, 'level_1' , 1);
        this.floor.scale.setTo(0.75 , 0.75);
        
        this.floorTile = this.add.sprite(0, 250, 'level_1' , 2); 
        this.floorTile.scale.setTo(0.5, 0.5);
        
        
        //for adding the player character
        this.player = this.add.sprite(0,0 , 'miku');
        this.player.anchor.setTo(0.5 , 1);
        
        //adding player direction 
        this.player.direction = 'right';
        
        //adding player disposition 
        this.player.isOnFloor = false; 
        
        //for enabling physics 
        this.physics.arcade.enable([this.player , this.floor , this.floorTile]);
        
        //for setting gravity and body properties 
        this.player.body.gravity.y = 800;
        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        
        this.floorTile.body.allowGravity = false; 
        this.floorTile.body.immovable = true;
       
        
        //player animations 
        this.player.animations.add('idle' , this.addFrames(0,19));
        this.player.animations.add('walk' , this.addFrames(20, 27));
        
        //start the idle animation on start 
        this.player.animations.play('idle' , 11 , true);
        
        //for player movement speed 
        this.player.walkSpeed = 250 ; 
        this.player.runSpeed = 500; 
        this.player.jumpHeight = -550; 
        
        //for camera 
        this.game.camera.follow(this.player ,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        
        
        //for controls 
        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.fireBtn = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        
        //to stop keyboard events from propagating to the browser
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);
        
        //for start text 
        this.startText = this.add.bitmapText(this.world.centerX-75, this.world.centerY-150, 'Idroid' , 'Start!' , 48); 
        
        
        this.time.events.add(2000, function() { this.add.tween(this.startText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    this.add.tween(this.startText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
        
        
    }, 
    
    //for adding character animation frames
    addFrames :function(f1, f2){
            var frames = []; 
            for(var i = f1; i<=f2 ; i++){
                if(!isNaN(f1) && !isNaN(f2)){
                    frames.push(i); 
                } else {
                    console.error('must pass a number to the addFrames function'); 
                }
            }
            return frames; 
        }, 
    
    
    playerHit: function(){
            
    }, 
    
    
    update:function(){
        //for collisions 
        this.physics.arcade.collide(this.player, this.floor , this.playerHit , null , this);
        this.physics.arcade.collide(this.player, this.floorTile , this.playerHit , null , this );
        
        
        //basic movement 
        if(this.cursors.right.isDown){
            
            if(this.player.direction === 'left'){
                this.player.scale.x = 1 ;
            }
            
            this.player.direction = 'right';
            this.player.animations.play('walk' , 11, true); 
            this.player.body.velocity.x = this.player.walkSpeed;
            
        } else if (this.cursors.left.isDown){
            
            if(this.player.direction === 'right'){
                this.player.scale.x = -1; 
            }
            
            this.player.direction = 'left';
            this.player.animations.play('walk' , 11, true); 
            this.player.body.velocity.x = -this.player.walkSpeed; 
            
            
        }  else if (this.cursors.up.isDown){
               
            if(this.player.body.touching.down){
                this.player.body.velocity.y = this.player.jumpHeight; 
            }
            
        } else {
            
            this.player.animations.play('idle' ,11 ,true); 
            this.player.body.velocity.x = 0 ; 
        }
        
        //advanced movement 
        if(this.cursors.right.isDown && this.cursors.up.isDown && this.player.body.touching.down){
            
            this.player.body.velocity.y = this.player.jumpHeight; 
            
        } else if (this.cursors.left.isDown && this.cursors.up.isDown && this.player.body.touching.down){
            
            this.player.body.velocity.y = this.player.jumpHeight; 
        }
        
    }, 
    
    render:function(game){
       game.debug.spriteInfo(this.player , 32 , 32)
        //game.debug.body(this.floor)
    }
}