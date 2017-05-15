mikuDash.StartMenu = function(game){
    this.startBG; 
    this.startPrompt;
}

mikuDash.StartMenu.prototype = {
    
    create:function(){
        this.sound.play('polka');
        this.startBG = this.add.sprite(0,0, 'level_1' , 'level_1_layer_1.png');
        this.startBG.scale.setTo(0.5 , 0.5); 
        this.startBG.inputEnabled = true;
        this.startBG.events.onInputDown.addOnce(this.startGame , this); 
        
        this.startPrompt = this.add.bitmapText(this.world.centerX-250, this.world.centerY-150, 'Idroid' , 'Click to Start!' , 48); 
    }, 
    
    startGame:function(pointer){
        this.state.start('Game');
    }
}