window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const car = new Image();
  car.src = "images/car.png";
  car.onload = () => {
    console.log("Car loaded");
  };

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

  //Global variables
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;

  const driver = new Player();

  const ob1 = new Obstacle();

  let obstacleArr = [];

  obstacleArr.push(ob1);

  let score;

  let game;

  //Movements
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("ArrowLeft");
        break;
      case "ArrowRight":
        driver.move("ArrowRight");
        break;
    }
  });

  function createObj() {
    score += 10;
    obstacleArr.push(new Obstacle());
  }

  function startGame() {
    if (!isGameOn) {
      score = 0;
      isGameOn = true;
      setInterval(createObj, 2000);
      animate();
    } else {
      console.log("Game is already running");
    }
  }

  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(driver.image, driver.x, driver.y, driver.w, driver.h);
    ctx.fillStyle = "white";
    ctx.font = "30px Ariel";

    ctx.fillText(`Score: ${score}`, 200, 30);

    //animate the obstacles
    for (let i = 0; i < obstacleArr.length; i++) {
      obstacleArr[i].move(ctx);
      // Call the collision function, and compare it to every object
      didCollide = detectCollision(driver, obstacleArr[i]);
      if (didCollide) {
        break;
      }
    }
    if (didCollide) {
      gameOver();
    }
  }

  function gameOver() {
    window.cancelAnimationFrame(game);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillText(`GAME OVER`, 160, 30);
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 200, 500);
  }

  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
};
