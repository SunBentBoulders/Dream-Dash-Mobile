var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function(task, author) {
    var authorStyle = { font: this.game.width/20 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var taskStyle = { font: this.game.width/26.6 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    // change the y values for authorText and taskText to make text fields overlap or not when scrolling
    var authorText = this.game.add.text(this.game.world.centerX, this.game.height/.667, author, authorStyle);
    var taskText = this.game.add.text(this.game.world.centerX, this.game.height/.75, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    authorText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    taskText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
    this.add.tween(authorText).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    this.add.tween(taskText).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    this.creditCount ++;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.width/30, ((this.optionCount + 2) * this.game.height/7.5) + this.game.height/2, text, optionStyle);

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

    this.game.optionCount ++;
  },

  create: function () {

    this.game.stage.disableVisibilityChange = true;

    if (gameOptions.playMusic) {
//      musicPlayer.stop();
//      musicPlayer = game.add.audio('exit');
//      musicPlayer.play();
    }

    var bg = this.game.add.sprite(0, 0, 'gameover-bg');
    this.addCredit('Physics Engineer', 'Shanna Sullivan');
    this.addCredit('State Engineer', 'Jazz Lyles');
    this.addCredit('Gameflow Engineer', 'Darryl Nunn');
    this.addCredit('Phaser.io & Cocoon', 'Powered By');
    this.addCredit('for playing', 'Thank you');
    this.addMenuOption('< Back', function (e) {
      this.game.state.start("MainMenu");
    });

    this.game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 10000);
  }

};
