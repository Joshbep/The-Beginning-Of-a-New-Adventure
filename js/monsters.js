const dragonImage = new Image()
dragonImage.src = './img/draggleSprite.png';

const playerUpBattle = new Image()
playerUpBattle.src = './img/playerRightBattle.png';
playerUpBattle.height = 700

const monsters = {
  Player1: {
    position: {
      x:160,
      y:350
    },
    image: playerUpBattle,
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
