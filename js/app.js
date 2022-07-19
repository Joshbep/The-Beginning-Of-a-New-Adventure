//resources
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
// explanation on sprite sheet https://www.codeandweb.com/what-is-a-sprite-sheet,
// how to create a sprite sheet https://www.codeandweb.com/texturepacker/tutorials/how-to-create-a-sprite-sheet,
// https://itch.io/game-assets/tag-top-down is where I am finding assets
// element is the most general base class from which all element objects in a document inherit
// element inherits properties from its parent interface
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
//https://www.freecodecamp.org/news/the-beginners-guide-to-the-greensock-animation-platform-7dc9fd9eb826/#:~:text=Introduction,create%20robust%20timeline%20based%20animations.
//https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
// https://greensock.com/docs/v3/GSAP/Tween/repeat()


//inital steps:
//find assets
// download map assets -- done
// import into file -- done
//layer downloaded tiles -- done
//place trees and enviorment -- done
//landscaping details -- done
//collisions and map boundaries -- done
//foreground layer -- done
// export layers for project import

//player and map development with coding:
//project setup -- done
//import and render my map -- done
//player creation -- done
//move player through map on key down -- done
//player to map boundary collisions - done
//foreground objects - done
//player movement animation -- done

// battle sequences:
// battle activation - done
// transition map to battle sequence - done
//draw the background for the battle- done
// add battle sprites - done
//add attack bar interface - done
//add  health bar interface - done
//player attacks
//enemy attacks
//queuing dialogue
//battle end
//transition back to map
//music and sound effects
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') //this has now created the canvas context, so we can start drawing

canvas.width = 1024
canvas.height = 576
// map is 50 tiles wide
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesArr.length; i += 50) {
  battleZonesMap.push(battleZonesArr.slice(i, 50 + i))
}


const offset = {
  x: -1268,
  y:-525
}
const boundaries = []

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3060)
    boundaries.push(new Boundary({position: {
      x: j * Boundary.width + offset.x,
      y: i * Boundary.height + offset.y
    }}))
  })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3060)
    battleZones.push(new Boundary({position: {
      x: j * Boundary.width + offset.x,
      y: i * Boundary.height + offset.y
    }}))
  })
})
// this is how you draw something onto the screen
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const playerDownImage = new Image();
playerDownImage.src= './img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src= './img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src= './img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src= './img/playerRight.png'

const x = canvas.width / 2 - (playerDownImage.width / 4) / 2;
const y = canvas.height / 2 - playerDownImage.height / 2;
const image = new Image();
image.src = './img/ninjaMap.png';
const foregroundImage = new Image();
foregroundImage.src = './img/foregroundObjects.png';
const battleGrass = new Image();
battleGrass.src = './img/battlePatch.png';
// draw image method requires 3 arguments which will be image first, second will be x position, third is y position



const player = new Sprite ({
  position: {
    x: x,
    y: y,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    down: playerDownImage,
    right: playerRightImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

const grass = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: battleGrass
})


const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const moveables = [background, ...boundaries, foreground, grass, ...battleZones]
const rectangularCollision = ({rectangle1, rectangle2}) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}
const battle = {
  initiated: false
}

const animate = () => {
  const animationId = window.requestAnimationFrame(animate)
  background.draw()
  grass.draw()
  boundaries.forEach(boundary => {
  boundary.draw()
  })
  battleZones.forEach(battleZone => {
    battleZone.draw()
  })
  player.draw()
  foreground.draw()

  let moving = true
  player.animate = false
  if (battle.initiated) return
  //activate a battle here
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) *
      (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y))
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone
        }) &&
        overlappingArea > (player.width * player.height) / 2
        && Math.random() < 0.05
      ) {
        console.log('activate battle')
        //deactivate current animation loop
        window.cancelAnimationFrame(animationId)
        battle.initiated = true
        gsap.to('.battleChange', {
          opacity: 1,
          repeat: 2,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('.battleChange', {
              opacity: 1,
              duration: 0.4,
              onComplete () {
                //activate a new animation loop
                animateBattle();
                gsap.to('.battleChange', {opacity: 0, duration: 0.4})
              }
            })

          }
        })
        break
      }
    }
  }

  if (keys.w.pressed && lastKey === 'w') {
    player.animate = true
    player.image = player.sprites.up
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }}
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.y += 3
    })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.animate = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {...boundary, position: {
            x: boundary.position.x +3 ,
            y: boundary.position.y
          }}
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.x += 3
    })
  }
  else if (keys.s.pressed && lastKey === 's') {
    player.animate = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y - 3
          }}
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.y -= 3
    })
  }
  else if (keys.d.pressed && lastKey === 'd') {
    player.animate = true
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {...boundary, position: {
            x: boundary.position.x - 3,
            y: boundary.position.y
          }}
        })
      ) {
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.x -= 3
    })  }
}
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
const playerBattle = new Sprite({
  position: {
    x:160,
    y:350
  },
  image: playerUpBattle,
  frames: {
    max:2,
    hold: 0
  },
  animate: true
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
  animate: true
})
const animateBattle = () => {
  window.requestAnimationFrame(animateBattle)
  battleBackground.draw()
  babyDragon.draw()
  playerBattle.draw()
}
animateBattle();
//https://www.w3schools.com/js/js_window.asp
//only works if we are running code directly to our browser from my understanding
let lastKey = ''
window.addEventListener('keydown', (e) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  switch (e.key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break

    case 'a':
        keys.a.pressed = true
        lastKey = 'a'
        break

    case 's':
          keys.s.pressed = true
          lastKey = 's'
          break

    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }
})

window.addEventListener('keyup', (e) => {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  switch (e.key) {
    case 'w':
      keys.w.pressed = false
      break

    case 'a':
        keys.a.pressed = false
        break

    case 's':
          keys.s.pressed = false
          break

    case 'd':
      keys.d.pressed = false
      break
  }
})
