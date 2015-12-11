var Game = function(game) {

  //add in the plugin for transitions
  var transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);
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
  transitionPlugin;

  // the main character
  this.player;
  // these are the enemy sprites, was this.stars
  this.enemies;
  // these are the stars for the player to collect, this number will display and count down, was this.tokensToCollect
  this.tokensToCollect = 5;
  // this is the number of stars that have been collected
  this.collectedTokens = 0;
  //sets the score at the beginning of the game
  this.score = 0;
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
  this.backgroundImage;
};

Game.prototype = {

  preload: function (game) {
    //checks to see if vibrate is available, and if so, activates it
    if("vibrate" in window.navigator) {
        console.log('vibrate is on');
    }

    // load the rest of the game assets. see preload gamestate for others
    game.load.image('clouds', 'img/cloud.png');
    game.load.image('enemy', 'img/friendlyGhost.png');
    game.load.image('life', 'img/candle.png');
    // each sprite image is 32px wide by 48px tall in spritesheet
    game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    game.load.image('pause', 'img/pause.png');
    game.load.image('token', 'img/clock.png');
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

    this.backgroundImage = game.add.sprite(0, 0, 'game-bg');

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // creates infinite tiling of the cloud image
    // clouds = game.add.tileSprite(0,0,game.scrollableWidth,game.height, 'clouds');
    // set the scroll speed for the background image
    // backgroundScroll = 1;


    // this is for the game menu
    this.stage.disableVisibilityChange = false;

    // code for the plain background
    // ==================================
    // set background color
    // this.stage.backgroundColor = 0x00007f;
    // add horizon line
    // var graphics = game.add.graphics(0,0);
    // graphics.beginFill(0x000019);
    // graphics.lineStyle(2, 0x000019, 1);
    // syntax: top left x, top left y, width, height
    // graphics.drawRect(0, game.height/2, game.scrollableWidth, game.height);
    // graphics.endFill();
    // ==================================


    // add main sprites to screen
    //===================================================
    // add group of enemy stars
    game.enemies = game.add.group();
    game.enemyCount = 0;

    // add group of tokens to collect
    game.tokensToCollect = game.add.group();
    game.tokensToCollect.enableBody = true;
    game.collectedTokens = 0;

    //add group of lives to collect
    game.livesToCollect = game.add.group();
    game.livesToCollect.enableBody = true;

    // add player to game
    this.player = game.add.sprite(game.scrollableWidth/2, 0, 'dude');
    this.player.scale.setTo(1.5, 1.5);
    // set initial location of player in the top center of screen
    this.player.anchor.setTo(.5, 1);
    // enable physics on the player
    game.physics.arcade.enable(this.player);
    // set the bounding box size of the physics body for collision detection
    this.player.enableBody = true;
    this.player.body.width = 24;
    this.player.body.height = 46;
    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.y = 0.3;
    this.player.body.bounce.x = 0.2;
    this.player.body.gravity.y = 300;
    //===================================================


    //  Create an enemy inside of the 'enemies' group
    game.addEnemy = function(){
        game.enemyCount++;
        console.log("addEnemy enemyCount", game.enemyCount);
        // create enemy that starts invisible with a size of 0
        var enemy = game.enemies.create(game.camera.view.randomX, game.height/2, 'enemy');
        enemy.scale.setTo(0);
        enemy.anchor.setTo(0.5);
        // modify physics body of enemy sprites
        game.physics.arcade.enable(game.enemies);
        game.enemies.enableBody = true;
        enemy.body.setSize(150, 250);

        // TODO: make enemies move with physics velocity instead of position tween
        game.physics.arcade.moveToXY(enemy, Math.random() * game.scrollableWidth, this.height * 1.5, 200, 14000)

        // add a tween that scales the enemy sizes
        var scaleTween = game.add.tween(enemy.scale);
        var timeToTween = 9000;
        // scales enemy from size 0 to full size
        scaleTween.to({x: 1, y: 1}, timeToTween, Phaser.Easing.Exponential.In, true);

        // add a tween that changes the position of the enemy
        var positionTween = game.add.tween(enemy.position);
        // stars move to random x coordinates of screen
        positionTween.to({x: Math.random() * game.scrollableWidth, y: this.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        // this function gets called once tween is complete - will kill enemies once tween is complete and they are off screen
        positionTween.onComplete.add(function() {
            // game.enemyCount--;
            enemy.kill();
            console.log("enemy killed, enemyCount is", game.enemyCount)
        });
    };

    // dropTimer and addEnemyTimer are used to generate stars at random intervals
    game.dropTimer = game.time.create(false);
    game.dropTimer.start();
    game.addEnemyTimer = function() {
        // uncomment the following line to test the difficulty of a specific level
        // game.currentLevel = 10;
        game.addEnemy();
        // after adding an enemy, call the addEnemyTimer function again after a random amount of time elapses
        game.dropTimer.add(Phaser.Timer.SECOND * Math.random()/ nextLevel * 3.5, game.addEnemyTimer, this);
    };
    game.addEnemyTimer();

    // add stars to collect and get points
    //=======================================================

    //  Create a star inside of the 'stars' group
    game.addStarToCollect = function(){
        // game.collectedTokens++;
        console.log("addStarToCollect collectedTokens", game.collectedTokens);
        var star = game.tokensToCollect.create(game.camera.view.randomX, game.height/2, 'token');
        star.scale.setTo(0);
        star.anchor.setTo(.5);
        // modify physics body of enemy sprites
        game.physics.arcade.enable(game.enemies);
        game.enemies.enableBody = true;
        star.body.setSize(30, 30)

        // star.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        var tween = game.add.tween(star.scale);
        var timeToTween = 10000;
        tween.to({x: 4, y: 4}, timeToTween, Phaser.Easing.Exponential.In, true);
        // add tween for stars to move to edges of screen as they get bigger
        // applies to stars that start on left of screen
        // var bodyTween = game.add.tween(star.body);
        // bodyTween.to({width: 5, height: 5}, Phaser.Easing.Exponential.In, true);

        var tween2 = game.add.tween(star.position);
        // stars move to random x coordinates of screen
        tween2.to({x: Math.random() * game.scrollableWidth, y: game.height*1.5}, timeToTween, Phaser.Easing.Exponential.In, true)
        tween2.onComplete.add(function() {
            // game.collectedTokens--;
            star.kill();
            console.log("collection star killed, collectedTokens is", game.collectedTokens)

        });
    }

    // dropTimer and addEnemyTimer are used to generate stars at random intervals
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
        var Clock = game.livesToCollect.create(game.camera.view.randomX, game.height/2, 'life');
        Clock.scale.setTo(0);
        Clock.anchor.setTo(.5);
        Clock.enableBody = true;
        Clock.body.setSize(30, 90);

        // Clock.body.immovable = true;
        // tween syntax: .to( object containing chosen parameter's ending values, time of tween in ms, type of easing to use, "true" value, [optional] onComplete event handler)
        var tween = game.add.tween(Clock.scale);
        var timeToTween = 12000;
        tween.to({x: 1, y: 1}, timeToTween, Phaser.Easing.Exponential.In, true);
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
    this.player.animations.add('left', [0, 1, 2, 3, 2, 1], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8, 7, 6], 10, true);


    // //  The score=============================================
    //will add this back once level up game state is made
    // this.scoreText = game.add.text(this.realPlayer.x-400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    // this.scoreText.fixedToCamera = true;
    this.scoreSprite = game.add.sprite(this.player.x-413,16,'token');
    this.scoreSprite.fixedToCamera = true;
    this.leftToCollect = game.add.text(this.player.x-380,16,' x ' + this.tokensToCollect, { fontSize: '32px', fill:'#fff' });
    this.leftToCollect.fixedToCamera = true;
    // console.log('this is this.stars', game.enemies);
    //=====================================================
    //this will be the life bar
    var lifeDistance = 70
    this.life1 = game.add.sprite(lifeDistance, 16, 'life');
    this.life1.scale.setTo(.35);
    this.life1.fixedToCamera = true;
    this.life2 = game.add.sprite(lifeDistance + 40, 16, 'life');
    this.life2.scale.setTo(.35);
    this.life2.fixedToCamera = true;
    this.life3 = game.add.sprite(lifeDistance + 80, 16, 'life');
    this.life3.scale.setTo(.35);
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
//    clouds.tilePosition.y += backgroundScroll;
    //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(this.player, game.enemies,this.gameOver, null, this);
    // game.physics.arcade.collide(this.stars, platforms);


    //Check to see if starTocollect is collected if so, run collect star
    game.physics.arcade.overlap(this.player, game.tokensToCollect, null, this.collectStar, this);

    //check to see if ClockToCollect is collected, if so, run gainLife
    game.physics.arcade.overlap(this.player, game.livesToCollect, null, this.collectClock, this);

    // //  Checks to see if the player overlaps with any of the enemy stars, if he does call the checkCollision function, then gameOver function
    game.physics.arcade.collide(this.player, game.enemies, null, this.checkCollision, this);
    // game.physics.arcade.overlap(this.player, game.enemies, null, this.loseLife, this);


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
    if(this.tokensToCollect + this.collectedTokens === this.collectedTokens){
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
    this.collectedTokens++;
    this.tokensToCollect--;
    console.log('this.score',this.score);
    this.score += 10;
    totalScore = this.score;
    console.log('game.score', game.score);
    //this sets the upper right corner left to collect
    this.leftToCollect.text = ' x ' + this.tokensToCollect;
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
    this.loseLife();
  },

  render: function(game) {
    // this.game.debug.bodyInfo(this.player, 32, 32);
    this.game.debug.body(this.player);
    this.game.enemies.forEachAlive(this.renderGroup, this);
    this.game.tokensToCollect.forEachAlive(this.renderGroup, this);
    this.game.livesToCollect.forEachAlive(this.renderGroup, this);
  },

  renderGroup: function(member) {
    this.game.debug.body(member);
  },

  collectClock: function(player, Clock){
    Clock.kill();
    this.gainLife();
  },

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
    this.tokensToCollect = 5;
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
            // set new alpha for sprites
            var newAlpha = 0.8;
            //makes the third life dissappear
            this.life3.visible = false;
            //makes the player non-invincible
            this.toggleInvincible();
            //makes device vibrate
            window.navigator.vibrate([1000]);
            //makes the player invincible for 5 seconds
            this.game.time.events.add(3000, this.toggleInvincible, this);
        } else if(this.life2.visible){
            var newAlpha = 0.6;
            //makes second life dissapear
            this.life2.visible = false;
            this.toggleInvincible();
            window.navigator.vibrate([1000]);
            this.game.time.events.add(5000, this.toggleInvincible, this);
        } else{
            //once player loses last life, end the game
            this.gameOver();
        }
        // set new alphas on sprites
        this.player.alpha = newAlpha;
        this.game.enemies.setAll('alpha', newAlpha);
        this.game.tokensToCollect.setAll('alpha', newAlpha);
        // clouds.alpha = newAlpha;
        this.backgroundImage.alpha = newAlpha;
    }
  },

  gainLife: function(){
    if(!playerLostLife){
        if(!this.life2.visible){
            var newAlpha = 0.8;
            this.life2.visible = true;
            this.toggleLostLife();
            this.game.time.events.add(3000, this.toggleLostLife, this);
        } else if(!this.life3.visible){
            this.life3.visible = true;
            this.toggleLostLife();
            this.game.time.events.add(5000, this.toggleLostLife, this);
        } if(!this.life3.visible){
            // set new alpha for sprites
            var newAlpha = 1;
            this.life3.visible = true;
            this.toggleLostLife();
            this.game.time.events.add(3000, this.toggleLostLife, this);
        }
    }
    // set new alphas on sprites
    this.player.alpha = newAlpha;
    this.game.enemies.setAll('alpha', newAlpha);
    this.game.tokensToCollect.setAll('alpha', newAlpha);
    // clouds.alpha = newAlpha;
    this.backgroundImage.alpha = newAlpha;

  },

  toggleInvincible: function(){
    playerInvincible = !playerInvincible;
  },

  toggleLostLife: function(){
    playerLostLife = !playerLostLife;
  }

};
