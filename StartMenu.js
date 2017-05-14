mikuDash.StartMenu = function(game){
    this.startBG; 
    this.startPrompt;
}

mikuDash.StartMenu.prototype = {
    
    create:function(){
        this.sound.play('polka');
        this.startBG = this.add.image(0,0, 'titleScreen'); 
        this.startBG.inputEnabled = true;
        this.startBG.events.onInputDown.addOnce(this.startGame , this); 
        
        this.startPrompt = this.add.bitmapText(this.world.centerX-350, this.world.centerY-150, 'Idroid' , 'Click to Start!' , 48); 
    }, 
    
    startGame:function(pointer){
        this.state.start('Game');
    }
}