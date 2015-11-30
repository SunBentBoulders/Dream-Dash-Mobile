var Menu = {
    preload: function(){
        game.load.image('menu', '../img/2.jpg')
    },
    
    create: function(){
        this.add.sprite(0, 0, 'menu');
        //params are (x,y, image)
    }
};