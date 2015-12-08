var LevelUp = function(game){};

LevelUp.prototype = {

	preload: function(){
		//stuff here
	},
	
	create: function(game){
		//stuff here
		var winText = game.add.text(80,80, 'You Won')
	},

	startNextLevel: function(){
		this.game.state.start("Game");
	}

};