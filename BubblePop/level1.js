class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level1", "assets/level1.tmj");

    // Step 2 : Preload any images here
    this.load.image("farmimg", "assets/farm.png");
    this.load.image("villageimg", "assets/village32x32.png");
    this.load.image("treeimg", "assets/treepacknewest.png");
    this.load.image("cowimg", "assets/31564.png");

    this.load.audio("bgmusic", "assets/mixkit-playground-fun-12 (1).mp3");
 


    this.load.spritesheet("gen", "assets/girl2.png", {
      frameWidth: 61,
      frameHeight: 62,
    });
  } // end of preload //

  create() {

    this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.3);
this.music.play();

    console.log("level1");
    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 4, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 8, end: 11 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 12, end: 15 }),
      frameRate: 5,
      repeat: -1,
    });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let farmTiles = map.addTilesetImage("farm", "farmimg");
    let villageTiles = map.addTilesetImage("village32x32", "villageimg");
    
  


    //Step 5  create an array of tiles
    let tilesArray = [farmTiles, villageTiles];

    // Step 6  Load in layers by layers

    this.floor = map.createLayer("floor", tilesArray, 0, 0);

    this.grass = map.createLayer("grass", tilesArray, 0, 0);

    this.road = map.createLayer("road", tilesArray, 0, 0);

    this.wall = map.createLayer("wall", tilesArray, 0, 0);

    this.brown = map.createLayer("brown", tilesArray, 0, 0);

    this.trees = map.createLayer("trees", tilesArray, 0, 0);

    this.house = map.createLayer("house", tilesArray, 0, 0);

    this.tealeaf = map.createLayer("tealeaf", tilesArray, 0, 0);

    this.cow = map.createLayer("cow", tilesArray, 0, 0);

    let cow1 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow1");
    let cow2 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow2");
    let cow3 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow3");
    let cow4 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow4");
    let cow5 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow5");
    let cow6 = map.findObject("ObjectLayer2", (obj) => obj.name === "cow6");

    this.cow1 = this.physics.add.sprite(cow1.x, cow1.y, "cowimg")
    this.cow2 = this.physics.add.sprite(cow2.x, cow2.y, "cowimg")
    this.cow3 = this.physics.add.sprite(cow3.x, cow3.y, "cowimg")
    this.cow4 = this.physics.add.sprite(cow4.x, cow4.y, "cowimg")
    this.cow5 = this.physics.add.sprite(cow5.x, cow5.y, "cowimg")
    this.cow6 = this.physics.add.sprite(cow6.x, cow6.y, "cowimg")


    var key2Down = this.input.keyboard.addKey(50);
    key2Down.on(
      "down",
      function () {
        console.log("Key 2 pressed");
        this.scene.start("level2");
      },
      this
    );
    let  start = map.findObject("ObjectLayer",(obj) => obj.name === "start");
 
    this.player = this.physics.add.sprite(start.x, start.y, "gen");

    window.player = this.player;

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);
    this.physics.add.overlap(this.player, [this.cow1,this.cow2, this.cow3,this.cow,this.cow5,this.cow6] ,this.collectcow, null, this);

  
  
    this.wall.setCollisionByExclusion(-1, true);
    this.brown.setCollisionByExclusion(-1, true);
    this.trees.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.wall);
    this.physics.add.collider(this.player, this.brown);
    this.physics.add.collider(this.player, this.trees);
    }
  update() {
    // In update()
    if (
      this.player.x > 154 &&
      this.player.x < 190 &&
      this.player.y < 140 &&
      this.player.y > 100 &&

      window.cow > 5
    ) {
      console.log("House1");
      this.house1();
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("gen-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("gen-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("gen-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("gen-down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();

      this.player.body.setSize(
        this.player.width * 0.3,
        this.player.height * 0.3
      );
    }
  }

 
  // outside of update() but within the class
 
  // Function to jump to room1

  collectcow(player, item) { 
    console.log("collectcow");
    this.cameras.main.shake(20);
    window.cow++
    console.log(window.cow)
    item.disableBody(true, true); // remove fire
    return false;
  }
  

  house1(player, tile)  { 
    console.log("house1 function");
    this.scene.start("level2",);
  }

}