import * as Phaser from "phaser";
import { Bird } from "../objects/bird";
import { Pipe } from "../objects/pipe";
import { RankService } from "../../rank.service";
import { LoginService } from "src/app/security/login.service";
import { buildScoreObject } from "src/app/utils/gameUtils";
import { NotificationService } from "src/app/shared/message/notification.service";
import { ServiceLocator } from "src/app/service.locator";
import { Games } from "src/app/utils/constants";

export class FlappyBirdGame extends Phaser.Scene {

    private bird!: Bird;
    private pipes!: Phaser.GameObjects.Group;
    private background!: Phaser.GameObjects.TileSprite;
    private scoreText!: Phaser.GameObjects.BitmapText;
    private loginService: LoginService = ServiceLocator.injector.get(LoginService);
    private rankService: RankService = ServiceLocator.injector.get(RankService);
    private notificationService: NotificationService = ServiceLocator.injector.get(NotificationService);

    constructor() {
      super('FlappyBirdGame');
    }

    init(): void {
        this.registry.set("score", -1);
      }
    
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
    
        this.scoreText = this.add
          .bitmapText(
            this.sys.canvas.width / 2 - 14,
            30,
            "font",
            this.registry.values.score
          )
          .setDepth(2);

        this.pipes = this.add.group({ classType: Pipe });
    
        this.bird = new Bird({
          scene: this,
          x: 50,
          y: 100,
          key: "bird"
        });
    
        this.addNewRowOfPipes();
    
        this.time.addEvent({
          delay: 1500,
          callback: this.addNewRowOfPipes,
          callbackScope: this,
          loop: true
        });
      }
    
      update(): void {

        if (!this.bird.getDead()) {
          this.background.tilePositionX += 4;
          this.bird.update();
          this.physics.overlap(
            this.bird,
            this.pipes,
            () => {
              this.bird.setDead(true);
            },
            undefined,
            this
          );
        } else {
          Phaser.Actions.Call(
            this.pipes.getChildren(),
            function(pipe) {
              //pipe.setBodyVelocityX(0);
              pipe.body.velocity.x = 0 ;
            },
            this
          );
    
          if (this.bird.y > this.sys.canvas.height) {
              this.persistScore();
              this.scene.start('flappy-bird-game-over', {score: this.registry.values.score, scene: this.scene}); 
          }
        }
      }
    
      private addNewRowOfPipes(): void {
        // update the score
        this.registry.values.score += 1;
        this.scoreText.setText(this.registry.values.score);
    
        // randomly pick a number between 1 and 5
        let hole = Math.floor(Math.random() * 5) + 1;
    
        // add 6 pipes with one big hole at position hole and hole + 1
        for (let i = 0; i < 10; i++) {
          if (i !== hole && i !== hole + 1 && i !== hole + 2) {
            if (i === hole - 1) {
              this.addPipe(400, i * 60, 0);
            } else if (i === hole + 3) {
              this.addPipe(400, i * 60, 1);
            } else {
              this.addPipe(400, i * 60, 2);
            }
          }
        }
      }
    
      private addPipe(x: number, y: number, frame: number): void {
        // create a new pipe at the position x and y and add it to group
        this.pipes.add(
          new Pipe({
            scene: this,
            x: x,
            y: y,
            frame: frame,
            key: "pipe"
          })
        );
      }

      private persistScore(): void {
        var scoreObj = buildScoreObject(
          this.loginService.user.name,
          this.loginService.user.email,
          this.registry.values.score.toString(),
          Games.FLAPPY_BIRD
        );

        this.rankService.persistScore(scoreObj).subscribe((response) => {
          this.notificationService.notifyRanking(response);
        });  
      }
}
