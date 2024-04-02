
class level3 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level3' });
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("level3","assets/level3.tmj");
        
        // Step 2 : Preload any images here
        this.load.image("kitchenimg", "assets/12_Kitchen_32x32.png");
        this.load.image("groceryimg", "assets/16_Grocery_store_32x32.png");
        this.load.image("carpetimg", "assets/Carpet.png");

        this.load.image("exteriorimg", "assets/gather_decoration_exterior_1.3.png");

        this.load.image("tableimg", "assets/gather_tables_2.1.png");

        this.load.image("ufmimg", "assets/ufMP1I.png");
        this.load.image("teaimg", "assets/bubbletea.png");

        this.load.spritesheet('gen', 'assets/girl2.png',{ frameWidth:61, frameHeight:62 });


       
    } // end of preload //

    create (){

        console.log("level3")
        this.anims.create({
            key:'gen-up',
            frames:this.anims.generateFrameNumbers('gen',
            { start:0, end:3 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'gen-left',
            frames:this.anims.generateFrameNumbers('gen',
            { start:4, end:7 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'gen-down',
            frames:this.anims.generateFrameNumbers('gen',
            { start:8, end:11 }),
            frameRate:5,
            repeat:-1
        });
    
        this.anims.create({
            key:'gen-right',
            frames:this.anims.generateFrameNumbers('gen',
            { start:12, end:15 }),
            frameRate:5,
            repeat:-1
        });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level3" });

    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload 
    let kitchenTiles = map.addTilesetImage("12_Kitchen_32x32", "kitchenimg");  
    let groceryTiles = map.addTilesetImage("16_Grocery_store_32x32", "groceryimg");  

    let carpetTiles = map.addTilesetImage("Carpet", "carpetimg");  

    let exteriorTiles = map.addTilesetImage("gather_decoration_exterior_1.3", "exteriorimg");  

    let tableTiles = map.addTilesetImage("gather_tables_2.1", "tableimg"); 
    let ufmTiles = map.addTilesetImage("ufMP1I", "ufmimg");  
 

    



    //Step 5  create an array of tiles
   let tilesArray = [
   kitchenTiles,
   groceryTiles,
   carpetTiles,
   exteriorTiles,
   tableTiles,
   ufmTiles

    ]
 

    // Step 6  Load in layers by layers
    
    this.floor = map.createLayer("floor",tilesArray,0,0);

    this.light = map.createLayer("light",tilesArray,0,0);

    this.wall = map.createLayer("wall",tilesArray,0,0);

    this.table = map.createLayer("table",tilesArray,0,0);

    this.sink = map.createLayer("sink",tilesArray,0,0);

    this.assets = map.createLayer("assets",tilesArray,0,0);

    this.deco = map.createLayer("deco",tilesArray,0,0);

    this.water = map.createLayer("water",tilesArray,0,0);

   
    let  start = map.findObject("ObjectLayer",(obj) => obj.name === "start");
 
    this.player = this.physics.add.sprite(start.x, start.y, "gen");

    window.player = this.player
   
    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    this.wall.setCollisionByExclusion(-1, true);
    this.table.setCollisionByExclusion(-1, true);
    this.light.setCollisionByExclusion(-1, true);


    this.physics.add.collider(this.player, this.wall);
    this.physics.add.collider(this.player, this.table);
    this.physics.add.collider(this.player, this.light);

    let tea1 = map.findObject("ObjectLayer2", (obj) => obj.name === "tea1");
    let tea2 = map.findObject("ObjectLayer2", (obj) => obj.name === "tea2");
    let tea3 = map.findObject("ObjectLayer2", (obj) => obj.name === "tea3");
    let tea4 = map.findObject("ObjectLayer2", (obj) => obj.name === "tea4");
    let tea5 = map.findObject("ObjectLayer2", (obj) => obj.name === "tea5");

    this.tea1 = this.physics.add.sprite(tea1.x, tea1.y, "teaimg")
    this.tea2 = this.physics.add.sprite(tea2.x, tea2.y, "teaimg")
    this.tea3 = this.physics.add.sprite(tea3.x, tea3.y, "teaimg")
    this.tea4 = this.physics.add.sprite(tea4.x, tea4.y, "teaimg")
    this.tea5 = this.physics.add.sprite(tea5.x, tea5.y, "teaimg")

    
    // // camera follow player
    this.cameras.main.startFollow(this.player);


}
update() {
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        this.player.anims.play('gen-left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play('gen-right', true);
    } else if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-160);
        this.player.anims.play('gen-up', true);
    } else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(160);
        this.player.anims.play('gen-down', true);
    } else {
        this.player.setVelocity(0);
        this.player.anims.stop();

        this.player.body.setSize(this.player.width * 0.1, this.player.height * 0.3)
    }
}



    collecttea(player, item) {
        console.log("collecttea");
        this.cameras.main.shake(10);
        window.tea++
        console.log(window.tea)
        item.disableBody(true, true); // remove fire
        return false;
      }
    
     
      }
    