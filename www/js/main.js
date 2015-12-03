// Global Variables

// TODO: add the devicePixelRatio back to scaling methods
//==========================
// use scaleRatio variables to make game size responsive based on device
// var scaleRatio = window.devicePixelRatio;
// var gameWidth = window.innerWidth * scaleRatio;
// var gameHeight = window.innerHeight * scaleRatio;
// original game size was 800 width x 600 height
//=====================
var gameWidth = 800;
var gameHeight = 600;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');
function goFull() {
    // this code makes game show full screen but with blank bars on the sides
    //===============================================================
    if (this.game.device.desktop) {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.minWidth = gameWidth/2;
        game.scale.minHeight = gameHeight/2;
        game.scale.maxWidth = gameWidth;
        game.scale.maxHeight = gameHeight;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.updateLayout(true); // changed from this.scale.setScreenSize(true)
    } else {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.minWidth = gameWidth/2;
        game.scale.minHeight = gameHeight/2;
        game.scale.maxWidth = gameWidth * 2.5;
        game.scale.maxHeight = gameHeight * 2.5;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.forceOrientation(true, false);
        game.scale.hasResized.add(game.gameResized, game);
        game.scale.enterIncorrectOrientation.add(game.enterIncorrectOrientation, game);
        game.scale.leaveIncorrectOrientation.add(game.leaveIncorrectOrientation, game);
        game.scale.updateLayout(true); // changed from this.scale.setScreenSize(true)
    }
    //==============================================================
    // this code will scale up the canvas to make it fill the whole screen and eliminate bars on sides
    var ow = parseInt(this.game.canvas.style.width, 10);
    var oh = parseInt(this.game.canvas.style.height, 10);
    var r = Math.max(window.innerWidth/ow, window.innerHeight/oh);
    var nw = ow*r;
    var nh = oh*r;
    this.game.canvas.style.width = nw + 'px';
    this.game.canvas.style.height = nh + 'px';
    this.game.canvas.style.marginLeft = (window.innerWidth/2 - nw/2) + 'px';
    this.game.canvas.style.marginTop = (window.innerHeight/2 - nh/2) + 'px';
    document.getElementById('game').style.width = window.innerWidth + 'px';
    document.getElementById('game').style.height = window.innerHeight - 1 + 'px'; //css for body includes 1px top margin that we want to eliminate
    document.getElementById('game').style.overflow = 'hidden';

    // these functions work with the device pixel ratio functions
    //=====================
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.scale.updateLayout(true);
    //===================
};

var Main = function () {};
var gameOptions = {
    playSound: true,
    playMusic: true
  };
var musicPlayer;



// this block controls the initial game menu
Main.prototype = {

  preload: function () {
    game.load.image('stars',    'assets/images/2.jpg');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/Boulder.png');
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('Splash',  'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
    // global function defined
    goFull();
  }

};

game.state.add('Main', Main);
game.state.start('Main');
