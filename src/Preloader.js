
Preloader = function (game) {

//  this.background = null;
//  this.preloadBar = null;
    game.ready = false;

};

Preloader.prototype = {

    init: function () {
        // 387/2 gets center of loading bar image
        this.game.loadingBar = this.game.make.sprite(this.game.world.centerX-387/2, this.game.height/1.5, "loading");
        this.game.logo       = this.game.make.sprite(this.game.world.centerX, this.game.height/3, 'brand');
        this.game.status     = this.game.make.text(this.game.world.centerX, this.game.height/1.58, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.game.logo, this.game.status]);
    },

    loadFonts: function (game) {
//        WebFontConfig = {
//          custom: {
//            families: ['TheMinion'],
//            urls: ['assets/style/theminion.css']
//          }
//        }
    },

    preload: function (game) {
        //adds content to splash screen
        game.add.sprite(0, 0, 'stars');
        game.add.existing(this.game.logo).scale.setTo(0.5);
        game.add.existing(this.game.loadingBar);
        game.add.existing(this.game.status);
        game.load.setPreloadSprite(this.game.loadingBar);


        //loads images first, based on aspect ratio
        if (window.deviceAssetSize === 'desktop') {
            game.load.image('menu-bg', 'assets/images/BigAutumnGhost.png');
            game.load.image('gameover-bg', 'assets/images/BigSummer.png');
            game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1.png');
            game.load.image('options-bg', 'assets/images/options-bg.png');
        } else if (window.deviceAssetSize === '1024x768') {
            game.load.image('menu-bg', 'assets/images/BigAutumnGhost1024x768.png');
            game.load.image('gameover-bg', 'assets/images/BigSummer1024x768.png');
            game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1_1024x768.png');
            game.load.image('options-bg', 'assets/images/options-bg1024x768.png');
        } else if (window.deviceAssetSize === '960x640') {
            game.load.image('menu-bg', 'assets/images/BigAutumnGhost960x640.png');
            game.load.image('gameover-bg', 'assets/images/BigSummer960x640.png');
            game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1_960x640.png');
            game.load.image('options-bg', 'assets/images/options-bg960x640.png');
        } else if (window.deviceAssetSize === '1280x800') {
             game.load.image('menu-bg', 'assets/images/BigAutumnGhost1280x800.png');
             game.load.image('gameover-bg', 'assets/images/BigSummer1280x800.png');
             game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1_1280x800.png');
             game.load.image('options-bg', 'assets/images/options-bg1280x800.png');
        } else if (window.deviceAssetSize === '1024x600') {
             game.load.image('menu-bg', 'assets/images/BigAutumnGhost1024x600.png');
             game.load.image('gameover-bg', 'assets/images/BigSummer1024x600.png');
             game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1_1024x600.png');
             game.load.image('options-bg', 'assets/images/options-bg1024x600.png');
        } else if (window.deviceAssetSize === '1408x792') {
             game.load.image('menu-bg', 'assets/images/BigAutumnGhost1408x792.png');
             game.load.image('gameover-bg', 'assets/images/BigSummer1408x792.png');
             game.load.image('game-bg', 'assets/images/creepybg-scrollwidth-1_1408x792.png');
             game.load.image('options-bg', 'assets/images/options-bg1408x792.png');
        }

        //loads the button images for mobile, load smaller buttons for 960x640
        if (window.deviceAssetSize ==='960x640') {
            game.load.image('Title', 'assets/buttons/dreamDashButton60pt.png');
            game.load.image('Start', 'assets/buttons/startButton40pt.png');
            game.load.image('Options', 'assets/buttons/optionsButton40pt.png');
            game.load.image('Credits', 'assets/buttons/creditsButton40pt.png');
        } else {
            game.load.image('Title', 'assets/buttons/dreamDashButton120pt.png');
            game.load.image('Start', 'assets/buttons/startButton85pt.png');
            game.load.image('Options', 'assets/buttons/optionsButton85pt.png');
            game.load.image('Credits', 'assets/buttons/creditsButton85pt.png');
        }
        // game.load.image()


        game.load.spritesheet('dude', 'img/dude.png', 32, 48);

        //loads audio
        game.load.audio('bgm', 'assets/bgm/background_music.ogg');
        game.load.audio('startDing', 'assets/bgm/startDing.wav');

        this.loadFonts(game);

    },


    addGameStates: function (game) {
        game.state.add("MainMenu",MainMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
        game.state.add("Credits",Credits);
        game.state.add("Options",Options);
        game.state.add("LevelUp", LevelUp);
    },

    addGameMusic: function (game) {
        music = game.add.audio('bgm');
        music.play('', 0, 1, true);
        //.play('startMarker', startPosition, volume(0 to 1), loop t/f)
    },

    update: function () {

        //  You don't actually need to do this, but I find it gives a much smoother game experience.
        //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //  You can jump right into the menu if you want and still play the music, but you'll have a few
        //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //  it's best to wait for it to decode here first, then carry on.

        //  If you don't have any music in your game then put the game.state.start line into the create function and delete
        //  the update function completely.

//      if (this.cache.isSoundDecoded('dangerous') && this.ready == false)
//      {
//          this.ready = true;
//          this.state.start('MainMenu');
//      }

    },

    create: function (game) {
        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        game.status.setText('Ready!');
        this.addGameStates(game);
        this.addGameMusic(game);
        game.add.audio('startDing');

        setTimeout(function () {
          game.state.start("MainMenu");
        }, 1000);
    }
};
