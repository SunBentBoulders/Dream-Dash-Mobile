Game = {
    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
//    music: null,

    /* Your game can check Game.orientated in internal loops to know if it should pause or not */
    orientated: false

};

var gameOptions = {
    playSound: true,
    playMusic: true
  };
var musicPlayer;

Boot = function (game) {
};

Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            console.log("this", this)
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(400, 300, 1400, 1050);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.updateLayout(true);

        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(480, 260, 1400, 1050);
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.forceOrientation(true, false);
            this.game.scale.setResizeCallback(this.gameResized, this);
            this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.game.scale.updateLayout(true);
        }

        var ow = parseInt(this.game.canvas.style.width, 10); // outer width, parseInt needs a string argument, returns integer for outer width
//        console.log("canvas style height", this.game.canvas.style.height)
        var oh = parseInt(this.game.canvas.style.height, 10); // outer height
        var r = Math.max(window.innerWidth/ow, window.innerHeight/oh); // max ratio between (inner and outer width; inner and outer height)
//        console.log("window.innerHeight", window.innerHeight)
        var nw = ow*r; // new width; outer width * ratio
        var nh = oh*r; // new height
        this.game.canvas.style.width = nw + 'px'; // set new width
        this.game.canvas.style.height = nh + 'px';
        // console.log("style", this.game.canvas.style.marginLeft)
        this.game.canvas.style.marginLeft = (window.innerWidth/2 - nw/2) + 'px';
        this.game.canvas.style.marginTop = (window.innerHeight/2 - nh/2) + 'px';
        document.getElementById('game').style.width = window.innerWidth + 'px';
        document.getElementById('game').style.height = window.innerHeight - 1 + 'px'; //css for body includes 1px top margin that we want to eliminate
        document.getElementById('game').style.overflow = 'hidden';
        // document.getElementById('game').parentNode.style.marginLeft = (window.innerWidth/2 - nw/2) + 'px';
        // document.getElementById('game').parentNode.style.marginTop = (window.innerHeight/2 - nh/2) + 'px';

    },

    preload: function (game) {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        game.load.image('stars', 'assets/images/2.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/Boulder.png');

        game.load.script("WebFont", "vendor/webfontloader.js");
        game.load.script('MainMenu', 'src/MainMenu.js');


    },

    create: function (game) {

        game.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        Game.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        Game.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
};

//this.game.state.add('Preloader', Preloader);
//this.game.state.start('Preloader');