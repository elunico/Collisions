let SqrIdx = 0;
class Square {
  constructor(x, y, sideSize, color = color(255, 255, 255)) {
    this.x = x;
    this.y = y;
    this.sideSize = sideSize;
    this.moving = false;
    this.dir = 1;
    this.startedMoving = 0;
    this.color = color;
    this.id = SqrIdx++;
  }

  draw() {
    fill(this.color);
    if (this.moving) {
      let aug = (this.dir * (this.speed * ((new Date().getTime() - this.startedMoving) / 75)));
      console.log(aug);
      this.x += aug;
    }
    rect(this.x, this.y, this.sideSize, this.sideSize);
  }
  startMoving(dir) {
    this.dir = dir;
    this.speed = 1;
    this.startedMoving = new Date().getTime();
    this.moving = true;
  }

  stopMoving() {
    this.moving = false;
    this.startedMoving = 0;
    this.speed = 1;
  }

  overlaps(body) {
    return ((this.x + this.sideSize) > (body.x)) && (this.x < (body.x + body.sideSize));
  }

  checkCollisions(world) {
    for (let body of world) {
      if (this.id !== body.id && this.overlaps(body)) {
        console.log(`Body ${this.x},${this.y} collides with body at ${body.x}, ${body.y}`);
        this.dir *= -1;

      }
    }
  }
}

function keyPressed() {
  if (key == 'D') {
    s1.startMoving(1);
  }
  if (key == 'L') {
    s2.startMoving(1);
  }
  if (key == 'A') {
    s1.startMoving(-1);
  }
  if (key == 'J') {
    s2.startMoving(-1);
  }
}

function keyReleased() {
  if (key == 'D') {
    s1.stopMoving();
  }
  if (key == 'L') {
    s2.stopMoving();
  }
  if (key == 'A') {
    s1.stopMoving();
  }
  if (key == 'J') {
    s2.stopMoving();
  }
}

let s1, s2;
let collideBox;

function ground() {
  fill(81);
  rect(0, 305, 600, 200);
  fill(255);
}

let world = [];

function setup() {
  createCanvas(600, 400);
  ground();
  s1 = new Square(50, 300, 30, color(0, 255, 0));
  s2 = new Square(450, 300, 30, color(255, 0, 0));
  s3 = new Square(250, 300, 30, color(0, 0, 255));
  world.push(s1, s2, s3);
  collideBox = createCheckbox('Collisions?');
  collideBox.checked(true);
}



function draw() {
  background(51);
  for (let element of world) {
    if (collideBox.checked()) {
      element.checkCollisions(world);
    }
    element.draw();
  }
}
