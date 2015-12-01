var Game = function(game) {
  this.player;
  this.platforms;
  this.cursors;

  this.stars;
  this.score = 0;
  this.scoreText;
};

Game.prototype = {

  preload: function () {
    this.optionCount = 1;
    game.load.image('sky', 'img/sky.png');
    game.load.image('ground', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
  },

  // this function is for the game menu
  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
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

  create: function () {
    // this block is for the game menu
    this.stage.disableVisibilityChange = false;
    game.add.sprite(0, 0, 'stars');
    this.addMenuOption('Next ->', function (e) {
      this.game.state.start("GameOver");
    });

    // the rest of the create function below is for the game itself

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    this.player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    this.stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = this.stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(this.player, platforms);
    game.physics.arcade.collide(this.stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -350;
    }

  },

  collectStar: function(player, star) {
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
  }
};

// this function already in main.js
// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// moved to game prototype preload function
// function preload() {
//     game.load.image('sky', 'img/sky.png');
//     game.load.image('ground', 'img/platform.png');
//     game.load.image('star', 'img/star.png');
//     game.load.spritesheet('dude', 'img/dude.png', 32, 48);
// }

// moved to game constructor
// this.player;
// this.platforms;
// this.cursors;
// this.stars;
// this.score = 0;
// this.scoreText;

// moved to game prototype
// function create() {

//     //  We're going to be using physics, so enable the Arcade Physics system
//     game.physics.startSystem(Phaser.Physics.ARCADE);

//     //  A simple background for our game
//     game.add.sprite(0, 0, 'sky');

//     //  The platforms group contains the ground and the 2 ledges we can jump on
//     platforms = game.add.group();

//     //  We will enable physics for any object that is created in this group
//     platforms.enableBody = true;

//     // Here we create the ground.
//     var ground = platforms.create(0, game.world.height - 64, 'ground');

//     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//     ground.scale.setTo(2, 2);

//     //  This stops it from falling away when you jump on it
//     ground.body.immovable = true;

//     //  Now let's create two ledges
//     var ledge = platforms.create(400, 400, 'ground');
//     ledge.body.immovable = true;

//     ledge = platforms.create(-150, 250, 'ground');
//     ledge.body.immovable = true;

//     // The player and its settings
//     player = game.add.sprite(32, game.world.height - 150, 'dude');

//     //  We need to enable physics on the player
//     game.physics.arcade.enable(player);

//     //  Player physics properties. Give the little guy a slight bounce.
//     player.body.bounce.y = 0.2;
//     player.body.gravity.y = 300;
//     player.body.collideWorldBounds = true;

//     //  Our two animations, walking left and right.
//     player.animations.add('left', [0, 1, 2, 3], 10, true);
//     player.animations.add('right', [5, 6, 7, 8], 10, true);

//     //  Finally some stars to collect
//     stars = game.add.group();

//     //  We will enable physics for any star that is created in this group
//     stars.enableBody = true;

//     //  Here we'll create 12 of them evenly spaced apart
//     for (var i = 0; i < 12; i++)
//     {
//         //  Create a star inside of the 'stars' group
//         var star = stars.create(i * 70, 0, 'star');

//         //  Let gravity do its thing
//         star.body.gravity.y = 300;

//         //  This just gives each star a slightly random bounce value
//         star.body.bounce.y = 0.7 + Math.random() * 0.2;
//     }

//     //  The score
//     scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

//     //  Our controls.
//     cursors = game.input.keyboard.createCursorKeys();

// }

// moved to game prototype
// function update() {

//     //  Collide the player and the stars with the platforms
//     game.physics.arcade.collide(player, platforms);
//     game.physics.arcade.collide(stars, platforms);

//     //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
//     game.physics.arcade.overlap(player, stars, collectStar, null, this);

//     //  Reset the players velocity (movement)
//     player.body.velocity.x = 0;

//     if (cursors.left.isDown)
//     {
//         //  Move to the left
//         player.body.velocity.x = -150;

//         player.animations.play('left');
//     }
//     else if (cursors.right.isDown)
//     {
//         //  Move to the right
//         player.body.velocity.x = 150;

//         player.animations.play('right');
//     }
//     else
//     {
//         //  Stand still
//         player.animations.stop();

//         player.frame = 4;
//     }

//     //  Allow the player to jump if they are touching the ground.
//     if (cursors.up.isDown && player.body.touching.down)
//     {
//         player.body.velocity.y = -350;
//     }

// }

// function collectStar (player, star) {

//     // Removes the star from the screen
//     star.kill();

//     //  Add and update the score
//     score += 10;
//     scoreText.text = 'Score: ' + score;

// }
