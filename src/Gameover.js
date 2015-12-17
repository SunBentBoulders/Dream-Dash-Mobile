var GameOver = function(game) {};

GameOver.prototype = {

  preload: function (game) {
    //loads up buttons for game over screen, smaller buttons for 960x640
    if (window.deviceAssetSize ==='960x640') {
      game.load.image('Main Menu', 'assets/buttons/mainMenuButton40pt.png');
      game.load.image('Play Again', 'assets/buttons/playAgainButton40pt.png');
      game.load.image('Game Over Title', 'assets/buttons/gameOverTitleButton60pt.png');
    } else if(!game.device.desktop){
      game.load.image('Main Menu', 'assets/buttons/mainMenuButton.png');
      game.load.image('Play Again', 'assets/buttons/playAgainButton.png');
      game.load.image('Game Over Title', 'assets/buttons/gameOverTitleButton.png');
    }
    this.optionCount = 1;
  },

  addDesktopMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 +'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = this.game.add.text(this.game.world.centerX, (this.optionCount * this.game.height/7.5) + this.game.height/2, text, optionStyle);
    txt.anchor.setTo(0.5);
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

  addMobileMenuOption: function(buttonName, callback){
    var button = this.game.add.button(this.game.world.centerX, (this.optionCount * this.game.height/7.5) + this.game.height/2, buttonName);
    button.inputEnabled = true;
    button.events.onInputDown.add(callback, this);
    button.anchor.setTo(0.5)

    this.optionCount++;
  },

  create: function (game) {
    game.add.sprite(0, 0, 'gameover-bg');


    if(game.device.desktop){
    var titleStyle = { font: 'bold ' +  game.height/10 + 'pt TheMinion', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, game.height/6, "Game Over", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);
      this.addDesktopMenuOption('Play Again', function (e) {
        // need to add game state rather than start game state
        game.state.add('game', Game, true);
      });
      this.addDesktopMenuOption('Main Menu', function (e) {
        game.state.start("MainMenu");
      });
    } else {
      var title = game.add.sprite(game.world.centerX, game.height/6, "Game Over Title");
      title.anchor.setTo(0.5);
      this.addMobileMenuOption('Play Again', function (e) {
        game.state.add('game', Game, true);
      });
      this.addMobileMenuOption('Main Menu', function (e){
        game.state.start('MainMenu');
      });
    }
  }
};















