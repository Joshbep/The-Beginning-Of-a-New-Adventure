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
//import and render my map
//player creation
//move player through map on key down
//player to map boundary collisions
//foreground objects
//player movement animation
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') //this has now created the canvas context, so we can start drawing
canvas.width = 1024
canvas.height = 576
ctx.fillstyle = 'white';
  // left and top cut, width of cut, height of cut
ctx.fillRect(0, 0, canvas.width, canvas.height)

// this is how you draw something onto the screen
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
const image = new Image();
image.src = './img/ninjaMap.png';
// draw image method requires 3 arguments which will be image first, second will be x position, third is y position

image.onload = () => {
  ctx.drawImage(image, 0, 0)  
}
