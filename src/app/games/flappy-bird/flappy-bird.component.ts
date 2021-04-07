import { AfterViewInit, Component} from '@angular/core';
import { FlappyBirdConfig } from './flappy-bird.config';

@Component({
  selector: 'app-flappy-bird',
  templateUrl: './flappy-bird.component.html'
})
export class FlappyBirdComponent implements AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void {let phaserGame = new Phaser.Game(FlappyBirdConfig.sceneConfig)
  }

}
