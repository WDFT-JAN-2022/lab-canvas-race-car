const car = new Image();
car.src = "../images/car.png";

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;
    this.w = 50;
    this.h = 90;
    this.image = car;
  }

  move(direction) {
    switch (direction) {
      case "ArrowLeft":
        this.x -= 15;
        break;
      case "ArrowRight":
        this.x += 15;
        break;
    }
  }
}

class Obstacle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.w = 100;
    this.h = 25;
  }

  move(ctx) {
    this.y = this.y + 3;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
