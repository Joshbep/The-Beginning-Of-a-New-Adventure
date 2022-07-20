const dragonImage = new Image()
dragonImage.src = './img/draggleSprite.png';

const monsters = {
  BabyDragon:{
    position: {
      x:670,
      y:220
    },
    image: dragonImage,
    frames: {
      max:4,
      hold: 30
    },
    animate: true,
    isEnemy: true,
    name: 'Baby dragon',
    attacks: [attacks.Tackle, attacks.Fireball]
  }
}
