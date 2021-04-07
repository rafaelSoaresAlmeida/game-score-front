import * as Phaser from "phaser";
import FlappyBirdGameOver from "./scenes/flappy-bird.game-over";
import { FlappyBirdGame} from "./scenes/flappy-bird.game";
import FlappyBirdStartGame from "./scenes/flappy-bird.start-game";

export class FlappyBirdConfig extends Phaser.Scene{

    public static readonly sceneConfig: Phaser.Types.Core.GameConfig = {
        width: 400,
        height: 600,
        parent: "flappy-game",
        input: {
          keyboard: true
        },
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 300 }
          }
        },
        render: { pixelArt: true },
        scene: [FlappyBirdStartGame, FlappyBirdGame, FlappyBirdGameOver]
    }
    
}
