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

const player1 = new Sprite(sprites.Player1)
const babyDragon = new Monster(monsters.BabyDragon)

const renderedSprites = [babyDragon, player1]
const button = document.createElement('button')
button.innerHTML = 'Fireball'
const attacksBox = document.querySelector('.attacksBox')
attacksBox.append(button)
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
