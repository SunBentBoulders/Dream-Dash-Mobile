var Credits = function(game) {

  var backButton;
};

Credits.prototype = {

  preload: function (game) {
    this.optionCount = 1;
    this.creditCount = 0;
    //loads up buttons for game over screen, smaller buttons for 960x640
    if (window.deviceAssetSize ==='960x640') {
      this.game.load.image('< Back', 'assets/buttons/backButton40pt.png');
      this.game.load.image('shanna name', 'assets/buttons/shannaButton40pt.png');
      this.game.load.image('shanna job', 'assets/buttons/physicsEngineerButton40pt.png');
      this.game.load.image('darryl name', 'assets/buttons/darrylButton40pt.png');
      this.game.load.image('darryl job' , 'assets/buttons/mechanicsEngineerButton40pt.png')
      this.game.load.image('jazz name', 'assets/buttons/jazzButton40pt.png');
      this.game.load.image('jazz job' , 'assets/buttons/stateEngineerButton40pt.png');
    } else if(!game.device.desktop){
      this.game.load.image('< Back', 'assets/buttons/backButton.png');
      this.game.load.image('shanna name', 'assets/buttons/shannaButton.png');
      this.game.load.image('shanna job', 'assets/buttons/physicsEngineerButton.png');
      this.game.load.image('darryl name', 'assets/buttons/darrylButton.png');
      this.game.load.image('darryl job' , 'assets/buttons/mechanicsEngineerButton.png')
      this.game.load.image('jazz name', 'assets/buttons/jazzButton.png');
      this.game.load.image('jazz job' , 'assets/buttons/stateEngineerButton.png');
    }
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

  addMobileCreditButton: function(task, author){
    var authorButton = this.game.add.button(this.game.world.centerX, this.game.height/.667, author);
    var taskButton = this.game.add.button(this.game.world.centerX, this.game.height/.667, task);
    authorButton.anchor.setTo(0.5);
    taskButton.anchor.setTo(0.5);

     this.add.tween(authorButton).to( { y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    this.add.tween(taskButton).to( { y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 5000);
    this.creditCount ++;
  },

  addDesktopMenuOption: function(text, callback) {
    var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = this.game.add.text(this.game.width/30, ((this.optionCount + 2) * this.game.height/7.5) + this.game.height/2, text, optionStyle);
    txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);


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

  addMobileMenuOption: function(buttonName, callback){
    var button = this.game.add.button(this.game.width/30, ((this.optionCount + 1) * this.game.height/7.5) + this.game.height/2, buttonName);
    button.inputEnabled = true;
    button.events.onInputDown.add(callback, this);

  },

  create: function () {

    this.game.stage.disableVisibilityChange = true;

    if (gameOptions.playMusic) {
//      musicPlayer.stop();
//      musicPlayer = game.add.audio('exit');
//      musicPlayer.play();
    }

    var bg = this.game.add.sprite(0, 0, 'gameover-bg');

    if(this.game.device.desktop){
      this.addCredit('Physics Engineer', 'Shanna Sullivan');
      this.addCredit('State Engineer', 'Jazz Lyles');
      this.addCredit('Mechanics Engineer', 'Darryl Nunn');
      this.addCredit('Phaser.io & Cocoon', 'Powered By');
      this.addCredit('for playing', 'Thank you');
      this.addDesktopMenuOption('< Back', function (e) {
        this.game.state.start("MainMenu");
     });
    } else {
      this.addMobileCreditButton('jazz job', 'jazz name');
      this.addMobileCreditButton('darryl job', 'darryl name');
      this.addMobileCreditButton('shanna job', 'shanna name');
      this.addMobileMenuOption('< Back', function (){
        this.game.state.start("MainMenu");
      })
    }

    this.game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 10000);
  }

};
