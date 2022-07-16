class Sprite {
  constructor ({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0 }

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.moving = false
  }
  draw() {
    ctx.drawImage(this.image,
      this.frames.val * this.width, // x coordinate
      0, // y coordinate
      this.image.width / this.frames.max, // crop width
      this.image.height, //
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )
    if (!this.moving) {
      if (this.frames.max > 1) {
        this.frames.elapsed++
      }
      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
      }
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
