// Global Variables
// use scaleRatio variables to make game size responsive based on device
var scaleRatio = window.devicePixelRatio;
var gameWidth = window.innerWidth * scaleRatio;
var gameHeight = window.innerHeight * scaleRatio;
// original game size was 800 width x 600 height
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game');
function goFull() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.updateLayout(true);
    // game.scale.startFullScreen();
    // scale the game
    // game.scale.scale.setShowAll();
    // game.scale.scale.refresh();
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
