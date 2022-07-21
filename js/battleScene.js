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

let babyDragon
let player1
let renderedSprites
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('.battleInterface').style.display = 'block'
  document.querySelector('.battleText').style.display = 'none'
  document.querySelector('.enemyHealth').style.width = '100%'
  document.querySelector('.playerHealth1').style.width = '100%'
  document.querySelector('.attacksBox').replaceChildren()

  babyDragon = new Monster(monsters.BabyDragon)
  player1 = new Monster(monsters.Player1)
  renderedSprites = [babyDragon, player1]
  queue = []

  player1.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.style.border = "thin solid black"
    button.innerHTML = attack.name
    const attacksBox = document.querySelector('.attacksBox')
    attacksBox.append(button)
  })

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
        queue.push(() => {
          //fade back to black
          gsap.to('.battleChange', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('.battleInterface').style.display = 'none'
              gsap.to('.battleChange', {
                opacity: 0
              })
              battle.initiated = false
              audio.Map.play()
            }
          })
        })
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

          queue.push(() => {
            //fade back to black
          gsap.to('.battleChange', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('.battleInterface').style.display = 'none'
              gsap.to('.battleChange', {
                opacity: 0
              })
              battle.initiated = false
              audio.Map.play()
              }
            })
          })
        }
      })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('.type').innerHTML = selectedAttack.type
      document.querySelector('.type').style.color = selectedAttack.color
    })
  })
}

const animateBattle = () => {
  battleAnimationId = window.requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach ((sprite) => {
    sprite.draw()
  })
}
animate()
// initBattle();
// animateBattle();

document.querySelector('.battleText').addEventListener('click', (e)=> {
  if(queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none"
})
