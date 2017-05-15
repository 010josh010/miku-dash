var mikuDash = {}; 

mikuDash.Boot = function(game){}; 

mikuDash.Boot.prototype = {
    
   preload: function(){
        //preload images 
        this.load.image('preloaderBar' , 'assets/img/loader_bar.png'); 
        this.load.image('loaderImage', 'assets/img/miku_load.png'); 
        
     }, 
    
    create: function(){
        this.stage.disableVisabilityChange = false; 
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true; 
        
        
        //for the physics system 
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //for starting the preloader 
        this.state.start('Preloader'); 
    }
}