//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
//https://www.javascripttutorial.net/web-apis/javascript-translate/

class Sprite {
  constructor ({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, rotation = 0, name }) {
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
    this.rotation = rotation
    this.name = name
  }
  draw() {
    ctx.save()
    ctx.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    )
    ctx.rotate(this.rotation)
    ctx.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    )
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
}

class Monster extends Sprite {
  constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, isEnemy = false, rotation = 0, name, attacks })
  {
    super({ position, velocity, image, frames, sprites, animate, rotation })
    this.isEnemy = isEnemy
    this.name = name
    this.health = 100
    this.attacks = attacks
  }
  faint() {
    const battleText = document.querySelector('.battleText')
    battleText.style.display = 'block'
    battleText.innerHTML = `${this.name} fainted`
    gsap.to(this.position, {
      y: this.position + 20
    })
    gsap.to(this, {
      opacity: 0
    })
  }
  attack({attack, recipient, renderedSprites }) {
    const battleText = document.querySelector('.battleText')
    battleText.style.display = 'block'
    battleText.innerHTML = `${this.name} used ${attack.name}`
    let healthBar = '.enemyHealth'
    if(this.isEnemy) healthBar = '.playerHealth1'
    recipient.health -= attack.damage
    let rotation = 1
    if(this.isEnemy) rotation = -2.2

    switch (attack.name) {
      case 'Fireball':
      const fireballImage = new Image()
      fireballImage.src = './img/fireball.png'
      const fireball = new Sprite({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        image: fireballImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation: rotation
      })
      renderedSprites.splice(1, 0, fireball)

      gsap.to(fireball.position, {
        x: recipient.position.x + 100,
        y: recipient.position.y,
        onComplete: () => {
          gsap.to(healthBar, {
            width: recipient.health + '%'
          })
          gsap.to(recipient.position, {
            x: recipient.position.x,
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
          renderedSprites.splice(1, 1)
        }
      })
      break;

      case 'Rockthrow':
      const rockthrowImage = new Image()
      rockthrowImage.src = './img/rockThrow.png'
      const rockthrow = new Sprite({
        position: {
          x:this.position.x,
          y: this.position.y
        },
        image: rockthrowImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation: rotation
      })
      renderedSprites.splice(1, 0, rockthrow)

      gsap.to(rockthrow.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
          gsap.to(healthBar, {
            width: recipient.health + '%'
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
            duration: 0.1
          })
          renderedSprites.splice(1, 1)
        }
      })
      break;

      case 'Energyblast':
      const energyBlastImage = new Image()
      energyBlastImage.src = './img/energyBall.png'
      const energyblast = new Sprite({
        position: {
          x:this.position.x,
          y: this.position.y
        },
        image: energyBlastImage,
        frames: {
          max: 4,
          hold: 10
        },
        animate: true,
        rotation: rotation
      })
      renderedSprites.splice(1, 0, energyblast)

      gsap.to(energyblast.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
          gsap.to(healthBar, {
            width: recipient.health + '%'
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
          renderedSprites.splice(1, 1)
        }
      })
      break;

      case 'Tackle':
      const timeLine = gsap.timeline()

      let movementDistance = 20
      if(this.isEnemy) movementDistance = -20

      timeLine.to(this.position, {
        x: this.position.x - movementDistance
      }).to(this.position, {
        x: this.position.x + movementDistance * 2,
        duration: 0.1,
        onComplete: () => {
          // enemy gets hit
          gsap.to(healthBar, {
            width: recipient.health + '%'
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
      break;
    }

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
