import Phaser from 'phaser'

import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './config/const'
import AssetsPreloader from './scenes/AssetsPreloader'
import MenuScene from './scenes/MenuScene'

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: '#000000',
    parent: 'phaser-game',
    scale: {
      mode: Phaser.Scale.MAX_ZOOM,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    render: {
      pixelArt: true
    },
    loader: {
      path: 'assets/'
    },
    plugins: {},
    scene: [AssetsPreloader, MenuScene],
    title: 'Memory Puzzle',
    url: 'http://localhost:3000'
  }

  const game = new Phaser.Game(config)
})
