// animate()
const battleBackgroundImg = new Image()
battleBackgroundImg.src = './img/sandBattle.png';
const battleBackground = new Sprite({
  position: {
    x: 0,
    y:0
  },
  image: battleBackgroundImg
})
const playerUpBattle = new Image()
playerUpBattle.src = './img/playerRightBattle.png';
playerUpBattle.height = 700
const player1 = new Sprite({
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
  name: 'Grey'
})

const dragonImage = new Image()
dragonImage.src = './img/draggleSprite.png';
const babyDragon = new Sprite({
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
  name: 'Baby dragon'
})

const renderedSprites = [babyDragon, player1]
const animateBattle = () => {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach ((sprite) => {
    sprite.draw()
  })
}
animateBattle();

const queue = []
// event listeners for attack buttons
document.querySelectorAll('button').forEach((button) =>{
  button.addEventListener('click', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    player1.attack({
      attack: selectedAttack,
      recipient: babyDragon,
      renderedSprites
    })
    queue.push(() => {
      babyDragon.attack({
        attack: attacks.Tackle,
        recipient: player1,
        renderedSprites
      })
    })
    queue.push(() => {
      babyDragon.attack({
        attack: attacks.Fireball,
        recipient: player1,
        renderedSprites
      })
    })
  })
})

document.querySelector('.battleText').addEventListener('click', (e)=> {
  if(queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none"
})
