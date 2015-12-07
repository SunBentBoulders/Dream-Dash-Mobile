
Preloader = function (game) {

//	this.background = null;
//	this.preloadBar = null;

	this.ready = false;

};

Preloader.prototype = {

	preload: function () {
        this.game.load.image('stars',    'assets/images/2.jpg');
        this.game.load.image('loading',  'assets/images/loading.png');
        this.game.load.image('brand',    'assets/images/Boulder.png');
        this.game.load.image('sky', 'assets/images/BigSummer.jpg');
        this.game.load.image('ground', 'img/platform.png');
        this.game.load.image('star', 'img/star.png');
        this.game.load.spritesheet('dude', 'img/dude.png', 32, 48);
        
        
//        game.load.script('polyfill',   'lib/polyfill.js');
//        game.load.script('utils',   'lib/utils.js');
//        game.load.script('Splash',  'states/Splash.js');

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
//		this.background = this.add.sprite(0, 0, 'preloaderBackground');
//		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
//		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
//		this.load.image('titlepage', 'images/title.jpg');
//		this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		this.load.audio('bgm', 'assets/bgm/background_music.mp3');
        this.load.audio('startDing', 'assets/bgm/startDing.wav');
//		this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
//		this.preloadBar.cropEnabled = false;
        this.game.state.add('Game', Game);
        this.game.state.start('Game');
	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
//		if (this.cache.isSoundDecoded('dangerous') && this.ready == false)
//		{
//			this.ready = true;
//			this.state.start('MainMenu');
//		}

	}
};
