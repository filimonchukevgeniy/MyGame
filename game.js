class Main extends Phaser.Scene {

    // This function essentially loads things into our game
    preload() {
        this.load.spritesheet('plane', 'assets/planesheet.png', {frameWidth: 98, frameHeight: 83});
        this.load.image('pipe', 'assets/pipe.png');
        this.load.audio('jump', 'assets/jump.wav');

    }

    //  it runs once at the beginning of the game and
    //  allows the user to place the things that they’ve preloaded with preload() and
    //  create objects within our game such as animations, collision detectors, text, groups, and much more
    create() {
        //Додаємо літак на сцену
        this.plane = this.physics.add.sprite(0, 0, 'plane')
        //Масштабуємо літак
        this.plane.setScale(0.65, 0.65);
        //Встановлюємо опорну точку літака
        this.plane.setOrigin(0, 0.5);

        this.anims.create({
            key: "planeAnimation",
            frames: this.anims.generateFrameNumbers('plane', {frames: [0, 1, 3, 2]}),
            frameRate: 10,
            repeat: -1
        });
        this.plane.play("planeAnimation");
        
        this.plane.body.gravity.y = 1000;
    }

    // While preload() and create() run only once at the start of the game, update() runs constantly.
    update() {
        if (this.plane.angle < 20) {
            this.plane.angle += 1;
        }
        
        if (this.plane.y < 0 || this.plane.y > 490) {
            this.scene.restart();
        }

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (this.spaceBar.isDown) {
            this.jump();
        }

        

    }
}

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 490,
    scene: Main, // Цю сцену ми створимо на 4-му кроці
    backgroundColor: '#71c5cf',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    }
};

const game = new Phaser.Game(config);