class intro extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'intro' });
    }


    preload(){
    // simple Main Page image
    this.load.image('intro', 'assets/intro.jpg');
    this.load.audio("happy", "assets/happy.mp3");
    }

    create() {
        this.load.audio("happy", "assets/happy.mp3");
        this.add.image(0, 0, 'intro').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto storyline");
            this.scene.start("storyline");
            }, this );

            this.happy = this.sound.add("happy",{loop: true}).setVolume(0.3);
            this.happy.play();
    }

    update(){



    }
}
