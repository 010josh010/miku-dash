mikuDash.Game = function(game){
   this.player; 
   this.level; 
   this.floor;
   this.tile;
}; 

mikuDash.Game.prototype = {
    
    create:function(){
        
        //for adding the level and floor 
        this.level = this.add.sprite(0,0 , 'level_1' , 3); 
        this.level.scale.setTo(0.5 , 0.5);
        
        this.floor = this.add.sprite(0 ,500 , 'level_1' , 1);
        this.floor.scale.setTo(0.5 , 0.5);
        
        this.tile = this.add.sprite(0, 200, 'level_1' , 2); 
        this.tile.scale.setTo(0.5 , 0.5);
        
        
        //for adding the player character
        this.player = this.add.sprite(0,0 , 'miku'); 
        
        //for enabling physics 
        this.physics.arcade.enable([this.player , this.floor , this.tile]);
        
        //for setting gravity 
        this.player.body.gravity.y = 1000;
        this.player.body.bounce.y = 0.2; 
        this.player.body.collideWorldBounds = true;
        
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        
        this.tile.body.allowGravity = false; 
        this.tile.body.immovable = true;
       
        
        //player animations 
        this.player.animations.add('idle' , this.addFrames(0,19));
        this.player.animations.add('walk' , this.addFrames(20, 27));
        
        this.player.animations.play('idle' , 11 , true);
        
        //for camera 
        this.game.camera.follow(this.player);
        
        //for input 
        this.cursors = this.input.keyboard.createCursorKeys();
        

        
    }, 
    
    //for adding character animation frames
    addFrames :function(f1, f2){
            var frames = []; 
            for(var i = f1; i<=f2 ; i++){
                if(!isNaN(f1) && !isNaN(f2)){
                    frames.push(i); 
                } else {
                    console.error('must pass a number to the addFrames function')
                }
            }
            return frames; 
        }, 
    
    playerOnFloor:function(){
       console.log('player is on the floor')
    }, 
    
    
    update:function(){
        //for collisions 
        this.physics.arcade.collide(this.player, this.floor , this.playerOnFloor, null , this);
        this.physics.arcade.collide(this.player, this.tile , this.playerOnFloor, null , this);
        
        if(this.cursors.right.isDown) {
            this.player.body.velocity.x =200;
            this.player.animations.play('walk' , 11, true); 
        } else {
            this.player.body.velocity.x = 0 ; 
            this.player.animations.play('idle' ,11, true);
        }
        
        

        
    }, 
    
    render:function(game){
       // game.debug.spriteInfo(this.player , 32 , 32)
        //game.debug.body(this.floor)
    }
}