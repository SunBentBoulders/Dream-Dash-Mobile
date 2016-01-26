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
    // this is the group of 'life' sprites for the player to collect
    this.livesToCollect;
    // this is the number of tokens that have been collected
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

    preload: function(game) {
        //checks to see if vibrate is available, and if so, activates it
        if ("vibrate" in window.navigator) {
            // console.log('vibrate is on');
        }

        // load the rest of the game assets. see preload gamestate for others
        // game.load.image('clouds', 'img/cloud.png');
        game.load.image('enemy', 'img/friendlyGhost.png');
        game.load.image('life', 'img/candle.png');
        // each sprite image is 32px wide by 48px tall in spritesheet
        game.load.spritesheet('dude', 'img/person.png', 86, 129);
        game.load.image('pause', 'img/pause.png');
        game.load.image('token', 'img/clock.png');
    },

    create: function(game) {
        //adds in transitions
        transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);
        transitionPlugin.settings = {
            // how long the animation should take
            duration: 2000,
            // ease property
            ease: Phaser.Easing.Quadratic.Out,
            /* default ease */
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
        this.player = game.add.sprite(game.scrollableWidth / 2, game.height / 2, 'dude');
        // this.player.scale.setTo(1.5, 1.5);
        // set initial location of player in the top center of screen
        this.player.anchor.setTo(.5, 1);
        // enable physics on the player
        game.physics.arcade.enable(this.player);
        // set the bounding box size of the physics body for collision detection
        this.player.enableBody = true;
        this.player.body.width = 45;
        this.player.body.height = 95;
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.y = 0.4;
        this.player.body.bounce.x = 0.2;
        this.player.body.gravity.y = 500;
        //===================================================


        // this block adds enemies, tokens, and lives to the game
        //=====================================================
        // this function creates the sprites when called and sets the sprite properties
        game.addSprite = function(className, spriteName, bodySizeX, bodySizeY, timeToTween) { // e.g. game.enemies, enemy, 150, 250, 9000
            // create sprite that starts invisible with a size of 0
            var sprite = className.create(game.camera.view.randomX, game.height / 2, spriteName);
            sprite.scale.setTo(0);
            sprite.anchor.setTo(0.5);
            // modify physics body of sprites
            game.physics.arcade.enable(className);
            className.enableBody = true;
            sprite.body.setSize(bodySizeX, bodySizeY);

            // TODO: make sprites move with physics velocity instead of position tween
            // game.physics.arcade.moveToXY(spriteName, Math.random() * game.scrollableWidth, this.height * 1.5, 200, 14000)

            // add a tween that scales the sprite sizes
            var scaleTween = game.add.tween(sprite.scale);
            // scales sprite from size 0 to full size
            scaleTween.to({ x: 1, y: 1}, timeToTween, Phaser.Easing.Exponential.In, true);

            // add a tween that changes the position of the sprite
            var positionTween = game.add.tween(sprite.position);
            // sprites move to random x coordinates of screen
            positionTween.to({ x: Math.random() * game.scrollableWidth, y: this.height * 1.5}, timeToTween, Phaser.Easing.Exponential.In, true);
            // this function gets called once tween is complete - will kill sprites once tween is complete and they are off screen
            positionTween.onComplete.add(function() {
                sprite.kill();
            });
        };

        // this function adds sprites based on a set interval of time
        game.startSpriteTimer = function(className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval) {
            // add and start a phaser timer
            game.dropTimer = game.time.create(false);
            game.dropTimer.start();
            // add a sprite
            game.addSprite(className, spriteName, bodySizeX, bodySizeY, timeToTween);
            // after adding an enemy, call the addEnemyTimer function again after a random amount of time elapses
            game.dropTimer.add(Phaser.Timer.SECOND * Math.random() * timerInterval, game.startSpriteTimer, this, className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval);
        };
        // parameters: className, spriteName, bodySizeX, bodySizeY, timeToTween, timerInterval
        // add enemies to game
        game.startSpriteTimer(game.enemies, 'enemy', 150, 250, 9000, 1 / game.currentLevel * 3.5);
        // add tokens to game for player to collect (clocks)
        game.startSpriteTimer(game.tokensToCollect, 'token', 30, 30, 10000, 5);
        // add lives to game (candles)
        game.startSpriteTimer(game.livesToCollect, 'life', 50, 300, 12000, 25);
        //=====================================================

        // Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3, 2, 1], 12, true);
        this.player.animations.add('right', [5, 6, 7, 8, 7, 6], 12, true);

        // The score=============================================
        // will add this back once level up game state is made
        // this.scoreText = game.add.text(this.realPlayer.x-400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        // this.scoreText.fixedToCamera = true;
        if (window.deviceAssetSize === 'desktop') {
            this.scoreSprite = game.add.sprite(this.player.x - this.game.width / 1.937, this.game.height / 37.5, 'token');
            this.leftToCollect = game.add.text(this.player.x - this.game.width / 2.3, this.game.height / 37.5, ' x ' + this.tokensToCollect, {
                fontSize: this.game.height / 17 + 'px',
                fill: '#fff'
            });
        } else {
            this.scoreSprite = game.add.sprite(this.player.x - this.game.width / 2, this.game.height / 30, 'token');
            this.leftToCollect = game.add.text(this.player.x - this.game.width / 2.2, this.game.height / 37.5, ' x ' + this.tokensToCollect, {
                fontSize: this.game.height / 17 + 'px',
                fill: '#fff'
            });
            this.leftToCollect.cssFont = 'bold 50pt Arial';
        }
        this.scoreSprite.scale.setTo(0.5);
        this.scoreSprite.fixedToCamera = true;
        this.leftToCollect.fixedToCamera = true;
        //=====================================================

        //this will be the life bar
        var lifeDistance = this.game.width / 8
        this.life1 = game.add.sprite(lifeDistance, this.game.height / 37.5, 'life');
        this.life1.scale.setTo(.20);
        this.life1.fixedToCamera = true;
        this.life2 = game.add.sprite(lifeDistance + this.game.width / 20, this.game.height / 37.5, 'life');
        this.life2.scale.setTo(.20);
        this.life2.fixedToCamera = true;
        this.life3 = game.add.sprite(lifeDistance + this.game.width / 10, this.game.height / 37.5, 'life');
        this.life3.scale.setTo(.20);
        this.life3.fixedToCamera = true;

        // Controls =======================================
        cursors = game.input.keyboard.createCursorKeys();
        //set the world to be wider behind the frame
        game.world.setBounds(0, 0, game.scrollableWidth, game.height);
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
        this.player.body.collideWorldBounds = true;
        this.player.collideWorldBounds = true;
        //========================================================

        //Pause button ============================
        pause = game.add.button(this.game.width / 50, this.game.height / 37.5, 'pause');
        pause.fixedToCamera = true;
        pause.inputEnabled = true;
        pause.events.onInputUp.add(function() {
            //Paused text
            console.log("game.camera", game.camera)
            pausedText = game.add.text(game.camera.view.centerX, game.height / 2, "Paused", {
                font: '200px Arial',
                fill: '#fff'
            });
            pausedText.anchor.setTo(0.5, 0.5);
            game.paused = true;
        });
        game.input.onDown.add(function() {
            //Unpause game
            if (game.paused) {
                pausedText.destroy();
                game.paused = false;
            }
        });
        //=============================================
    },

    update: function(game) {

        // Collisions/collections===============================
        //Check to see if tokensTocollect is collected if so, run collectToken
        game.physics.arcade.overlap(this.player, game.tokensToCollect, null, this.collectToken, this);

        //check to see if livesToCollect is collected, if so, run collectLife
        game.physics.arcade.overlap(this.player, game.livesToCollect, null, this.collectLife, this);

        // Checks to see if the player overlaps with any of the enemies, if he does call the checkCollision function, then gameOver function
        game.physics.arcade.collide(this.player, game.enemies, null, this.checkCollision, this);
        //=====================================================

        // Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        // Controls=========================================
        //checks to see if the keyboard is being used
        // console.log('the keyboard is enabled',game.input.keyboard.enabled);
        //check to see if finger is touching screen
        // console.log('the touchScreen is enabled',!!game.input.pointer1);
        //this is for computer input
        if (game.device.desktop) {
            if (cursors.left.isDown) {
                //  Move left
                this.player.body.velocity.x = -400;
                this.player.animations.play('left');
            } else if (cursors.right.isDown) {
                //  Move right
                this.player.body.velocity.x = 400;
                this.player.animations.play('right');
            } else {
                //  Stand still
                this.player.body.velocity.x = 0;
                this.player.frame = 4;
            }
        } else {

            //this if for the phone input
            if (game.input.pointer1.isDown) {
                //check to see if the touch is happening on the left
                // console.log('pointer1 is down');
                if (Math.floor(game.input.x / (game.width / 2)) === this.left) {
                    //move to the left
                    this.player.animations.play('left');
                    this.player.body.velocity.x = -400;
                    //check to see if the touch is happening on the right
                } else if (Math.floor(game.input.x / (game.width / 2)) === this.right) {
                    //move to the right
                    this.player.animations.play('right');
                    this.player.body.velocity.x = 400;
                }
            } else {
                this.player.body.velocity.x = 0;
                this.player.frame = 4;
            }
        }
        //==================================================

        //this is here to simulate winning the game, need to go to game.state(win) once set up
        if (this.tokensToCollect + this.collectedTokens === this.collectedTokens) {
            // console.log('you win');
            //calls function to increase the level
            this.levelUp();
            // this.gameOver();
        }
    },

    collectToken: function(player, token) {
        // Removes the token from the screen
        token.kill();

        // Add and update the score and the number of tokens collected and left to collect
        this.collectedTokens++;
        this.tokensToCollect--;
        // console.log('this.score',this.score);
        this.score += 10;
        totalScore = this.score;
        // console.log('game.score', game.score);
        //this sets the upper right corner left to collect
        this.leftToCollect.text = ' x ' + this.tokensToCollect;
        this.leftToCollect.cssFont = 'bold 50pt Arial';
    },

    // this function is called when the player collides with an enemy
    checkCollision: function(player, enemy) {
        // console.log("checking for collision");
        // this.input.keyboard.enabled = false;
        // player.animations.frame = 4;
        // player.animations.paused = true;

        // make player "react" to the collision
        player.body.velocity.y = -200;
        this.loseLife();
    },

    // // this function for debugging only
    // render: function(game) {
    //   // this.game.debug.bodyInfo(this.player, 32, 32);
    //   this.game.debug.body(this.player);
    //   this.game.enemies.forEachAlive(this.renderGroup, this);
    //   this.game.tokensToCollect.forEachAlive(this.renderGroup, this);
    //   this.game.livesToCollect.forEachAlive(this.renderGroup, this);
    // },

    // // this function for debugging groups of sprites only
    // renderGroup: function(member) {
    //   this.game.debug.body(member);
    // },

    collectLife: function(player, life) {
        life.kill();
        this.gainLife();
    },

    gameOver: function(player) {
        // console.log("gameover");
        // player.kill();
        window.navigator.vibrate([2000]);
        totalScore = 0;
        // reset world bounds to the original 800x600 so following gamestates show up correctly
        this.world.setBounds(0, 0, this.game.width, this.game.height);

        // go to gameover state
        transitionPlugin.to("GameOver");
    },

    //this is the function that will be called when player collects all tokens
    levelUp: function() {
        playerInvincible = false;
        //resets the number of tokens to collect on LevelUp state
        this.tokensToCollect = 5;
        //increases the level
        nextLevel++;
        // console.log('this is currentLevel', nextLevel);

        //starts the LevelUp state
        transitionPlugin.to("LevelUp");
        //resets the world bounds
        this.world.setBounds(0, 0, this.game.width, this.game.height);
    },

    loseLife: function() {
        if (!playerInvincible) {
            if (this.life3.visible) {
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
            } else if (this.life2.visible) {
                var newAlpha = 0.6;
                //makes 2nd life dissapear
                this.life2.visible = false;
                this.toggleInvincible();
                window.navigator.vibrate([1000]);
                this.game.time.events.add(5000, this.toggleInvincible, this);
            } else {
                //end the game once player loses last life
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

    gainLife: function() {
        if (!playerLostLife) {
            if (!this.life2.visible) {
                var newAlpha = 0.8;
                this.life2.visible = true;
                this.toggleLostLife();
                this.game.time.events.add(3000, this.toggleLostLife, this);
            } else if (!this.life3.visible) {
                var newAlpha = 1;
                this.life3.visible = true;
                this.toggleLostLife();
                this.game.time.events.add(5000, this.toggleLostLife, this);
            }
        }
        // set new alphas on sprites
        this.player.alpha = newAlpha;
        this.game.enemies.setAll('alpha', newAlpha);
        this.game.tokensToCollect.setAll('alpha', newAlpha);
        // clouds.alpha = newAlpha;
        this.backgroundImage.alpha = newAlpha;

    },

    toggleInvincible: function() {
        playerInvincible = !playerInvincible;
    },

    toggleLostLife: function() {
        playerLostLife = !playerLostLife;
    }

};