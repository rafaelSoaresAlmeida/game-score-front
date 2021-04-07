export default class FlappyBirdStartGame extends Phaser.Scene {

    private clickButton: any;
    private background!: Phaser.GameObjects.TileSprite;

    preload(): void {
        this.load.pack(
            "flappyBirdPack",
            "assets/flappy/pack.json",
            "flappyBirdPack"
        );
    }
  
    create(): void {

        this.background = this.add
          .tileSprite(0, 0, 390, 600, "background")
          .setOrigin(0, 0);

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.clickButton = this.add.text(screenCenterX, screenCenterY, 'START!', {
            fontSize: '48px',  color: '#0f0'})
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.startGame() )
        .on('pointerover', () => this.enterButtonHoverState() )
        .on('pointerout', () => this.enterButtonRestState() );
    }

    startGame(): void {
        this.scene.start('FlappyBirdGame');
    }
    
    enterButtonHoverState(): void {
      this.clickButton.setStyle({ fill: '#ff0'});
    }
    
    enterButtonRestState(): void {
      this.clickButton.setStyle({ fill: '#0f0' });
    }

}