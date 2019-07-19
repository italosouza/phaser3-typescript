export class LevelText extends Phaser.GameObjects.Text {
  public score: Phaser.GameObjects.Text

  constructor(public scene: Phaser.Scene, level: number) {
    super(scene, 0, 0, `Level: ${level + 1}`, {
      color: '#ffffff',
      fontSize: '56',
      fontStyle: 'bold'
    })
    scene.add.existing(this)
  }
}
