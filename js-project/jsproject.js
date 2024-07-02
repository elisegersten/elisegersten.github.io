
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let clickCount = 0;
const maxClicks = 10;

const ballsAreaWidth = width * 0.5;
const ballsAreaHeight = height;

let phoneNumberInput = null;


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
  return num === 0 ? 1 : num;
}


class Ball {
  constructor(x, y, velX, velY, number, size, isReset = falase) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.number = number;
    this.size = size;
    this.isReset - isReset;

    this.onClick = this.onClick.bind(this);
    canvas.addEventListener('click', this.onClick);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.isReset ? 'red' : 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.number, this.x, this.y);
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x + this.size >= ballsAreaWidth || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= ballsAreaWidth || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball || ball.isReset)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.number = this.number = randomNumber();
        }
      }
    }
  }

  onClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.size) {
      if (this.isReset) {
        phoneNumberInput.value = '';
        clickCount = 0;
        return;
      }
    }

    if (clickCount < macClicks) {
      console.log('Clicked Ball ${this.number}');
  
      
      if (!phoneNumberInput) {
        phoneNumberInput = document.createElement('input');
        phoneNumberInput.type = 'text';
        phoneNumberInput.style.position = 'absolute';
        phoneNumberInput.style.width = '200px';
        phoneNumberInput.style.left = `${ballsAreaWidth + 50}px`;
        phoneNumberInput.style.top = `50px`;
        document.body.appendChild(phoneNumberInput);
      }
    }

      phoneNumberInput.value += this.number;
      clickCount++;
    }
  }

  
  

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    
    random(size, ballsAreaWidth - size),
    random(size, ballsAreaHeight - size),
    random(-2, 2),
    random(-2, 2),
    random(0, 9),
    size
  );

  balls.push(ball);
}

const resetBall = new Ball (
  ballsAreaWidth / 2,
  ballsAreaHeight / 2,
  random (-2,2),
  random (-2,2),
  'R',
  30,
  true
);
balls.push(resetBall);

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    if (!ball.isReset){
      ball.collisionDetect();
    }
  }

  requestAnimationFrame(loop);
}

loop();