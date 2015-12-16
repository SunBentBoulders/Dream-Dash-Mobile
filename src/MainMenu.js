
MainMenu = function (game) {

//	this.music = null;
//	this.playButton = null;
var startButton;
var creditsButton;
var optionsButton;
var optionCount;

};


MainMenu.prototype = {
    menuConfig: {
      startY: this.height/2.31,
      startX: this.width/26.67
    },


  init: function (game) {
    // console.log('this is ', this);
    // console.log('game is ', game);
    if(this.game.device.desktop){
      // this.game.add.sprite(this.game.world.centerX, this.game.height/6, 'Start')
      // optionCount = 1;

    this.titleText = this.game.make.text(this.game.world.centerX, this.game.height/6, "Dream Dash", {
      font: 'bold ' + this.game.width/13.33 + 'pt TheMinion',
      fill: '#7CCD7C',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    this.titleText.anchor.set(0.5);
    optionCount = 1;
    }
  },

  addDesktopMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.width/30, (optionCount * this.game.height/7.5) + this.game.height/2.2, text, optionStyle);
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

    optionCount++;
  },

  addMobileMenuOption: function (buttonName, callback){
    var button = this.game.add.button(this.game.width/30, (optionCount * this.game.height/7.5) + this.game.height/2.2, buttonName);
    button.inputEnabled = true;
    button.events.onInputDown.add(callback, this);

    optionCount++
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

    //checks to see which buttons to load
    if(!game.device.desktop){
      var title = game.add.sprite(game.width/2, game.height/9, 'Title')
      title.anchor.setTo(0.5);
      optionCount = 1;
      //loads actual buttons
      startButton = this.addMobileMenuOption('Start', function () {
         game.state.start('Game');
       });
      optionsButton = this.addMobileMenuOption('Options', function () {
         game.state.start('Options');
       });
      creditsButton = this.addMobileMenuOption('Credits', function () {
         game.state.start('Credits');
       });
    } else {
      game.add.existing(this.titleText);
      //loads text buttons
      this.addDesktopMenuOption('Start', function () {
        game.state.start('Game');
      });
      this.addDesktopMenuOption('Options', function () {
        game.state.start("Options");
      });
      this.addDesktopMenuOption('Credits', function () {
        game.state.start("Credits");
      });
    }

  }



};

Phaser.Utils.mixinPrototype(MainMenu.prototype, mixins);
