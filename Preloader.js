mikuDash.Preloader = function(game) {
    this.preloadBar = null; 
    this.titleText = null; 
    this.ready = false; 
}; 

 mikuDash.Preloader.prototype = {
     
     preload:function() {
         
         //for preload ber 
         this.preloadBar = this.add.sprite(this.world.centerX , this.world.centerY+75, 'preloaderBar'); 
         this.preloadBar.anchor.setTo(0.5, 0.5); 
         this.load.setPreloadSprite(this.preloadBar);
         
         //for titletext  
         this.titleText = this.add.image(this.world.centerX , this.world.centerY-100 , 'loaderImage'); 
         this.titleText.anchor.setTo(0.5 , 0.5); 
         this.titleText.scale.setTo(0.5, 0.5);
         
         //for loading title menu image and font
         this.load.bitmapFont('Idroid' , 'assets/fonts/Idroid.png', 'assets/fonts/Idroid.fnt');
         
         //for loading game spritesheets and assets 
         this.load.atlasJSONArray('level_1', 'assets/img/spritesheets/dist/levels/level_1/level_1.png' , 'assets/img/spritesheets/dist/levels/level_1/level_1.json');
         
         this.load.atlasJSONArray('miku' , 'assets/img/spritesheets/dist/characters/miku/miku.png' , 'assets/img/spritesheets/dist/characters/miku/miku.json');
         
        
         //for loading game audio 
         this.load.audio('polka' , 'assets/audio/polka.mp3');
         this.load.audio('megaManTheme' , 'assets/audio/megaman_x3_opening.mp3');
         this.load.audio('zeroTheme' , 'assets/audio/megaman_x3_zero.mp3');
         this.load.audio('ah' , 'assets/audio/ah.mp3'); 
         this.load.audio('powerup',  'assets/audio/powerup.mp3'); 
         this.load.audio('collect' , 'assets/audio/collect.mp3');
     }, 
     
     create: function() {
         this.preloadBar.cropEnabled = false; 
     }, 
     
     update:function() {
         this.ready = true; 
         this.state.start('StartMenu');
     }
 }