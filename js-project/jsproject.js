const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

let clickCount = 0;
const maxClicks = 10;

const ballsAreaWidth = width * 0.5;
const ballsAreaHeight = height;

let phoneNumberInput = null;
let submitButton = null;

const fixedSize = 15;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumber() {
  return Math.floor(Math.random() * 10);
}

class Ball {
  constructor(x, y, velX, velY, number, size, isReset = false) {
    this.x = x;
    this.y = y;
    this.velX = velX === 0 ? 1 : velX;
    this.velY = velY === 0 ? 1 : velY;
    this.number = number;
    this.size = fixedSize;
    this.isReset = isReset;

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
    if (this.y + this.size >= ballsAreaHeight || this.y - this.size <= 0) {
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

      if (clickCount < maxClicks) {
        console.log(`Clicked Ball ${this.number}`);

        if (!phoneNumberInput) {
          phoneNumberInput = document.createElement('input');
          phoneNumberInput.type = 'text';
          phoneNumberInput.style.position = 'absolute';
          phoneNumberInput.style.width = '300px';
          phoneNumberInput.style.height = '50px';
          phoneNumberInput.style.fontSize = '30px';
          phoneNumberInput.style.left = `${ballsAreaWidth + 50}px`;
          phoneNumberInput.style.top = '50px';
          document.body.appendChild(phoneNumberInput);


          submitButton = document.createElement('button');
          submitButton.textContent = 'Submit';
          submitButton.style.position = 'absolute';
          submitButton.style.left = `${ballsAreaWidth + 50}px`;
          submitButton.style.top = '120px';
          submitButton.addEventListener('click', this.onSubmit);
          document.body.appendChild(submitButton);
        }

        phoneNumberInput.value += this.number;
        clickCount++;

        if (clickCount === maxClicks) {
          submitButton.disabled = false;
        }
      }
    }
  }

  onSubmit() {
    ctx.clearRect(0, 0, width, height);
    balls.length = 0; 

    canvas.removeEventListener('click', this.onClick);

    console.log('Phone Number Submitted:', phoneNumberInput.value);
  }
}


const balls = [];
while (balls.length < 25) {
  const ball = new Ball(
    random(fixedSize, ballsAreaWidth - fixedSize), // Adjust as needed
    random(fixedSize, ballsAreaHeight - fixedSize), // Adjust as needed
    random(-2, 2),
    random(-2, 2),
    randomNumber(),
    fixedSize
  );
  balls.push(ball);
}

const resetBall = new Ball(
  ballsAreaWidth / 2,
  ballsAreaHeight / 2,
  random(-3, 3),
  random(-3, 3),
  'R',
  30,
  true
);
balls.push(resetBall);

function loop() {
  ctx.clearRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    if (!ball.isReset) {
      ball.collisionDetect();
    }
  }

  requestAnimationFrame(loop);
}

loop();