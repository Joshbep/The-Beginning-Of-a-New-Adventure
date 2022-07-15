//resources
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
// explanation on sprite sheet https://www.codeandweb.com/what-is-a-sprite-sheet,
// how to create a sprite sheet https://www.codeandweb.com/texturepacker/tutorials/how-to-create-a-sprite-sheet,
// https://itch.io/game-assets/tag-top-down is where I am finding assets
// element is the most general base class from which all element objects in a document inherit
// element inherits properties from its parent interface


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
//player to map boundary collisions
//foreground objects
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

class Boundary {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static
  static width = 80;
  static height = 80;
  constructor ({position}) {
    this.position = position
    this.width = 80
    this.height = 80
  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
const boundaries = []

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3060)
    boundaries.push(new Boundary({position: {
      x: j * Boundary.width,
      y: i * Boundary.height
    }}))
  })
})

// this is how you draw something onto the screen
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const playerImage = new Image();
playerImage.src= './img/playerDown.png'
const x = canvas.width / 2 - (playerImage.width / 4) / 2;
const y = canvas.height / 2 - playerImage.height / 2;
const image = new Image();
image.src = './img/ninjaMap.png';
// draw image method requires 3 arguments which will be image first, second will be x position, third is y position
image.onload = () => {

}
class Sprite {
  constructor ({ position, velocity, image }) {
    this.position = position
    this.image = image
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: -1268,
    y: -525
  },
  image: image
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

const animate = () => {
  window.requestAnimationFrame(animate)
  background.draw()
  ctx.drawImage(playerImage,
    0, // x coordinate
    0, // y coordinate
    playerImage.width / 4, // crop width
    playerImage.height, //
    x ,
    y,
    playerImage.width / 4,
    playerImage.height,
  )
  if (keys.w.pressed && lastKey === 'w') background.position.y += 3
  else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
  else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
  else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
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
