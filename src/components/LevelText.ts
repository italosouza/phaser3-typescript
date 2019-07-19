export class LevelText extends Phaser.GameObjects.Text {
  public label: Phaser.GameObjects.Text
  public score: number

  constructor(public scene: Phaser.Scene, level: number) {
    super(scene, 0, 0, `Level: ${level + 1}`, {
      color: '#ffffff',
      fontFamily: 'monospace',
      fontSize: '36px',
      fontStyle: 'bold'
    })

    this.score = level
    scene.add.existing(this)
  }
}
