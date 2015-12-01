var GameState = function(game){};

var music, sprite;

var stageSize = {width:1136, height:640};
var centerPoint = {x:stageSize.width/2, y:stageSize.height/2};

GameState.prototype = {

    preload: function(){
        /*game.load.image('sky', '../img/sky.png');
        game.load.image('ground', '..img/ground.png');
        this.load.image('player', '../img/player.png', 32, 48);*/
        //preload our music and our images/backgrounds
        this.load.spritesheet('player', '../img/player.png', 32, 48);
        this.load.image('enemy', '../img/enemy.png');
        this.load.image('background', '../img/Autumn.jpg');
        this.load.audio('maintheme', '../lib/ionic/music/background_music.mp3');
    },

    create: function(){
        //enable movement physics
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //setup the background
        this.background = this.add.tileSprite(0,0, this.world.width, this.world.height, 'background');
        //set the tunes
        music = this.add.audio('background');
        //play the tunes
        music.play();

        sprite = this.game.add.existing(
            this.player = new Player(this.game, 150, centerPoint.y, this.game.input)
        );
        //sets player movement to be handled by something other than the Physics engine
        sprite.body.allowRotation = false;
    },

    update: function(){
        //enables mouse/movement to handle player rotation
        sprite.rotation = this.game.physics.arcade.moveToPointer(sprite, 60, this.game.input.activePointer, 500);
    }
};

var Player = function(){

};

var Enemy = function(){

};


var game = new Phaser.Game(
    1136,
    640,
    Phaser.AUTO, //render context (Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO)
    'game' //id of DOM element to insert game, defaults to body if ''
    // GameState,
    // {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }

);
