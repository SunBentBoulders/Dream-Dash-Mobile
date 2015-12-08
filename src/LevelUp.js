var LevelUp = function(game){};

LevelUp.prototype = {

	preload: function(){
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
		this.showScore = game.add.text(game.width/2 , game.height/4 + 100, 'Total Score '+ game.score);
	},

	startNextLevel: function(){
		this.game.state.start("Game");
	}

};