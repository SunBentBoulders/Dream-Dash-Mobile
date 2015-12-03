var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {
    var authorStyle = { font: game.width/20 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var taskStyle = { font: game.width/26.6 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    // change the y values for authorText and taskText to make text fields overlap or not when scrolling
    var authorText = game.add.text(game.world.centerX, game.height/.667, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, game.height/.75, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    authorText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    taskText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    game.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    game.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(game.width/30, ((this.optionCount + 2) * game.height/7.5) + game.height/2, text, optionStyle);

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

  create: function () {
    this.stage.disableVisibilityChange = true;
    if (gameOptions.playMusic) {
//      musicPlayer.stop();
//      musicPlayer = game.add.audio('exit');
//      musicPlayer.play();
    }
    var bg = game.add.sprite(0, 0, 'gameover-bg');
    this.addCredit('Developer', 'Shanna Sullivan');
    this.addCredit('Developer', 'Jazz Lyles');
    this.addCredit('Developer', 'Darryl Nunn');
    this.addCredit('Phaser.io & Ionic', 'Powered By');
    this.addCredit('for playing', 'Thank you');
    this.addMenuOption('< Back', function (e) {
      game.state.start("GameMenu");
    });
    game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 10000);
  }

};
