var Game = function(game) {
    var transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);

    transitionPlugin.settings = {
      // how long the animation should take
      duration: 3000,

      // ease property
      ease: Phaser.Easing.Quadratic.Out, /* default ease */

      // what property should be tweened
      properties: {
        alpha: 0
      }
    };

  transitionPlugin;
  // player is now a group that we can use to bind the real player to the faux player
  this.player;
  // this is the real player that the user sees
  // this.realPlayer;
  // this is the fake player that only exists for collision detection
  // this.fauxPlayer;
  // this.platforms;
  // this.cursors;
  // these are the enemy stars
  this.stars;
  // these are the stars for the player to collect(set to 1 for now, until we get level up working)
  this.starsToCollect = 5;
  // this is the number of stars that have been collected
  this.collectedStars = 0;
  //sets the score at the beginning of the game
  this.score = 0;
  // this.scoreText;
  game.scrollableWidth = game.width * 2.5; // same as 2000 but in relation to the game.width
  this.right = 1;
  this.left = 0;
  var clouds;
  var backgroundScroll;
  var pause;
  var pausedText;
  var totalScore;
  // this keeps track of the current level (1 through 5) that the player is on
  this.currentLevel = 1;
  game.currentLevel = this.currentLevel;
  nextLevel = 1;
  //sets the players invinicibiliy for when it get hits by enemy
  playerInvincible = false;
  //sets the players lifesLost to be false
  playerLostLife = false;
};
Game.prototype = {

  preload: function (game) {
    //checks to see if vibrate is available, and if so, activates it
    if("vibrate" in window.navigator) {
        console.log('vibrate is on');
    }

    // console.log(game.width,game.height);
    // this.optionCount = 1;
    // game.load.image('sky', 'img/sky.png');
    // game.load.image('ground', 'img/platform.png');
    game.load.image('clouds', 'img/cloud.png');
    game.load.image('enemyStar', 'img/enemyStar.png');
    game.load.image('star', 'img/star.png');
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    game.load.image('pause', 'img/pause.png');
    game.load.image('clock', 'img/clock.png');
  },


  create: function (game) {
    //adds in transitions
    transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);

    transitionPlugin.settings = {
      // how long the animation should take
      duration: 2000,

      // ease property
      ease: Phaser.Easing.Quadratic.Out, /* default ease */

      // what property should be tweened
      properties: {
        alpha: 0
      }
    };

    //  We're going to be using physics, so enable the Arcade Physics system

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //creates infinite tiling of the cloud image
    clouds = game.add.tileSprite(0,0,game.scrollableWidth,game.height, 'clouds');
    // set the scroll speed for the background image
    backgroundScroll = 1;


    // this block is for the game menu
    this.stage.disableVisibilityChange = false;

    // code for the background
    // ==================================
    // set background color
    this.stage.backgroundColor = 0x00007f;
    // add horizon line
    var graphics = game.add.graphics(0,0);
    graphics.beginFill(0x000019);
    graphics.lineStyle(2, 0x000019, 1);
    // syntax: top left x, top left y, width, height
    graphics.drawRect(0, game.height/2, game.scrollableWidth, game.height);
    graphics.endFill();
    // ==================================

     // add group of enemy stars
    game.stars = game.add.group();
    // game.physics.arcade.enable(game.stars);
    // game.stars.enableBody = true;
    // console.log("game.stars", game.stars)
    // console.log("game.stars", game.stars)
    // game.stars.setAll('body.width', 30);
    // game.stars.setAll('body.height', 50);
    game.starCount = 0;

    // add group of stars to collect
    game.starsToCollect = game.add.group();
    game.starsToCollect.enableBody = true;
    game.collectedStars = 0;
    // game.score = 0;

    //add group of clocks to collect
    game.ClocksToCollect = game.add.group();
    game.ClocksToCollect.enableBody = true;


    // make player and faux player for collision detection
    //===================================================
    // add faux player first so it renders behind player and isn't seen by user, render physics on faux player
    // this.fauxPlayer = game.add.sprite(game.scrollableWidth/2, game.height/4*4, 'dude');
    // this.fauxPlayer.scale.setTo(.5, .5);
    // this.fauxPlayer.anchor.setTo(.5, 1);
    // game.physics.arcade.enable(this.fauxPlayer);
    // this.fauxPlayer.visible = false;

    // add real player and enable physics on player
    // this.realPlayer = game.add.sprite(game.scrollableWidth/2, 0, 'dude');
    // this.realPlayer.scale.setTo(1.5, 1.5);
    // this.realPlayer.anchor.setTo(.5, 1);
    // this.realPlayer.hitArea = new Phaser.Rectangle(0, 0, 5, 5);
    // console.log("realPlayer.hitArea", this.realPlayer.hitArea);

    // add real player and faux player to player group
    this.player = game.add.sprite(game.scrollableWidth/2, 0, 'dude');
    this.player.scale.setTo(1.5, 1.5);
    this.player.anchor.setTo(.5, 1);

    game.physics.arcade.enable(this.player);
    this.player.enableBody = true;
    this.player.body.width = 24;
    this.player.body.height = 36;
    // this.player.add(this.fauxPlayer);
    // this.player.add(this.realPlayer);
    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.3;
    this.player.body.bounce.x = 0.2;
    this.player.body.gravity.y = 300;
    //===================================================




    //  Create a star inside of the 'stars' group
    game.addStar = function(){
        game.starCount++;
        console.log("addStar starCount", game.starCount);
        var star = game.stars.create(game.camera.view.randomX, game.height/2, 'enemyStar');
        // console.log("this.width", this.width);
        // console.log("game.width", game.width)
        star.scale.setTo(0);
        star.anchor.setTo(0.5);
        // modify physics body of enemy sprites
        game.physics.arcade.enable(game.stars);
        game.stars.enableBody = true;
        star.body.setSize(300, 300);

        // star.body.scale.setTo(0.5, 0.5)
        // game.physics.arcade.enable(star);
        // star.enableBody = true;
        // star.body.width = 30;
        // star.body.height = 30;
        // enable physics
        // game.physics.enable(star, Phaser.Physics.ARCADE);
        // star.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        game.physics.arcade.moveToXY(star, Math.random() * game.scrollableWidth, this.height * 1.5, 200, 14000)

        var tween = game.add.tween(star.scale);
        var timeToTween = 8000;
        // tween.from({x: 0, y: 0});
        tween.to({x: .5, y:.5}, timeToTween, Phaser.Easing.Exponential.In, true);
        // add tween for stars to move to edges of screen as they get bigger
        // applies to stars that start on left of screen
        // var bodyTween = game.add.tween(star.body);
        // bodyTween.to({width: 40, height: 40}, Phaser.Easing.Exponential.In, true);
        // add velocity instead of tween

        var tween2 = game.add.tween(star.position);
        // stars move to random x coordinates of screen
        tween2.to({x: Math.random() * game.scrollableWidth, y: this.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        tween2.onComplete.add(function() {
            // game.starCount--;
            star.kill();
            console.log("star killed, starCount is", game.starCount)
        });
    };

    // dropTimer and addStarWrapper are used to generate stars at random intervals
    game.dropTimer = game.time.create(false);
    game.dropTimer.start();
    game.addStarWrapper = function() {
        // game.currentLevel = 10;
        game.addStar();
        console.log('this is nextLevel in addstar', nextLevel);
        console.log('this is game.currentLevel in addstar', game.currentLevel)
        // console.log('this is currentLevel', currentLevel);
        game.dropTimer.add(Phaser.Timer.SECOND * Math.random()/ nextLevel * 3.5, game.addStarWrapper, this);

    };
    game.addStarWrapper();

    // add stars to collect and get points
    //=======================================================

    //  Create a star inside of the 'stars' group
    game.addStarToCollect = function(){
        // game.collectedStars++;
        console.log("addStarToCollect collectedStars", game.collectedStars);
        var star = game.starsToCollect.create(game.camera.view.randomX, game.height/2, 'star');
        star.scale.setTo(0);
        star.anchor.setTo(.5);
        // modify physics body of enemy sprites
        game.physics.arcade.enable(game.stars);
        game.stars.enableBody = true;
        star.body.setSize(10, 10);

        // star.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        var tween = game.add.tween(star.scale);
        var timeToTween = 10000;
        tween.to({x: 4, y:4}, timeToTween, Phaser.Easing.Exponential.In, true);
        // add tween for stars to move to edges of screen as they get bigger
        // applies to stars that start on left of screen
        // var bodyTween = game.add.tween(star.body);
        // bodyTween.to({width: 5, height: 5}, Phaser.Easing.Exponential.In, true);

        var tween2 = game.add.tween(star.position);
        // stars move to random x coordinates of screen
        tween2.to({x: Math.random() * game.scrollableWidth, y: game.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        tween2.onComplete.add(function() {
            // game.collectedStars--;
            star.kill();
            console.log("collection star killed, collectedStars is", game.collectedStars)

        });
    }

    // dropTimer and addStarWrapper are used to generate stars at random intervals
    game.dropTimerCollectedStars = game.time.create(false);
    game.dropTimerCollectedStars.start();
    game.addStarWrapperCollectedStars = function() {
        // "this" refers to game
        game.addStarToCollect();
        game.dropTimer.add(Phaser.Timer.SECOND * Math.random()*5, game.addStarWrapperCollectedStars, this);
    }
    game.addStarWrapperCollectedStars();

 // add Clocks to collect and get points
    //=======================================================

    //  Create a Clock inside of the 'Clocks' group
    game.addClockToCollect = function(){
        // game.collectedClocks++;
        // console.log("addClockToCollect collectedClocks", game.collectedClocks);
        var Clock = game.ClocksToCollect.create(game.camera.view.randomX, game.height/2, 'clock');
        Clock.scale.setTo(0);
        Clock.anchor.setTo(.5);

        Clock.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        var tween = game.add.tween(Clock.scale);
        var timeToTween = 10000;
        tween.to({x: 4, y:4}, timeToTween, Phaser.Easing.Exponential.In, true);
        // add tween for Clocks to move to edges of screen as they get bigger
        // applies to Clocks that Clockt on left of screen

        var tween2 = game.add.tween(Clock.position);
        // Clocks move to random x coordinates of screen
        tween2.to({x: Math.random() * game.scrollableWidth, y: game.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        tween2.onComplete.add(function() {
            // game.collectedClocks--;
            Clock.kill();
            // console.log("collection Clock killed, collectedClocks is", game.collectedClocks)

        });
    }

    // dropTimer and addClockWrapper are used to generate Clocks at random intervals
    game.dropTimerCollectedClocks = game.time.create(false);
    game.dropTimerCollectedClocks.start();
    game.addClockWrapperCollectedClocks = function() {
        // "this" refers to game
        game.addClockToCollect();
        game.dropTimer.add(Phaser.Timer.SECOND * Math.random()/nextLevel * 20, game.addClockWrapperCollectedClocks, this);
    }
    game.addClockWrapperCollectedClocks();

    // //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);


    // //  The score=============================================
    //will add this back once level up game state is made
    // this.scoreText = game.add.text(this.realPlayer.x-400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    // this.scoreText.fixedToCamera = true;
    this.scoreSprite = game.add.sprite(this.player.x-400,24,'star');
    this.scoreSprite.fixedToCamera = true;
    this.leftToCollect = game.add.text(this.player.x-380,16,' x ' + this.starsToCollect, { fontSize: '32px', fill:'#000' });
    this.leftToCollect.fixedToCamera = true;
    // console.log('this is this.stars', game.stars);
    //=====================================================
    //this will be the life bar
    var lifeDistance = 80
    this.life1 = game.add.sprite(lifeDistance, 16, 'clock');
    this.life1.fixedToCamera = true;
    this.life2 = game.add.sprite(lifeDistance + 40, 16, 'clock');
    this.life2.fixedToCamera = true;
    this.life3 = game.add.sprite(lifeDistance + 80, 16, 'clock');
    this.life3.fixedToCamera = true;









    // //  Our controls.=======================================
    cursors = game.input.keyboard.createCursorKeys();
    //set the world to be wider behind the frame
    game.world.setBounds(0,0,game.scrollableWidth,game.height);
    // console.log("game.world in game", game.world)
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
    this.player.body.collideWorldBounds=true;
    this.player.collideWorldBounds=true;
    // this.fauxPlayer.body.collideWorldBounds=true;
    //========================================================
    //add pause button
    pause = game.add.button(16,16,'pause');
    pause.fixedToCamera = true;
    pause.inputEnabled = true;
    pause.events.onInputUp.add(function(){
        //this is the game paused text
        pausedText = game.add.text(game.camera.x + 400,game.height/2, "Paused",{ font: '200px Arial', fill: '#fff' });
        pausedText.anchor.setTo(0.5,0.5);
        game.paused = true;
    });
    game.input.onDown.add(function(){
        //unpauses the game
        if(game.paused){
            pausedText.destroy();
            game.paused = false;
        }
    });




  },

  update: function(game) {
    this.player.body.bounce.x = 0.2;
    // this.player.bounce.x = 0.2;
    //make the background scroll
    clouds.tilePosition.y += backgroundScroll;
    //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(this.player, game.stars,this.gameOver, null, this);
    // game.physics.arcade.collide(this.stars, platforms);


    //Check to see if starTocollect is collected if so, run collect star
    game.physics.arcade.overlap(this.player, game.starsToCollect, null, this.collectStar, this);

    //check to see if ClockToCollect is collected, if so, run gainLife
    game.physics.arcade.overlap(this.player, game.ClocksToCollect, null, this.collectClock, this);

    // //  Checks to see if the player overlaps with any of the enemy stars, if he does call the checkCollision function, then gameOver function
    game.physics.arcade.collide(this.player, game.stars, null, this.checkCollision, this);
    game.physics.arcade.overlap(this.player, game.stars, null, this.loseLife, this);


    // //  Reset the players velocity (movement)
    this.player.body.velocity.x = 0; // sets velocity of realPlayer and fauxPlayer - syntax changed b/c player is now a group of sprites
    //checks to see if the keyboard is being used
    // console.log('the keyboard is enabled',game.input.keyboard.enabled);
    //check to see if finger is touching screen
    // console.log('the touchScreen is enabled',!!game.input.pointer1);
    //this is for computer input
    if(game.device.desktop){
        if (cursors.left.isDown) {
            //  Move to the left
            this.player.body.velocity.x = -400;
            this.player.animations.play('left');
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            this.player.body.velocity.x = 400;
            this.player.animations.play('right');
        }
        else {
            //  Stand still
            this.player.body.velocity.x = 0;
            this.player.frame = 4;
        }
    } else {

        //this if for the phone input
        if(game.input.pointer1.isDown){
            //check to see if the touch is happening on the left
            // console.log('pointer1 is down');
           if(Math.floor(game.input.x/(game.width/2)) === this.left){
            //move to the left
                this.player.animations.play('left');
                this.player.body.velocity.x = -400;
            //check to see if the touch is happening on the right
            }else if(Math.floor(game.input.x/(game.width/2)) === this.right){
            //move to the right
                this.player.animations.play('right');
                this.player.body.velocity.x = 400;
            }
        } else {
            this.player.body.velocity.x = 0;
            this.player.frame = 4;
        }
    }

    //=================================
    //this is here to simulate winning the game, need to go to game.state(win) once set up
    if(this.starsToCollect + this.collectedStars === this.collectedStars){
        console.log('you win');
        //calls function to increase the level
        this.levelUp();
        // this.gameOver();
    }
  },



  collectStar: function(player, star) {
    // // Removes the star from the screen
    star.kill();

    // //  Add and update the score and the number of stars collected and left to collect
    this.collectedStars++;
    this.starsToCollect--;
    console.log('this.score',this.score);
    this.score += 10;
    totalScore = this.score;
    console.log('game.score', game.score);
    //this sets the upper right corner left to collect
    this.leftToCollect.text = ' x ' + this.starsToCollect;
  },

  // this function is called when the faux player overlaps with an enemy star
  checkCollision: function(player, star) {
    console.log("checking for collision");
    console.log("player.body.velocity.x", player.body.velocity.x);
    // player.body.velocity.x = 10
    console.log("player.body.velocity.x", player.body.velocity.x)
    // this.input.keyboard.enabled = false;
    // player.animations.frame = 4;
    // player.animations.paused = true;
    // console.log("player", player)
    // player.body.velocity.x = 0;
    // setTimeout(this.gameOver, 500);
    // if (player.position.x < this.game.scrollableWidth/2) {
    //     player.body.velocity.x = 20;
    //     console.log("player.body.velocity.x", player.body.velocity.x)
    // } else {
    //     player.body.velocity.x = -20;
    // }
    // player.body.velocity.x = 10;
    player.body.velocity.y = -200;
    // star.body.velocity.x = Math.random()*1000;
    // star.body.velocity.y = -Math.random()*1000;
    // var collisionTweenPlayer = this.add.tween(player.position);
    // stars move to random x coordinates of screen
    // collisionTweenPlayer.to({x: this.camera.view.randomX, y: this.height}, 2000, Phaser.Easing.Linear.In, true)
    // collisionTweenPlayer.onComplete.add(function() {
    //     console.log("player is reacting to collision in checkCollision")
    //     this.gameOver();
    // }, this);
    // this.gameOver();
  },

  render: function(game) {
    // this.game.debug.bodyInfo(this.player, 32, 32);
    this.game.debug.body(this.player);
    this.game.stars.forEachAlive(this.renderGroup, this);
    this.game.starsToCollect.forEachAlive(this.renderGroup, this);
  },

  renderGroup: function(member) {
    this.game.debug.body(member);
  },

  collectClock: function(player, Clock){
    Clock.kill();
    this.gainLife();
  },

  // this function is called when the faux player overlaps with an enemy star
  // checkCollision: function() {
  //   if(!loseLifeBool){
  //       this.loseLife();
  //   }

  //   console.log("checking for collision");
  //   // setTimeout(this.gameOver, 500);
  //   // this.gameOver();
  // },

  // this function called by end of update function
  gameOver: function(player) {
    console.log("gameover");
    // player.kill();
    window.navigator.vibrate([2000]);
    totalScore = 0;
    // reset world bounds to the original 800x600
    this.world.setBounds(0,0,800,600);

    // kill the player
      // player.kill();
    // reset bounds to be viewable area

    // // go to gameover state
    transitionPlugin.to("GameOver");
  },
  //this is the function that will be called when player collects all candles
  levelUp: function(){
    playerInvincible = false;
    //resets the number of stars to collect once level up is reached
    this.starsToCollect = 5;
    //increases the level
    nextLevel++;
    console.log('this is currentLevel', nextLevel);
    //starts the levelup state
    transitionPlugin.to("LevelUp");
    //resets the world bouns
    this.world.setBounds(0,0,800,600);
  },

  loseLife: function(){
    if(!playerInvincible){
        if(this.life3.visible){
            //makes the third life dissappear
            this.life3.visible = false;
            //makes the player non-invincible
            this.toggleInvincible();
            //makes device vibrate
            window.navigator.vibrate([1000]);
            //makes the player invincible for 5 seconds
            this.game.time.events.add(5000, this.toggleInvincible, this);
        } else if(this.life2.visible){
            //makes second life dissapear
            this.life2.visible = false;
            this.toggleInvincible();
            window.navigator.vibrate([1000]);
            this.game.time.events.add(5000, this.toggleInvincible, this);
        } else{
            //once player loses last life, end the game
            this.gameOver();
        }
    }
  },

  gainLife: function(){
    if(!playerLostLife){
        if(!this.life3.visible){
            this.life3.visible = true;
            this.toggleLostLife();
            this.game.time.events.add(5000, this.toggleLostLife, this);
        } else if(!this.life2.visible){
            this.life2.visible = true;
            this.toggleLostLife();
            this.game.time.events.add(5000, this.toggleLostLife, this);
        }
    }
  },

  toggleInvincible: function(){
    playerInvincible = !playerInvincible;
  },

  toggleLostLife: function(){
    playerLostLife = !playerLostLife;
  }

};
