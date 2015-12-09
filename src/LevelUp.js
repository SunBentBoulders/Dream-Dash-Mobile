var LevelUp = function(game){};

LevelUp.prototype = {

	preload: function(game){
		//stuff here
	},
	
	create: function(game){
		this.stage.backgroundColor = 0x7D26CD
		//stuff here
		this.titleText = game.add.text(game.width/2, game.height/4, "You Woke Up!", {
		  font: 'bold ' + game.width/13.33 + 'pt TheMinion',
		  fill: '#c37c01',
		  align: 'center'
		});
		this.titleText.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
		this.titleText.anchor.set(0.5);
		this.optionCount = 1;
		//========================================
		this.showScore = game.add.text(game.width/2 - 130 , game.height/4 + 100, 'Total Score: '+ totalScore, { font: 'bold ' + game.width/40 + 'pt TheMinion',
		  fill: '#c37c01',
		  align: 'center'
		});

		//======================================

	    this.addMenuOption('Next Level', function () {
	      this.startNextLevel();
	    });
		this.addMenuOption('Main Menu', function () {
	      game.state.start("MainMenu");
	    });
	  

		
	},

	startNextLevel: function(){
		this.game.state.start("Game");
	},

	addMenuOption: function(text, callback) {
	  var optionStyle = { font: this.game.height/20 + 'pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
	  var txt = this.game.add.text(this.game.width/3, (this.optionCount * this.game.height/7.5) + this.game.height/2.2, text, optionStyle);
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
	}

};