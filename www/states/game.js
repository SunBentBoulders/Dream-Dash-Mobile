var Game = function(game) {
  this.player;
  // this.platforms;
  // this.cursors;
  this.stars;
  // this.score = 0;
  // this.scoreText;
};

Game.prototype = {

  preload: function () {
    // this.optionCount = 1;
    // game.load.image('sky', 'img/sky.png');
    // game.load.image('ground', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
  },

   // kill star after tween is done
  // killStar: function(star) {
  //   console.log("killing star");
  //   console.log("star", star)
  //   star.kill();
  //   game.starCount--;
  //   console.log("starCount", game.starCount);
  //   // game.add.tween(star.)
  // },

  create: function () {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // go full screen
    // global function defined at top of main.js
    // goFull();

    // this block is for the game menu
    this.stage.disableVisibilityChange = false;

    // set background color
    this.stage.backgroundColor = 0x00007f;
    // add horizon line
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0x000019);
    graphics.lineStyle(2, 0x000019, 1);
    // syntax: top left x, top left y, width, height
    graphics.drawRect(0, game.height/2, game.width, game.height);
    graphics.endFill();

    // add star player and enable physics on player
    this.player = game.add.sprite(game.width/2, game.height/4 * 3, 'dude');
    this.player.scale.setTo(1.5, 1.5);
    this.player.anchor.setTo(.5, 1);
    console.log("this.player.anchor", this.player.anchor)

    game.physics.arcade.enable(this.player);
    // scale player so that eye level is at the horizon line

    // add group of enemy stars
    game.stars = game.add.group();
    game.stars.enableBody = true;
    game.starCount = 0;




    //  Create a star inside of the 'stars' group
    game.addStar = function(){
        game.starCount++;
        console.log("addStar starCount", game.starCount);
        var star = game.stars.create(game.width/2, game.height/2, 'star');
        star.scale.setTo(0);
        star.anchor.setTo(.5);
        // enable physics
        // game.physics.enable(star, Phaser.Physics.ARCADE);
        star.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        var tween = game.add.tween(star.scale);
        var timeToTween = 7000;
        // tween.from({x: 0, y: 0});
        tween.to({x: 20, y:20}, timeToTween, Phaser.Easing.Exponential.In, true);
        // add tween for stars to move to edges of screen as they get bigger
        // applies to stars that start on left of screen

        var tween2 = game.add.tween(star.position);
        // stars move to random x coordinates of screen
        tween2.to({x: game.width * 3 - Math.random()*game.width*6, y: game.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        tween2.onComplete.add(function() {
            game.starCount--;
            star.kill();
        });
    }

    // dropTimer and addStarWrapper are used to generate stars at random intervals
    game.dropTimer = game.time.create(false);
    game.dropTimer.start();
    game.addStarWrapper = function() {
        game.addStar();
        game.dropTimer.add(Phaser.Timer.SECOND * Math.random(), game.addStarWrapper, this);
    }
    game.addStarWrapper();

    //  Let gravity do its thing
    // star.body.gravity.y = 300;

    //  This just gives each star a slightly random bounce value
    // star.body.bounce.y = 0.7 + Math.random() * 0.2;


    // game.add.sprite(0, 0, 'stars');

    // // the rest of the create function below is for the game itself

    // //  We're going to be using physics, so enable the Arcade Physics system
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    // //  A simple background for our game
    // game.add.sprite(0, 0, 'sky');

    // //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();

    // //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;

    // // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');

    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);

    // //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;

    // //  Now let's create two ledges
    // var ledge = platforms.create(game.width/2, game.height/1.5, 'ground');
    // ledge.body.immovable = true;

    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;

    // // The player and its settings, positions it at (32, game.world.height - 150)
    // this.player = game.add.sprite(game.width/25, game.height - game.height/4, 'dude');

    // //  We need to enable physics on the player
    // game.physics.arcade.enable(game.player);

    // //  Player physics properties. Give the little guy a slight bounce.
    // this.player.body.bounce.y = 0.2;
    // this.player.body.gravity.y = 300;
    // this.player.body.collideWorldBounds = true;

    // //  Our two animations, walking left and right.
    // this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    // this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // //  Finally some stars to collect
    // this.stars = game.add.group();

    // //  We will enable physics for any star that is created in this group
    // this.stars.enableBody = true;

    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = this.stars.create(i * 70, 0, 'star');

    //     //  Let gravity do its thing
    //     star.body.gravity.y = 300;

    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

    // //  The score
    // this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // //  Our controls.
    // cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(game.player, game.stars);
    // game.physics.arcade.collide(this.stars, platforms);

    // //  Checks to see if the player overlaps with any of the stars, if he does call the gameOver function
    game.physics.arcade.overlap(this.player, game.stars, this.gameOver, null, this);


    // //  Reset the players velocity (movement)
    // this.player.body.velocity.x = 0;

    // if (cursors.left.isDown) {
    //     //  Move to the left
    //     this.player.body.velocity.x = -150;
    //     this.player.animations.play('left');
    // }
    // else if (cursors.right.isDown) {
    //     //  Move to the right
    //     this.player.body.velocity.x = 150;
    //     this.player.animations.play('right');
    // }
    // else {
    //     //  Stand still
    //     this.player.animations.stop();
    //     this.player.frame = 4;
    // }

    // //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && this.player.body.touching.down) {
    //     this.player.body.velocity.y = -350;
    // }

    // // if player collects all stars, end game
    // if (this.score === 120) {
    //     this.gameOver(this.player);
    // }

  },



  collectStar: function(player, star) {
    // // Removes the star from the screen
    // star.kill();

    // //  Add and update the score
    // this.score += 10;
    // this.scoreText.text = 'Score: ' + this.score;
  },

  // this function called by end of update function
  gameOver: function(player) {
    // // kill the player
    // player.kill();
    // // go to gameover state
      this.game.state.start("GameOver");
  }

};
