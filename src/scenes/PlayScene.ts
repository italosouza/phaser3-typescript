import { LevelText } from '../components/LevelText'
import { config } from '../config/config'

export default class PlayScene extends Phaser.Scene {
  private ui: LevelText
  private points: number = 0
  private level: number = 0

  constructor() {
    super({ key: config.scenes.play })
  }

  private drawUI() {
    this.add
      .image(0, 0, config.images.bg)
      .setOrigin(0)
      .setAlpha(0.6)
      .setDepth(0)
      .setScale(0.4)

    // this.ui.score = this.add.text(25, 25, `Pontos: ${this.points}`, {
    //   style: {
    //     font: '20px monospace',
    //     fill: '#ffffff'
    //   }
    // })

    this.ui = new LevelText(this, this.level)
    console.log(this.ui.score)
  }

  public create() {
    this.drawUI()
  }

  public update() {
    // this.ui.score.setText(['Pontos: '])
  }
}
