var GameState = function(game){};
var music;
GameState.prototype = {
    preload: function(){
        //preload our music and our images/backgrounds
        this.load.image('player', '../img/player.png');
        this.load.image('background', '../img/Autumn.jpg');
        this.load.audio('maintheme', '../lib/ionic/music/background_music.mp3');
    },
    create: function(){
        //setup the background
        this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
        //set the tunes
        music = this.add.audio('background');
        //play the tunes
        music.play();
    },
    update: function(){
        
    }
};

var Player = function(){
    
};

var Enemy = function(){
    
};


var game = new Phaser.Game(
    1136, 
    640, 
    Phaser.AUTO, 
    'game', 
    GameState,
    { 
        preload: preload, 
        create: create, 
        update: update, 
        render: render 
    }
);
);
