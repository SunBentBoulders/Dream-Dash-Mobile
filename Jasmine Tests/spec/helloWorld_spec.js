describe("Game", function() {
	it('have a defined Game state', function(){
		expect(Game).toBeDefined();
	});

	it('should say hi to the haters', function() {
		expect(helloWorld('hater')).toEqual('Hello hater');
		expect(Game).toBeDefined();
	});
})
