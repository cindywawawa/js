class level2 extends Phaser.Scene {
  constructor() {
    super({ key: "level2" });
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level2", "assets/level2.tmj");

    // Step 2 : Preload any images here
    this.load.image("farmimg", "assets/farm.png");
    this.load.image("freeimg", "assets/Free Sprites 2x.png");
    this.load.image("villageimg", "assets/village32x32.png");

    this.load.spritesheet("gen", "assets/girl2.png", {
      frameWidth: 61,
      frameHeight: 62,
    });
  } // end of preload //

  create() {
    console.log("level2");
    this.anims.create({
      key: "gen-up",
      frames: this.anims.generateFrameNumbers("gen", { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-left",
      frames: this.anims.generateFrameNumbers("gen", { start: 5, end: 8 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-down",
      frames: this.anims.generateFrameNumbers("gen", { start: 9, end: 12 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "gen-right",
      frames: this.anims.generateFrameNumbers("gen", { start: 13, end: 16 }),
      frameRate: 5,
      repeat: -1,
    });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level2" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let farmTiles = map.addTilesetImage("farm", "farmimg");
    let freeTiles = map.addTilesetImage("Free Sprites 2x", "freeimg");

    let villageTiles = map.addTilesetImage("village32x32", "villageimg");

    //Step 5  create an array of tiles
    let tilesArray = [farmTiles, freeTiles, villageTiles];

    // Step 6  Load in layers by layers

    this.floor = map.createLayer("floor", tilesArray, 0, 0);

    this.river = map.createLayer("river", tilesArray, 0, 0);

    this.grass = map.createLayer("grass", tilesArray, 0, 0);

    this.block2 = map.createLayer("block2", tilesArray, 0, 0);

    this.trees = map.createLayer("trees", tilesArray, 0, 0);

    this.block = map.createLayer("block", tilesArray, 0, 0);

    this.brown2 = map.createLayer("brown2", tilesArray, 0, 0);

    this.staircase = map.createLayer("staircase", tilesArray, 0, 0);

    this.brown = map.createLayer("brown", tilesArray, 0, 0);

    this.animals = map.createLayer("animals", tilesArray, 0, 0);

    this.hole = map.createLayer("hole", tilesArray, 0, 0);

    var key3Down = this.input.keyboard.addKey(51);
    key3Down.on(
      "down",
      function () {
        console.log("Key 3 pressed");
        this.scene.start("level3");
      },
      this
    );

    let start = map.findObject("ObjectLayer", (obj) => obj.name === "start");

    this.player = this.physics.add.sprite(start.x, start.y, "gen");

    window.player = this.player;

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    this.block.setCollisionByExclusion(-1, true);
    this.brown.setCollisionByExclusion(-1, true);

    this.physics.add.collider(this.player, this.block);
    this.physics.add.collider(this.player, this.brown);

    // // camera follow player
    this.cameras.main.startFollow(this.player);
  }
  update() {
    // In update()
    if (
      this.player.x > 322 &&
      this.player.x < 345 &&
      this.player.y < 1085 &&
      this.player.y > 975
    ) {
      console.log("House2");
      this.house2();
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
        this.player.width * 0.1,
        this.player.height * 0.1
      );
    }
  }

  // outside of update() but within the class

  // Function to jump to room1
  house2(player, tile) {
    console.log("room1 function");
    this.scene.start("level3");
  }
}
