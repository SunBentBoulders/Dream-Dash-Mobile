
MainMenu = function (game) {

//	this.music = null;
//	this.playButton = null;

};


MainMenu.prototype = {


  init: function (game) {
    // console.log('this is ', this);
    // console.log('game is ', game);
      var menuConfig = {
        startY: this.game.height/2.31,
        startX: this.game.width/26.67
      };

    this.titleText = this.game.make.text(this.game.world.centerX, this.game.height/6, "Bobby Dash", {
      font: 'bold ' + this.game.width/13.33 + 'pt TheMinion',
      fill: '#7CCD7C',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.width/30, (this.optionCount * this.game.height/7.5) + this.game.height/2.2, text, optionStyle);
    txt.anchor.setTo(0);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);

    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };

    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function (game) {

 

    if (music.name !== "bgm" && playMusic) {
      music.stop();
      music = game.add.audio('bgm');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      // game.state.start("Game");
      game.state.start('Game');
    });
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Credits', function () {
      game.state.start("Credits");
    });

  },



};

Phaser.Utils.mixinPrototype(MainMenu.prototype, mixins);
