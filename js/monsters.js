const monsters = {
  Player1: {
    position: {
      x:160,
      y:350
    },
    image: {
      src: './img/playerRightBattle.png'
    },
    frames: {
      max:2,
      hold: 0
    },
    animate: true,
    name: 'Grey',
    attacks: [attacks.Tackle, attacks.Fireball, attacks.Rockthrow, attacks.Energyblast]
  },
  BabyDragon:{
    position: {
      x:670,
      y:220
    },
    image: {
      src: './img/draggleSprite.png'
    },
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
