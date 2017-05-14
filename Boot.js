var mikuDash = {}; 

mikuDash.Boot = function(game){}; 

mikuDash.Boot.prototype = {
    
       preload: function(){
        //preload images 
         this.load.image('preloaderBar' , 'assets/img/loader_bar.png'); 
         this.load.image('titleImage', 'assets/img/miku_load.png'); 
        
     }, 
    
    create: function(){
        this.stage.disableVisabilityChange = false; 
        this.scale.pageAlignHorizontally = true; 
        this.scale.pageAlignVertically = true; 
        
        this.state.start('Preloader'); 
    }
}