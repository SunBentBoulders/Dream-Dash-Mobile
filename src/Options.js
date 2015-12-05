var Options = function(game) {};

Options.prototype = {

  menuConfig: {
    className: "inverse",
    startY: this.height/2.31,
    startX: "center"
  },


  init: function (game) {
    this.titleText = this.game.make.text(this.game.world.centerX, this.game.height/6, "Options", {
      font: 'bold ' + this.game.width/13.33 + 'pt TheMinion',
      fill: '#c37c01',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(.5);
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'black', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.world.centerX, (this.optionCount * this.game.height/7.5) + this.game.world.centerY, text, optionStyle);
    txt.anchor.setTo(.5, 2);
    txt.stroke = "rgba(0,0,0,0)";
    txt.strokeThickness = 4;
    txt.setShadow(3, 3, 'rgba(0,0,0,.5)', 5);

    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "black";
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

  addBackOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.width/30, ((this.optionCount) * this.game.height/7.5) + this.game.height/2, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
      txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
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
    // var playSound = gameOptions.playSound,
        var playMusic = gameOptions.playMusic;

    game.add.sprite(0, 0, 'options-bg');
    game.add.existing(this.titleText);

    this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
      playMusic = !playMusic;
      target.text = playMusic ? 'Mute Music' : 'Play Music';
      music.volume = playMusic ? 1 : 0;
    });
    
    // this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
    //   playSound = !playSound;
    //   target.text = playSound ? 'Mute Sound' : 'Play Sound';
    // });
    
    this.addBackOption('< Back', function () {
      game.state.start("MainMenu");
    });
  }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
