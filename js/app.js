//resources
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
// explanation on sprite sheet https://www.codeandweb.com/what-is-a-sprite-sheet,
// how to create a sprite sheet https://www.codeandweb.com/texturepacker/tutorials/how-to-create-a-sprite-sheet,
// https://itch.io/game-assets/tag-top-down is where I am finding assets
// element is the most general base class from which all element objects in a document inherit
// element inherits properties from its parent interface
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


//inital steps
//find assets
// download map assets -- done
// import into file -- done
//layer downloaded tiles -- done
//place trees and enviorment -- done
//landscaping details -- done
//collisions and map boundaries -- done
//foreground layer -- done
// export layers for project import

//player and map development with coding
//project setup -- done
//import and render my map -- done
//player creation -- done
//move player through map on key down -- done
//player to map boundary collisions - done
//foreground objects - done
//player movement animation
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') //this has now created the canvas context, so we can start drawing
canvas.width = 1024
canvas.height = 576
// map is 50 tiles wide
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i))
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
// draw image method requires 3 arguments which will be image first, second will be x position, third is y position



const player = new Sprite ({
  position: {
    x: x,
    y: y,
  },
  image: playerDownImage,
  frames: {
    max: 4
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

const moveables = [background, ...boundaries, foreground]
const rectangularCollision = ({rectangle1, rectangle2}) => {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}
const animate = () => {
  window.requestAnimationFrame(animate)
  background.draw()
  boundaries.forEach(boundary => {
  boundary.draw()
  })
  player.draw()
  foreground.draw()
  let moving = true
  player.moving = false
  if (keys.w.pressed && lastKey === 'w') {
    player.moving = true
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
        console.log('colliding')
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.y += 3
    })
  } else if (keys.a.pressed && lastKey === 'a') {
    player.moving = true
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
        console.log('colliding')
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
    player.moving = true
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
        console.log('colliding')
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
    player.moving = true
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
        console.log('colliding')
        moving = false
        break
      }
    }
    if (moving)
    moveables.forEach((moveable) => {
      moveable.position.x -= 3
    })  }
}
animate()
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
