const playerUpBattle = new Image()
playerUpBattle.src = './img/playerRightBattle.png';
playerUpBattle.height = 700

const sprites = {
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
  }
}
