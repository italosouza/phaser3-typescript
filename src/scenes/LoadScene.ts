import { config } from '../config/config'

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.load })
  }

  private loadImages() {
    this.load.setPath('assets/images')

    // for (const image in config.images) {
    //   if (image) {
    //     this.load.image(config.images[image], config.images[image])
    //   }
    // }
  }

  private loadAudio() {
    this.load.setPath('assets/audio')
    // for (const audio in config.audio) {
    //   if (audio) {
    //     this.load.audio(config.audio[audio], config.audio[audio])
    //   }
    // }
  }

  private loadSprites() {
    this.load.setPath('assets/sprites')
    // for (const sprite in config.sprites) {
    //   if (sprite) {
    //     const spriteData = config.sprites[sprite]
    //     const spriteImport = {
    //       key: sprite,
    //       url: spriteData.url,
    //       frameConfig: {
    //         frameWidth: !!spriteData.frameConfig ? spriteData.frameConfig.frameWidth : 32,
    //         frameHeight: !!spriteData.frameConfig ? spriteData.frameConfig.frameHeight : 32
    //       }
    //     }
    //     this.load.spritesheet(spriteImport)
    //   }
    // }
  }

  private loadAtlas() {
    this.load.setPath('assets/sprites')
    config.atlas.map(atlas => {
      this.load.multiatlas(atlas)
    })
  }

  private drawUI() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Carregando...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    const loadingBar = this.add.graphics()
    const loadingBox = this.add.graphics({
      fillStyle: { color: 0x222222, alpha: 0.8 }
    })
    loadingBox.fillRect(240, 270, 320, 50)

    this.load.on('progress', (value: integer) => {
      loadingBar.clear()
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(250, 280, 300 * value, 30)
      percentText.setText(`${value * 100}%`)
    })

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('fileprogress', (file: any) => {
      assetText.setText(`Carregando: ${file.key}`)
    })

    this.load.on('complete', () => {
      // loadingBar.destroy()
      // loadingBox.destroy()
      // loadingText.destroy()
      // percentText.destroy()
      // assetText.destroy()
      // this.scene.start(config.scenes.menu)
    })
  }

  public preload() {
    this.drawUI()
    this.loadImages()
    this.loadAudio()
    this.loadSprites()
    this.loadAtlas()
  }

  public create() {}
}
