
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Ball {
  constructor(x, y, velX, velY, number, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.number = number;
    this.size = size;

    this.onClick = this.onClick.bind(this);
    canvas.addEventListener('click', this.onClick);
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'black'; // Set text color to black
    ctx.font = `${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.number, this.x, this.y);
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          this.number = ball.number = random(0, 9);
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
      const phoneNumber = document.createElement('input');
      phoneNumber.type = 'text';
      phoneNumber.value = `Clicked Ball Number: ${this.number}`;
      phoneNumber.style.position = 'absolute';
      phoneNumber.style.left = `${event.pageX}px`;
      phoneNumber.style.top = `${event.pageY}px`;
      document.body.appendChild(phoneNumber);
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-1, 1),
    random(-1, 1),
    random(0, 9),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();