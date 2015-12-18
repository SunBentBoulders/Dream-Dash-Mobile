describe("Game", function() {
	it('have a defined Game state', function(){
		expect(Game).toBeDefined();
	});

	describe('dream dash game state', function(){
		beforeEach(function(){
			window.game = new Phaser.Game(0, 0, Phaser.CANVAS, 'game');
			console.log(Game);
		});
			it('should have preload, create, and update functions', function() {
				console.log(Game)
				console.log('this is this', this);
				expect(game.create()).toBeDefined();
				expect(game.preload()).toBeDefined();
				expect(game.update()).toBeDefined();
			});

			it('should have enemies added to screen' , function(){

			})
	});
});

console.log(game)