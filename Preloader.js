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
         
         //for title menu image and font
         this.load.image('titleScreen' , 'assets/img/miku_title.png')
         this.load.bitmapFont('Idroid' , 'assets/fonts/Idroid.png', 'assets/fonts/Idroid.fnt');
         
         //for game assets 
     }, 
     
     create: function() {
         this.preloadBar.cropEnabled = false; 
     }, 
     
     update:function() {
         this.ready = true; 
         this.state.start('StartMenu');
     }
 }