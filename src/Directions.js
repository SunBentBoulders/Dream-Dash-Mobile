var Directions = function(game){};

var storyLine = "Tap left/right to move";
var directionsFullText = "Fast asleep and lost in a dream\nCollect the clocks to wake up\nThe candles will guide your way";
var text, text2, titleText;

Directions.prototype = {
    
    preload: function(game){
        this.optionCount = 1;
        
        if (window.deviceAssetSize === 'desktop') {
            game.load.image('directions-bg', 'assets/images/arrow_directions_crop.png');
        } else if (window.deviceAssetSize === '1024x768') {
            game.load.image('directions-bg', 'assets/images/mobile_directions.png');
        } else if (window.deviceAssetSize === '960x640') {
            game.load.image('directions-bg', 'assets/images/mobile_directions.png');
        } else if (window.deviceAssetSize === '1280x800') {
            game.load.image('directions-bg', 'assets/images/mobile_directions.png');
        } else if (window.deviceAssetSize === '1024x600') {
            game.load.image('directions-bg', 'assets/images/mobile_directions.png');
        } else if (window.deviceAssetSize === '1408x792') {
            game.load.image('directions-bg', 'assets/images/mobile_directions.png');
        }
        
        game.load.image('clock_candle', 'img/clock_candle_combo.png');
    },
    
    addDesktopMenuOption: function(text, callback) {
        
        var optionStyle = {
            font: this.game.height / 20 + 'pt TheMinion',
            fill: '#f0daac',
            align: 'left',
            stroke: 'rgba(0,0,0,0)',
            strokeThickness: 4
        };
        
        var txt = this.game.add.text(this.game.width / 30, ((this.optionCount + 2) * this.game.height / 7.5) + this.game.height / 4, text, optionStyle);
        txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function(target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
            txt.setShadow(3, 3, 'rgba(0,0,0,1.5)', 5);
        };
        
        var onOut = function(target) {
            target.fill = "#f0daac";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;
    },

    addMobileMenuOption: function(buttonName, callback) {
        var button = this.game.add.button(this.game.width / 30, ((this.optionCount + 1) * this.game.height / 7.5) + this.game.height / 2, buttonName);
        button.inputEnabled = true;
        button.events.onInputDown.add(callback, this);

    },
    
    create: function(game){
        
       game.state.add('Preloader', Preloader);
        
        if (this.game.device.desktop) {

            titleText = game.add.text(this.game.width/2, this.game.height.centerY/4, "How To Play", {
                font: 'bold ' + this.game.height / 20 + 'pt TheMinion',
                fill: '#7CCD7C',
                align: 'center'
            });
            titleText.anchor.set(0);

            game.add.sprite(this.game.width.centerX, this.game.height/6, 'directions-bg');
            game.add.sprite(this.game.width.centerX, this.game.height/8, 'clock_candle');
    
            text2 = game.add.text(this.game.width/2, this.game.height/6, directionsFullText, {
                font: this.game.height / 40 + 'pt TheMinion',
                fill: 'white',
                align: 'right',
                stroke: 'rgba(0,0,0,0)',
                strokeThickness: 4
            });
            text2.anchor.set(0);

            text = game.add.text(20, this.game.height/2, storyLine, {
                font: this.game.height / 40 + 'pt TheMinion',
                fill: 'white',
                align: 'right',
                stroke: 'rgba(0,0,0,0)',
                strokeThickness: 4
            });
            text.anchor.set(0);

            this.addDesktopMenuOption('Continue >', function(e) {
                    game.state.start("Preloader");
            });      
        } else {
	        this.addMobileMenuOption('Continue >', function() {
                this.game.state.start("Preloader");
            })
        }
           
    }
    
};