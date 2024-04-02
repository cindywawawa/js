class rules1 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'rules1' });
    }


    preload(){
    // simple Main Page image
    this.load.image('rules1', 'assets/rules1.jpg');

    }

    create() {
       
        this.add.image(0, 0, 'rules1').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto level1");
            this.scene.start("level1");
            }, this );

       
    }

    update(){



    }
}
