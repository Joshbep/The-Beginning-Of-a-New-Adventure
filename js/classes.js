//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha

class Sprite {
  constructor ({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, isEnemy = false }) {
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0 }

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.health = 100
    this.isEnemy = isEnemy
  }
  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.drawImage(
      this.image,
      this.frames.val * this.width, // x coordinate
      0, // y coordinate
      this.image.width / this.frames.max, // crop width
      this.image.height, //
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    ctx.restore()
    if (!this.animate) return
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
    else this.frames.val = 0
    }
  }
  attack({attack, recipient}) {
    const timeLine = gsap.timeline()

    this.health -= attack.damage

    let movementDistance = 20
    if(this.isEnemy) movementDistance = -20

    let healthBar = '.enemyHealth'
    if(this.isEnemy) healthBar = '.playerHealth1'

    timeLine.to(this.position, {
      x: this.position.x - movementDistance
    }).to(this.position, {
      x: this.position.x + movementDistance * 2,
      duration: 0.1,
      onComplete: () => {
        // enemy gets hit
        gsap.to(healthBar, {
          width: this.health + '%'
        })
        gsap.to(recipient.position, {
          x: recipient.position.x + 10,
          yoyo: true,
          repeat: 5,
          duration: 0.08,
        })

        gsap.to(recipient, {
          opacity: 0,
          repeat: 5,
          yoyo: true,
          duration: 0.08
        })
      }
    }).to(this.position, {
      x: this.position.x
    })
  }
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
    ctx.fillStyle = 'rgba(255, 0, 0, 0)'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
