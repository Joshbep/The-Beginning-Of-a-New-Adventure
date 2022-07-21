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

const player1 = new Monster(monsters.Player1)
const babyDragon = new Monster(monsters.BabyDragon)

const renderedSprites = [babyDragon, player1]

player1.attacks.forEach(attack => {
  const button = document.createElement('button')
  button.style.border = "thin solid black"
  button.innerHTML = attack.name
  const attacksBox = document.querySelector('.attacksBox')
  attacksBox.append(button)
})


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
    if(babyDragon.health <= 0) {
      queue.push(() => {
        babyDragon.faint()
      })
      return
    }
    //enemy attacks
    const randomAttack = babyDragon.attacks[Math.floor(Math.random() * babyDragon.attacks.length)]
    queue.push(() => {
      babyDragon.attack({
        attack: randomAttack,
        recipient: player1,
        renderedSprites
      })
      if(player1.health <= 0) {
        queue.push(() => {
          player1.faint()
        })
        return
      }
    })
  })
  button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    document.querySelector('.type').innerHTML = selectedAttack.type
    document.querySelector('.type').style.color = selectedAttack.color
  })
})

document.querySelector('.battleText').addEventListener('click', (e)=> {
  if(queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none"
})
