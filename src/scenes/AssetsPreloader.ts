// import PhaserVersionText from '../components/phaserVersionText'
import { config } from '../config/config'

export default class AssetsPreloader extends Phaser.Scene {
  constructor() {
    super({ key: config.scenes.assetsPreloader })
  }

  private removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.classList.add('transparent')
      this.time.addEvent({
        delay: 100,
        callback: () => {
          loadingScreen.remove()
        }
      })
    }
  }

  private loadImages() {
    this.load.setPath('assets/images')
    for (const image in config.images) {
      if (image) {
        // @ts-ignore
        const asset = config.images[image]
        this.load.image(asset, asset)
      }
    }
  }

  private loadAudio() {
    this.load.setPath('assets/audio')
    for (const audio in config.audio) {
      if (audio) {
        // @ts-ignore
        const asset = config.audio[audio]
        this.load.audio(asset, asset)
      }
    }
  }

  private loadSprites() {
    this.load.setPath('assets/sprites')
    for (const sprite in config.sprites) {
      if (sprite) {
        // @ts-ignore
        const spriteData = config.sprites[sprite]
        const spriteImport = {
          key: sprite,
          url: spriteData.url,
          frameConfig: {
            frameWidth: !!spriteData.frameConfig ? spriteData.frameConfig.frameWidth : 32,
            frameHeight: !!spriteData.frameConfig ? spriteData.frameConfig.frameHeight : 32
          }
        }
        this.load.spritesheet(spriteImport)
      }
    }
  }

  private loadAtlas() {
    this.load.setPath('assets/sprites')
    config.atlas.map(atlas => {
      this.load.multiatlas(atlas)
    })
  }

  private drawUI() {
    // const phaserVersion = new PhaserVersionText(this, 0, 90, `Phaser v${Phaser.VERSION}`)

    const { width } = this.cameras.main
    const { height } = this.cameras.main
    const centerX = width / 2
    const centerY = height / 2

    // TODO: build a gridSystem UI Helper to fix all thoses magic numbers
    const loadingText = this.make.text({
      x: centerX,
      y: centerY - 50,
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
    loadingBox.fillRect(centerX - 160, centerY - 30, 320, 50)

    this.load.on('progress', (value: number) => {
      loadingBar.clear()
      loadingBar.fillStyle(0xffffff, 1)
      loadingBar.fillRect(centerX - 150, centerY - 20, 300 * value, 30)
      percentText.setText(`${(value * 100).toFixed(0)}%`)
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
      loadingBar.destroy()
      loadingBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
      this.scene.start(config.scenes.menu)
    })
  }

  public preload() {
    this.removeLoadingScreen()
    this.drawUI()
    this.loadImages()
    this.loadAudio()
    this.loadSprites()
    this.loadAtlas()
  }

  public create() {
    //
  }
}
