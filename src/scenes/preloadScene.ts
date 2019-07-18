export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PreloadScene'
    })
  }

  public preload() {
    console.log('preload')

    const width = this.cameras.main.width
    const height = this.cameras.main.height
    console.log(width, height)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: 'CARREGADO',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)
  }

  public create() {}
}
