class storyline extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyline' });
    }


    preload(){
    // simple Main Page image
    this.load.image('storyline', 'assets/storyline.jpg');

    }

    create() {
       
        this.add.image(0, 0, 'storyline').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto rules1");
            this.scene.start("rules1");
            }, this );

    }

    update(){



    }
}
