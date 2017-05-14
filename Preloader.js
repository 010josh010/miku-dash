mikuDash.Preloader = function(game) {
    this.preloadBar = null; 
    this.titleText = null; 
    this.ready = false; 
}; 

 mikuDash.Preloader.prototype = {
     
     preload:function() {
         
         this.preloadBar = this.add.sprite(this.world.centerX , this.world.centerY+75, 'preloaderBar'); 
         this.preloadBar.anchor.setTo(0.5, 0.5); 
         this.load.setPreloadSprite(this.preloadBar); 
         this.titleText = this.add.image(this.world.centerX , this.world.centerY-100 , 'titleImage'); 
         this.titleText.anchor.setTo(0.5 , 0.5); 
         this.titleText.scale.setTo(0.5, 0.5);
         
         //for loading title menu image and font
         this.load.image('titleScreen' , 'assets/img/miku_title.png')
         this.load.bitmapFont('Idroid' , 'assets/fonts/Idroid.png', 'assets/fonts/Idroid.fnt');
         
         //for loading game spritesheets 
         this.load.atlasJSONArray('background', 'assets/img/spritesheets/miku-0.png' , 'assets/img/spritesheets/miku-atlus-0.json');
         
         //for loading game audio 
         this.load.audio('polka' , 'assets/audio/polka.mp3'); 
         this.load.audio('ah' , 'assets/audio/ah.mp3'); 
         this.load.audio('powerup',  'assets/audio/powerup.mp3'); 
         this.load.audio('select' , 'assets/audio/select.mp3');
     }, 
     
     create: function() {
         this.preloadBar.cropEnabled = false; 
     }, 
     
     update:function() {
         this.ready = true; 
         this.state.start('StartMenu');
     }
 }