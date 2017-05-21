mikuDash.StartMenu = function(game){
    this.startBG; 
    this.startPrompt;
    this.filter; 
    this.sprite; 
    this.filter;
    this.titleText; 
}

mikuDash.StartMenu.prototype = {
    
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
    
    create:function(game){
        
        //setting of background image 
        this.startBG = this.add.tileSprite(0,0, 1920, 1080 , 'level_1' , 'level_1_layer_1.png');
        this.startBG.scale.setTo(0.8 , 0.8)
        this.startBG.inputEnabled = true;
        this.startBG.events.onInputDown.addOnce(this.startGame , this); 
        
        //for start prompt text
        this.startPrompt = this.add.bitmapText(0, this.world.centerY-75, 'Idroid' , 'Click to Start!' , 48); 
        
        this.add.tween(this.startPrompt).to({x:this.world.centerX-200}, 1500 , Phaser.Easing.Linear.None, true);
        //for title text 
        this.titleText = this.add.bitmapText(this.world.centerX-250 , 0 , 'Idroid' , 'Miku Dash' , 90)
        this.add.tween(this.titleText).to({y: 100} , 1500 , Phaser.Easing.Linear.None , true);
        
        //for miku going across the screen 
        this.miku = this.add.sprite(0 , 300 , 'miku')
        this.miku.animations.add('walk' , this.addFrames('miku_walk_' , 0, 7));
        this.miku.animations.play('walk', 11 , true);
        this.add.tween(this.miku).to({ x: game.width }, 30000, Phaser.Easing.Linear.None, true);
        
        //for game music 
        this.selectSound = this.add.audio('collect'); 
        this.music = this.add.audio('megaManTheme');
        this.music.loopFull();
        
        
        //for startMenu filter 
        var fragmentSrc = [
        "precision mediump float;",
        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "const float Tau        = 6.2832;",
        "const float speed  = .02;",
        "const float density    = .04;",
        "const float shape  = .04;",

        "float random( vec2 seed ) {",
            "return fract(sin(seed.x+seed.y*1e3)*1e5);",
        "}",

        "float Cell(vec2 coord) {",
            "vec2 cell = fract(coord) * vec2(.5,2.) - vec2(.0,.5);",
            "return (1.-length(cell*2.-1.))*step(random(floor(coord)),density)*2.;",
        "}",

        "void main( void ) {",

            "vec2 p = gl_FragCoord.xy / resolution  - mouse;",

            "float a = fract(atan(p.x, p.y) / Tau);",
            "float d = length(p);",

            "vec2 coord = vec2(pow(d, shape), a)*256.;",
            "vec2 delta = vec2(-time*speed*256., .5);",
            "//vec2 delta = vec2(-time*speed*256., cos(length(p)*10.)*2e0+time*5e-1); // wavy wavy",

            "float c = 0.;",
            "for(int i=0; i<3; i++) {",
                "coord += delta;",
                "c = max(c, Cell(coord));",
            "}",

            "gl_FragColor = vec4(c*d);",
        "}"
    ];

    this.filter = new Phaser.Filter(game, null, fragmentSrc);
    this.filter.setResolution(800, 600);

    this.sprite = this.add.sprite();
    this.sprite.width = 800;
    this.sprite.height = 600;

    this.sprite.filters = [ this.filter ];

    }, 

    
    startGame:function(pointer){
        this.selectSound.play()
        this.state.start('Game');
    }, 
    
    update:function(){
        this.filter.update(this.input.activePointer);
        this.startBG.tilePosition.x -=1;
    }
}